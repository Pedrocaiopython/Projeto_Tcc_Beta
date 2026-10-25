const assert = require('node:assert/strict');
const test = require('node:test');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { prepararQuestao } = require('../js/quiz-utils');
const { db } = require('../backend/src/db');

test('embaralhamento preserva a alternativa correta', () => {
  const original = {
    texto: 'Questão de teste',
    alternativas: ['incorreta A', 'correta', 'incorreta B', 'incorreta C'],
    respostaCorreta: 1
  };
  const tentativa = prepararQuestao(original);
  assert.equal(tentativa.alternativas[tentativa.respostaCorreta], 'correta');
  assert.deepEqual(original.alternativas, ['incorreta A', 'correta', 'incorreta B', 'incorreta C']);
});

test('Geografia publica um banco disponível antes do motor', () => {
  const codigo = fs.readFileSync(path.join(__dirname, '..', 'js', 'perguntas-geografia.js'), 'utf8');
  const contexto = { window: {}, globalThis: {} };
  vm.runInNewContext(codigo, contexto);
  contexto.window.perguntas = contexto.window.perguntasGeografia;
  assert.ok(contexto.window.perguntas['7ano'].length >= 6);
});

function criarContextoMotorQuiz() {
  let overlayAtual = null;
  const elementos = new Map();
  const criarElemento = () => {
    const seletores = new Map();
    return {
      classList: { add() {}, remove() {} },
      style: {},
      appendChild() {},
      querySelector(seletor) {
        if (!seletores.has(seletor)) seletores.set(seletor, criarElemento());
        return seletores.get(seletor);
      },
      querySelectorAll() { return []; },
      remove() {}
    };
  };
  const contexto = {
    document: {
      body: { appendChild(elemento) { overlayAtual = elemento; } },
      createElement: criarElemento,
      getElementById(id) {
        if (id === 'desafio-overlay') return overlayAtual;
        if (!elementos.has(id)) elementos.set(id, criarElemento());
        return elementos.get(id);
      }
    },
    window: { location: { pathname: '/ciencias.html' } },
    prepararTentativa(perguntas) { return perguntas; },
    setTimeout() {}
  };

  vm.createContext(contexto);
  return { contexto, getOverlay: () => overlayAtual, getResultado: () => elementos.get('resultado') };
}

test('boss aparece automaticamente em quiz perfeito com qualquer quantidade de questões', async () => {
  const codigo = fs.readFileSync(path.join(__dirname, '..', 'js', 'quiz-engine.js'), 'utf8');
  const { contexto, getOverlay } = criarContextoMotorQuiz();
  vm.runInContext(codigo, contexto);
  await vm.runInContext(`(async () => {
    perguntasDoNivel = Array.from({ length: 4 }, () => ({
      texto: 'Questão', alternativas: ['A', 'B'], respostaCorreta: 0
    }));
    quantidadeDeAcertos = 4;
    await finalizarJogo();
  })()`, contexto);

  assert.match(getOverlay().innerHTML, /arena-boss/);
  assert.ok(getOverlay().querySelector('.kaiju').src.startsWith('backend/src/boses/'));
});

test('quiz com resposta incorreta termina sem iniciar batalha', async () => {
  const codigo = fs.readFileSync(path.join(__dirname, '..', 'js', 'quiz-engine.js'), 'utf8');
  const { contexto, getOverlay, getResultado } = criarContextoMotorQuiz();
  vm.runInContext(codigo, contexto);
  await vm.runInContext(`(async () => {
    perguntasDoNivel = Array.from({ length: 4 }, () => ({
      texto: 'Questão', alternativas: ['A', 'B'], respostaCorreta: 0
    }));
    quantidadeDeAcertos = 3;
    await finalizarJogo();
  })()`, contexto);

  assert.equal(getOverlay(), null);
  assert.match(getResultado().textContent, /3 de 4/);
});

test('desafio de boss comprado começa sem exigir quiz perfeito', async () => {
  const codigo = fs.readFileSync(path.join(__dirname, '..', 'js', 'quiz-engine.js'), 'utf8');
  const { contexto, getOverlay } = criarContextoMotorQuiz();
  contexto.requestJson = async (url) => {
    assert.equal(url, '/api/shop/boss/consume');
    return { authorized: true };
  };
  vm.runInContext(codigo, contexto);
  await new Promise((resolve) => setImmediate(resolve));

  assert.match(getOverlay().innerHTML, /arena-boss/);
});

