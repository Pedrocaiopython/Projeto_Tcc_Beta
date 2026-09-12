require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { db, getUserByEmail, getUserById, getProfile, getLevelSummary, createUser } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const rootDir = path.join(__dirname, '../..');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'tcc-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Você precisa estar autenticado para fazer esta ação.' });
  }
  next();
}

function serializeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.created_at
  };
}

function getSubjectIdBySlug(slug) {
  const subject = db.prepare('SELECT * FROM subjects WHERE slug = ?').get(slug);
  if (!subject) {
    throw new Error('Matéria inválida.');
  }
  return subject.id;
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Servidor online' });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  }

  if (String(name).trim().length < 2) {
    return res.status(400).json({ message: 'O nome deve ter pelo menos 2 caracteres.' });
  }

  if (String(password).length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  if (getUserByEmail(normalizedEmail)) {
    return res.status(409).json({ message: 'Já existe uma conta com este e-mail.' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = createUser({
      name: String(name).trim(),
      email: normalizedEmail,
      passwordHash
    });

    req.session.userId = user.id;
    const profile = getProfile(user.id);

    return res.status(201).json({
      message: 'Cadastro realizado com sucesso.',
      user: serializeUser(user),
      profile
    });
  } catch (error) {
    return res.status(500).json({ message: 'Não foi possível concluir o cadastro.', error: 'internal_error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = getUserByEmail(normalizedEmail);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const passwordMatches = await bcrypt.compare(String(password), user.password_hash);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  req.session.userId = user.id;
  const profile = getProfile(user.id);

  return res.json({
    message: 'Login realizado com sucesso.',
    user: serializeUser(user),
    profile
  });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Não foi possível encerrar a sessão.' });
    }

    res.clearCookie('connect.sid');
    return res.json({ message: 'Logout realizado com sucesso.' });
  });
});

app.get('/api/auth/me', (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Sessão expirada ou inexistente.' });
  }

  const user = getUserById(req.session.userId);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  return res.json({ user: serializeUser(user), profile: getProfile(user.id) });
});

app.get('/api/profile', requireAuth, (req, res) => {
  const profile = getProfile(req.session.userId);
  if (!profile) {
    return res.status(404).json({ message: 'Perfil não encontrado.' });
  }

  const user = getUserById(req.session.userId);
  return res.json({ user: serializeUser(user), profile });
});

app.get('/api/shop', requireAuth, (req, res) => {
  const items = db.prepare('SELECT * FROM shop_items WHERE status = ? ORDER BY category, name ASC').all('active');
  const userInventory = db.prepare('SELECT item_id FROM user_inventory WHERE user_id = ?').all(req.session.userId);
  const ownedIds = new Set(userInventory.map((item) => item.item_id));

  res.json({
    items: items.map((item) => ({
      ...item,
      owned: ownedIds.has(item.id)
    })),
    profile: getProfile(req.session.userId)
  });
});

app.post('/api/shop/purchase', requireAuth, (req, res) => {
  const { itemId } = req.body || {};
  const userId = req.session.userId;
  const item = db.prepare('SELECT * FROM shop_items WHERE id = ? AND status = ?').get(Number(itemId), 'active');

  if (!item) {
    return res.status(404).json({ message: 'Item não encontrado.' });
  }

  const alreadyOwned = db.prepare('SELECT 1 FROM user_inventory WHERE user_id = ? AND item_id = ?').get(userId, item.id);
  if (alreadyOwned) {
    return res.status(409).json({ message: 'Você já possui este item.' });
  }

  const profile = getProfile(userId);
  if (profile.points < item.price) {
    return res.status(400).json({ message: 'Você não possui pontos suficientes para este item.' });
  }

  const purchase = db.transaction(() => {
    db.prepare('UPDATE user_profiles SET points = points - ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?').run(item.price, userId);
    db.prepare('INSERT INTO user_inventory (user_id, item_id) VALUES (?, ?)').run(userId, item.id);
    db.prepare('INSERT INTO points_history (user_id, source, amount) VALUES (?, ?, ?)').run(userId, `compra:${item.slug}`, -item.price);
  });

  purchase();

  return res.json({ message: `Item ${item.name} comprado com sucesso.`, profile: getProfile(userId) });
});

app.post('/api/shop/equip', requireAuth, (req, res) => {
  const { itemId } = req.body || {};
  const userId = req.session.userId;
  const item = db.prepare('SELECT * FROM shop_items WHERE id = ?').get(Number(itemId));

  if (!item) {
    return res.status(404).json({ message: 'Item não encontrado.' });
  }

  const owned = db.prepare('SELECT 1 FROM user_inventory WHERE user_id = ? AND item_id = ?').get(userId, item.id);
  if (!owned) {
    return res.status(400).json({ message: 'Você não possui este item para equipar.' });
  }

  db.prepare('UPDATE user_profiles SET equipped_item_id = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?').run(item.id, userId);
  db.prepare('INSERT INTO user_equipment (user_id, item_id) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET item_id = excluded.item_id, equipped_at = CURRENT_TIMESTAMP').run(userId, item.id);

  return res.json({ message: `${item.name} equipado com sucesso.`, profile: getProfile(userId) });
});

app.post('/api/shop/unequip', requireAuth, (req, res) => {
  const userId = req.session.userId;
  db.prepare('UPDATE user_profiles SET equipped_item_id = NULL, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM user_equipment WHERE user_id = ?').run(userId);

  return res.json({ message: 'Item desequipado com sucesso.', profile: getProfile(userId) });
});

app.post('/api/quizzes/submit', requireAuth, (req, res) => {
  const userId = req.session.userId;
  const { subject, correctAnswers, totalQuestions } = req.body || {};

  if (!subject || Number.isNaN(Number(correctAnswers)) || Number.isNaN(Number(totalQuestions))) {
    return res.status(400).json({ message: 'Dados da atividade inválidos.' });
  }

  const subjectId = getSubjectIdBySlug(String(subject).trim().toLowerCase());
  const correct = Math.max(0, Number(correctAnswers));
  const total = Math.max(1, Number(totalQuestions));
  const accuracy = Math.round((correct / total) * 100);
  const xpAward = Math.max(15, Math.round((correct / total) * 80) + 20);
  const pointsAward = Math.max(10, Math.round((correct / total) * 60) + 8);

  const profile = getProfile(userId);
  const updateTransaction = db.transaction(() => {
    const previousXp = Number(profile.xp_total || 0);
    const updatedXp = previousXp + xpAward;
    const updatedPoints = Number(profile.points || 0) + pointsAward;
    const levelSummary = getLevelSummary(updatedXp);

    db.prepare('UPDATE user_profiles SET xp_total = ?, level = ?, points = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?').run(updatedXp, levelSummary.level, updatedPoints, userId);
    db.prepare('INSERT INTO xp_history (user_id, source, amount) VALUES (?, ?, ?)').run(userId, `quiz:${subject}`, xpAward);
    db.prepare('INSERT INTO points_history (user_id, source, amount) VALUES (?, ?, ?)').run(userId, `quiz:${subject}`, pointsAward);

    const existing = db.prepare('SELECT * FROM subject_progress WHERE user_id = ? AND subject_id = ?').get(userId, subjectId);
    if (existing) {
      const totalAttempts = Number(existing.total_attempts) + total;
      const correctAnswersTotal = Number(existing.correct_answers) + correct;
      const nextAccuracy = Math.round((correctAnswersTotal / totalAttempts) * 100);

      db.prepare(`
        UPDATE subject_progress
        SET total_attempts = ?, correct_answers = ?, accuracy = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND subject_id = ?
      `).run(totalAttempts, correctAnswersTotal, nextAccuracy, userId, subjectId);
    } else {
      db.prepare(`
        INSERT INTO subject_progress (user_id, subject_id, total_attempts, correct_answers, accuracy, updated_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).run(userId, subjectId, total, correct, accuracy);
    }

    db.prepare(`
      INSERT INTO quiz_attempts (user_id, subject_id, correct_answers, total_questions, xp_awarded, points_awarded)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, subjectId, correct, total, xpAward, pointsAward);
  });

  updateTransaction();

  const updatedProfile = getProfile(userId);
  res.json({
    message: 'Resultado registrado com sucesso.',
    rewards: {
      xpAward,
      pointsAward
    },
    accuracy,
    profile: updatedProfile
  });
});

app.use(express.static(rootDir));

app.get('/menu_principal.html', (req, res) => {
  res.sendFile(path.join(rootDir, 'menu_principal.html'));
});

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'Endpoint não encontrado.' });
  }

  return res.sendFile(path.join(rootDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
