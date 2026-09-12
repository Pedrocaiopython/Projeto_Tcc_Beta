const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbDir = path.join(__dirname, '../../database');
const dbPath = path.join(dbDir, 'educa_app.db');
const schemaPath = path.join(dbDir, 'schema.sql');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schemaSql = fs.readFileSync(schemaPath, 'utf8');
db.exec(schemaSql);

function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email.trim().toLowerCase());
}

function getUserById(userId) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
}

function getProfile(userId) {
  const profile = db.prepare(`
    SELECT up.*, u.name, u.email
    FROM user_profiles up
    JOIN users u ON u.id = up.user_id
    WHERE up.user_id = ?
  `).get(userId);

  if (!profile) {
    return null;
  }

  const equippedItem = profile.equipped_item_id
    ? db.prepare('SELECT * FROM shop_items WHERE id = ?').get(profile.equipped_item_id)
    : null;

  const inventory = db.prepare(`
    SELECT si.*
    FROM user_inventory ui
    JOIN shop_items si ON si.id = ui.item_id
    WHERE ui.user_id = ?
    ORDER BY ui.acquired_at DESC
  `).all(userId);

  const progress = db.prepare(`
    SELECT sp.*, s.slug, s.name AS subject_name
    FROM subject_progress sp
    JOIN subjects s ON s.id = sp.subject_id
    WHERE sp.user_id = ?
    ORDER BY s.name ASC
  `).all(userId);

  const levelInfo = getLevelSummary(profile.xp_total);

  return {
    ...profile,
    level: levelInfo.level,
    levelInfo,
    equippedItem,
    inventory,
    progress,
    currentLevelXp: levelInfo.currentLevelXp,
    xpForNextLevel: levelInfo.xpForNextLevel,
    remainingXp: levelInfo.remainingXp,
    xpProgressPercent: levelInfo.xpProgressPercent
  };
}

function getLevelSummary(xpTotal) {
  const value = Number(xpTotal || 0);
  const level = Math.max(1, Math.floor(value / 250) + 1);
  const currentLevelStart = (level - 1) * 250;
  const nextLevelGoal = level * 250;
  const currentLevelXp = Math.max(0, value - currentLevelStart);
  const remainingXp = Math.max(0, nextLevelGoal - value);
  const xpProgressPercent = Math.min(100, Math.max(0, (currentLevelXp / 250) * 100));

  return {
    level,
    currentLevelStart,
    nextLevelGoal,
    currentLevelXp,
    xpForNextLevel: nextLevelGoal,
    remainingXp,
    xpProgressPercent
  };
}

function createUser({ name, email, passwordHash }) {
  const insert = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
  const result = insert.run(name.trim(), email.trim().toLowerCase(), passwordHash);

  db.prepare('INSERT INTO user_profiles (user_id, xp_total, level, points) VALUES (?, 0, 1, 0)').run(result.lastInsertRowid);
  db.prepare('INSERT INTO user_inventory (user_id, item_id) VALUES (?, (SELECT id FROM shop_items WHERE slug = ?))').run(result.lastInsertRowid, 'avatar-base');
  db.prepare('UPDATE user_profiles SET equipped_item_id = (SELECT id FROM shop_items WHERE slug = ?) WHERE user_id = ?').run('avatar-base', result.lastInsertRowid);

  return getUserById(result.lastInsertRowid);
}

module.exports = {
  db,
  getUserByEmail,
  getUserById,
  getProfile,
  getLevelSummary,
  createUser
};