function iniciarServidor() {
  return new Promise((resolve) => {
    const servidor = http.createServer(require('../backend/src/server'));
    servidor.listen(0, '127.0.0.1', () => resolve(servidor));
  });
}

async function requisicao(base, caminho, opcoes = {}, cookies = {}) {
  const headers = { ...(opcoes.headers || {}) };
  const cookie = Object.entries(cookies).map(([chave, valor]) => `${chave}=${valor}`).join('; ');
  if (cookie) headers.Cookie = cookie;
  const resposta = await fetch(`${base}${caminho}`, { ...opcoes, headers });
  const texto = await resposta.text();
  let corpo;
  try { corpo = JSON.parse(texto); } catch { corpo = texto; }
  const novoCookie = resposta.headers.get('set-cookie');
  if (novoCookie) {
    const [parNome, parValor] = novoCookie.split(';', 1)[0].split('=');
    cookies[parNome] = parValor;
  }
  return { resposta, corpo };
}

test('desafio do boss custa 100 pontos e libera uma única batalha', async (t) => {
  const servidor = await iniciarServidor();
  t.after(() => servidor.close());
  const base = `http://127.0.0.1:${servidor.address().port}`;
  const cookies = {};
  const email = `boss-${Date.now()}@exemplo.com`;
  const json = { 'Content-Type': 'application/json' };

  await requisicao(base, '/api/auth/register', {
    method: 'POST', headers: json,
    body: JSON.stringify({ name: 'Boss Teste', email, password: 'senha123' })
  }, cookies);
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  db.prepare('UPDATE user_profiles SET points = 150 WHERE user_id = ?').run(user.id);

  const compra = await requisicao(base, '/api/shop/boss/purchase', { method: 'POST' }, cookies);
  assert.equal(compra.resposta.status, 200);
  assert.equal(compra.corpo.profile.points, 50);

  const repetida = await requisicao(base, '/api/shop/boss/purchase', { method: 'POST' }, cookies);
  assert.equal(repetida.resposta.status, 409);

  const consumo = await requisicao(base, '/api/shop/boss/consume', { method: 'POST' }, cookies);
  assert.equal(consumo.corpo.authorized, true);
  const consumoRepetido = await requisicao(base, '/api/shop/boss/consume', { method: 'POST' }, cookies);
  assert.equal(consumoRepetido.corpo.authorized, false);

  const semPontos = await requisicao(base, '/api/shop/boss/purchase', { method: 'POST' }, cookies);
  assert.equal(semPontos.resposta.status, 400);
});

test('envio inválido é recusado e nova submissão recebe 429', async (t) => {
  const servidor = await iniciarServidor();
  t.after(() => servidor.close());
  const base = `http://127.0.0.1:${servidor.address().port}`;
  const cookies = {};
  const email = `teste-${Date.now()}@exemplo.com`;
  const json = { 'Content-Type': 'application/json' };

  await requisicao(base, '/api/auth/register', {
    method: 'POST', headers: json,
    body: JSON.stringify({ name: 'Teste Automatizado', email, password: 'senha123' })
  }, cookies);

  const invalido = await requisicao(base, '/api/quizzes/submit', {
    method: 'POST', headers: json,
    body: JSON.stringify({ subject: 'geografia', correctAnswers: 2, totalQuestions: 11 })
  }, cookies);
  assert.equal(invalido.resposta.status, 400);

  const primeiro = await requisicao(base, '/api/quizzes/submit', {
    method: 'POST', headers: json,
    body: JSON.stringify({ subject: 'geografia', correctAnswers: 7, totalQuestions: 10 })
  }, cookies);
  assert.equal(primeiro.resposta.status, 200);

  const repetido = await requisicao(base, '/api/quizzes/submit', {
    method: 'POST', headers: json,
    body: JSON.stringify({ subject: 'geografia', correctAnswers: 6, totalQuestions: 10 })
  }, cookies);
  assert.equal(repetido.resposta.status, 429);
});
