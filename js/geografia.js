const telaNiveis = document.getElementById("tela-niveis");
const telaJogo = document.getElementById("tela-jogo");
const telaResultado = document.getElementById("tela-resultado");

const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const contador = document.getElementById("contador");
const progresso = document.getElementById("progresso");

const feedback = document.getElementById("feedback");
const mensagemFeedback = document.getElementById("mensagem-feedback");
const explicacao = document.getElementById("explicacao");
const resultado = document.getElementById("resultado");

let perguntasDoNivel = [];
let numeroDaPergunta = 0;
let quantidadeDeAcertos = 0;
let resultadoEnviado = false;

function resolveSubjectSlug() {
    const pathname = window.location.pathname.split('/').pop() || '';
    const map = {
        'matematico.html': 'matematica',
        'ciencias.html': 'ciencias',
        'geografia.html': 'geografia',
        'historia.html': 'historia',
        'portugues.html': 'portugues',
        'ingles.html': 'ingles'
    };
    return map[pathname] || 'matematica';
}

async function enviarResultadoServidor() {
    if (resultadoEnviado || typeof requestJson !== 'function') {
        return;
    }

    const subject = resolveSubjectSlug();
    resultadoEnviado = true;

    try {
        const payload = await requestJson('/api/quizzes/submit', {
            method: 'POST',
            body: JSON.stringify({
                subject,
                correctAnswers: quantidadeDeAcertos,
                totalQuestions: perguntasDoNivel.length
            })
        });

        const xp = payload?.rewards?.xpAward || 0;
        const pontos = payload?.rewards?.pointsAward || 0;
        resultado.textContent = `Você acertou ${quantidadeDeAcertos} de ${perguntasDoNivel.length} perguntas. Recompensa: ${xp} XP e ${pontos} pontos.`;
    } catch (error) {
        if (String(error.message).includes('autenticado') || String(error.message).includes('Sessão')) {
            window.location.href = '/index.html';
            return;
        }
        resultado.textContent = `Você acertou ${quantidadeDeAcertos} de ${perguntasDoNivel.length} perguntas. O registro do progresso não foi salvo: ${error.message}`;
    }
}

function iniciarJogo(nivel) {
    const bancoPerguntas = window.perguntas || perguntas;

    if (!bancoPerguntas || !bancoPerguntas[nivel]) {
        alert("Esse nível ainda não possui perguntas.");
        return;
    }

    perguntasDoNivel = bancoPerguntas[nivel];
    numeroDaPergunta = 0;
    quantidadeDeAcertos = 0;
    resultadoEnviado = false;

    if (feedback) feedback.classList.add("escondido");
    mostrarTela(telaJogo);
    mostrarPergunta();
}

function mostrarPergunta() {
    const perguntaAtual = perguntasDoNivel[numeroDaPergunta];

    if (!perguntaAtual) {
        finalizarJogo();
        return;
    }

    pergunta.textContent = perguntaAtual.texto;
    alternativas.innerHTML = "";

    if (feedback) feedback.classList.add("escondido");

    contador.textContent = `Pergunta ${numeroDaPergunta + 1} de ${perguntasDoNivel.length}`;
    atualizarBarra();

    perguntaAtual.alternativas.forEach(function (texto, posicao) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = texto;
        botao.onclick = function () {
            verificarResposta(posicao);
        };
        alternativas.appendChild(botao);
    });
}

function verificarResposta(respostaEscolhida) {
    const perguntaAtual = perguntasDoNivel[numeroDaPergunta];
    const acertou = respostaEscolhida === perguntaAtual.respostaCorreta;

    bloquearAlternativas();

    if (acertou) {
        quantidadeDeAcertos++;
        mensagemFeedback.textContent = "Muito bem!";
        feedback.className = "feedback correto";
    } else {
        const respostaCerta = perguntaAtual.alternativas[perguntaAtual.respostaCorreta];
        mensagemFeedback.textContent = `Quase! A resposta correta é: ${respostaCerta}`;
        feedback.className = "feedback incorreto";
    }

    explicacao.textContent = perguntaAtual.explicacao;
    feedback.classList.remove("escondido");
}

function proximaPergunta() {
    numeroDaPergunta++;

    if (numeroDaPergunta < perguntasDoNivel.length) {
        mostrarPergunta();
    } else {
        finalizarJogo();
    }
}

async function finalizarJogo() {
    mostrarTela(telaResultado);
    resultado.textContent = `Você acertou ${quantidadeDeAcertos} de ${perguntasDoNivel.length} perguntas.`;
    await enviarResultadoServidor();
}

function voltarParaNiveis() {
    mostrarTela(telaNiveis);
}

function mostrarTela(telaEscolhida) {
    if (telaNiveis) telaNiveis.classList.add("escondido");
    if (telaJogo) telaJogo.classList.add("escondido");
    if (telaResultado) telaResultado.classList.add("escondido");
    if (telaEscolhida) telaEscolhida.classList.remove("escondido");
}

function bloquearAlternativas() {
    const botoes = alternativas.querySelectorAll("button");
    botoes.forEach(function (botao) {
        botao.disabled = true;
    });
}

function atualizarBarra() {
    const porcentagem = perguntasDoNivel.length
        ? (numeroDaPergunta / perguntasDoNivel.length) * 100
        : 0;

    progresso.style.width = `${Math.min(porcentagem, 100)}%`;
}