const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const dbDir = path.join(__dirname, '../../database');
const dbPath = path.join(dbDir, 'educa_app.db');
const schemaPath = path.join(dbDir, 'schema.sql');

// node:sqlite is built into Node.js 22.5+ and keeps SQLite persistent without
// downloading or compiling a native addon during npm install.
const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');

const schemaSql = fs.readFileSync(schemaPath, 'utf8');
db.exec(schemaSql);

// Migração leve para bancos criados antes do sistema de títulos.
const profileColumns = db.prepare('PRAGMA table_info(user_profiles)').all();
if (!profileColumns.some((column) => column.name === 'equipped_title_slug')) {
  db.exec('ALTER TABLE user_profiles ADD COLUMN equipped_title_slug TEXT');
}

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

  const achievements = db.prepare(`
    SELECT ad.*, ua.unlocked_at
    FROM user_achievements ua
    JOIN achievement_definitions ad ON ad.slug = ua.achievement_slug
    WHERE ua.user_id = ?
    ORDER BY ua.unlocked_at DESC
  `).all(userId);

  const equippedTitle = profile.equipped_title_slug
    ? db.prepare('SELECT * FROM achievement_definitions WHERE slug = ?').get(profile.equipped_title_slug)
    : null;

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
    equippedTitle,
    achievements,
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

function runTransaction(callback) {
  db.exec('BEGIN');
  try {
    const result = callback();
    db.exec('COMMIT');
    return result;
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function createUser({ name, email, passwordHash }) {
  const userId = runTransaction(() => {
    const insert = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
    const result = insert.run(name.trim(), email.trim().toLowerCase(), passwordHash);
    const createdUserId = result.lastInsertRowid;

    db.prepare('INSERT INTO user_profiles (user_id, xp_total, level, points) VALUES (?, 0, 1, 0)').run(createdUserId);
    db.prepare('INSERT INTO user_inventory (user_id, item_id) VALUES (?, (SELECT id FROM shop_items WHERE slug = ?))').run(createdUserId, 'avatar-base');
    db.prepare('UPDATE user_profiles SET equipped_item_id = (SELECT id FROM shop_items WHERE slug = ?) WHERE user_id = ?').run('avatar-base', createdUserId);

    return createdUserId;
  });

  return getUserById(userId);
}

module.exports = {
  db,
  getUserByEmail,
  getUserById,
  getProfile,
  getLevelSummary,
  runTransaction,
  createUser
};
