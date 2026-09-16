const assert = require('node:assert/strict');
const test = require('node:test');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { prepararQuestao } = require('../js/quiz-utils');

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
