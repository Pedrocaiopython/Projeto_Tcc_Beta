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
let desafioAtivo = false;

const perguntasBoss = {
    matematica: [
        { texto: 'Um número multiplicado por 4 resulta em 36. Qual é esse número?', alternativas: ['8', '9', '10', '12'], respostaCorreta: 1, explicacao: '36 ÷ 4 = 9.' },
        { texto: 'Qual é a área de um quadrado de lado 6 cm?', alternativas: ['12 cm²', '24 cm²', '36 cm²', '48 cm²'], respostaCorreta: 2, explicacao: 'Área do quadrado = lado × lado: 6 × 6 = 36.' },
        { texto: 'A média de 6, 8 e 10 é:', alternativas: ['7', '8', '9', '10'], respostaCorreta: 1, explicacao: '(6 + 8 + 10) ÷ 3 = 8.' }
    ],
    portugues: [
        { texto: 'Em “A leitura amplia horizontes”, qual é o sujeito?', alternativas: ['amplia', 'horizontes', 'A leitura', 'amplia horizontes'], respostaCorreta: 2, explicacao: '“A leitura” é quem pratica a ação de ampliar.' },
        { texto: 'A expressão “por isso” indica principalmente:', alternativas: ['consequência', 'oposição', 'dúvida', 'lugar'], respostaCorreta: 0, explicacao: '“Por isso” introduz uma consequência.' },
        { texto: 'Qual recurso deixa uma ideia mais expressiva em “O vento cantava”?', alternativas: ['Metáfora/personificação', 'Numeral', 'Artigo', 'Sigla'], respostaCorreta: 0, explicacao: 'O vento recebe uma ação humana, criando linguagem figurada.' }
    ],
    ingles: [
        { texto: 'Complete: “They ___ playing now.”', alternativas: ['is', 'am', 'are', 'be'], respostaCorreta: 2, explicacao: 'Com “they”, usamos “are”.' },
        { texto: 'What is the Portuguese meaning of “challenge”?', alternativas: ['Desafio', 'Vitória', 'Pergunta', 'Resposta'], respostaCorreta: 0, explicacao: '“Challenge” significa desafio.' },
        { texto: 'Choose the correct sentence:', alternativas: ['He have a bike.', 'He has a bike.', 'He having a bike.', 'He are a bike.'], respostaCorreta: 1, explicacao: 'Na terceira pessoa do singular, usamos “has”.' }
    ],
    historia: [
        { texto: 'A Independência do Brasil foi proclamada em:', alternativas: ['1500', '1822', '1888', '1930'], respostaCorreta: 1, explicacao: 'A Independência do Brasil ocorreu em 1822.' },
        { texto: 'Uma fonte histórica oral pode ser:', alternativas: ['Um depoimento', 'Uma montanha', 'Uma previsão do tempo', 'Uma equação'], respostaCorreta: 0, explicacao: 'Relatos e entrevistas são fontes orais.' },
        { texto: 'Preservar patrimônios históricos é importante porque:', alternativas: ['Ajuda a compreender memórias e culturas', 'Impede todo desenvolvimento', 'Elimina documentos', 'Apaga o passado'], respostaCorreta: 0, explicacao: 'O patrimônio mantém referências da história e da cultura.' }
    ],
    geografia: [
        { texto: 'A linha imaginária que divide a Terra em hemisfério Norte e Sul é:', alternativas: ['Meridiano de Greenwich', 'Linha do Equador', 'Trópico de Capricórnio', 'Círculo Polar Ártico'], respostaCorreta: 1, explicacao: 'A Linha do Equador separa os hemisférios Norte e Sul.' },
        { texto: 'O desmatamento pode causar:', alternativas: ['Perda de biodiversidade', 'Aumento imediato de florestas', 'Formação de oceanos', 'Fim da poluição'], respostaCorreta: 0, explicacao: 'Ele destrói habitats e reduz a biodiversidade.' },
        { texto: 'Densidade demográfica relaciona:', alternativas: ['População e área', 'Altitude e chuva', 'Temperatura e idade', 'Rios e oceanos'], respostaCorreta: 0, explicacao: 'Ela indica a relação entre o número de habitantes e a área ocupada.' }
    ],
    ciencias: [
        { texto: 'Qual gás é essencial à respiração humana?', alternativas: ['Oxigênio', 'Hélio', 'Hidrogênio', 'Nitrogênio'], respostaCorreta: 0, explicacao: 'O oxigênio é usado pelas células na respiração.' },
        { texto: 'O sistema que coordena os movimentos do corpo é o:', alternativas: ['Nervoso', 'Digestório', 'Respiratório', 'Excretor'], respostaCorreta: 0, explicacao: 'O sistema nervoso recebe e transmite informações pelo corpo.' },
        { texto: 'Uma mudança de estado físico da água de líquido para vapor é:', alternativas: ['Condensação', 'Evaporação', 'Solidificação', 'Fusão'], respostaCorreta: 1, explicacao: 'Evaporação é a passagem do estado líquido para o gasoso.' }
    ]
};

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
    if (typeof window.adicionarPerguntasComplementares === 'function') {
        window.adicionarPerguntasComplementares(resolveSubjectSlug());
    }
    const bancoPerguntas = window.perguntas;

    if (!bancoPerguntas || !bancoPerguntas[nivel]) {
        alert("Esse nível ainda não possui perguntas.");
        return;
    }

    perguntasDoNivel = prepararTentativa(bancoPerguntas[nivel]);
    numeroDaPergunta = 0;
    quantidadeDeAcertos = 0;
    resultadoEnviado = false;
    desafioAtivo = false;

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
    feedback.querySelector('.fonte-estudo')?.remove();
    if (perguntaAtual.fonte) {
        const fonte = document.createElement('a');
        fonte.className = 'fonte-estudo';
        fonte.href = perguntaAtual.fonte;
        fonte.target = '_blank';
        fonte.rel = 'noopener noreferrer';
        fonte.textContent = 'Consultar fonte de estudo';
        feedback.insertBefore(fonte, feedback.querySelector('button'));
    }
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
    if (!desafioAtivo && quantidadeDeAcertos === perguntasDoNivel.length && perguntasDoNivel.length === 10) {
        mostrarConviteDesafio();
        return;
    }
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

function criarOverlayDesafio(conteudo, classeExtra = '') {
    document.getElementById('desafio-overlay')?.remove();
    const overlay = document.createElement('section');
    overlay.id = 'desafio-overlay';
    overlay.className = `desafio-overlay ${classeExtra}`;
    overlay.innerHTML = conteudo;
    document.body.appendChild(overlay);
    return overlay;
}

function mostrarConviteDesafio() {
    const overlay = criarOverlayDesafio(`
        <div class="desafio-cartao convite-desafio">
            <span class="desafio-icone">✦</span>
            <p class="desafio-selo">SEQUÊNCIA PERFEITA: 10/10</p>
            <h2>Desafio encontrado, aceitar?</h2>
            <p>Uma presença desconhecida está bloqueando seu troféu.</p>
            <div class="desafio-acoes"><button class="aceitar">Sim</button><button class="recusar">Não</button></div>
        </div>`);
    overlay.querySelector('.aceitar').onclick = mostrarAlertaBoss;
    overlay.querySelector('.recusar').onclick = () => { overlay.remove(); finalizarResultadoPadrao(); };
}

function finalizarResultadoPadrao() {
    mostrarTela(telaResultado);
    resultado.textContent = `Você acertou ${quantidadeDeAcertos} de ${perguntasDoNivel.length} perguntas.`;
    enviarResultadoServidor();
}

function mostrarAlertaBoss() {
    const overlay = criarOverlayDesafio(`
        <div class="desafio-cartao alerta-boss">
            <p class="perigo">PERIGO ⚠️</p>
            <h2>Boss detectado</h2>
            <p>O Kaiju do Conhecimento chegou. Você tem coragem de enfrentá-lo?</p>
            <div class="desafio-acoes"><button class="enfrentar">Enfrentar</button><button class="fugir">Fugir</button></div>
            <span class="cursor-demo" aria-hidden="true">➤</span>
        </div>`, 'tela-perigo');
    overlay.querySelector('.enfrentar').onclick = iniciarBatalhaBoss;
    overlay.querySelector('.fugir').onclick = () => { overlay.remove(); finalizarResultadoPadrao(); };
}

function iniciarBatalhaBoss() {
    const disciplina = resolveSubjectSlug();
    const questoes = prepararTentativa(perguntasBoss[disciplina] || perguntasBoss.matematica);
    let indice = 0;
    let acertos = 0;
    const overlay = criarOverlayDesafio(`
        <div class="desafio-cartao arena-boss">
            <div class="placa-quebrando"><span>DESAFIO DO BOSS</span></div>
            <img class="kaiju" src="assets/kaiju-boss.png" alt="Kaiju, o chefe do desafio" />
            <div class="vida-boss"><span>VIDA DO KAIJU</span><div><i id="vida-kaiju"></i></div></div>
            <p id="contador-boss"></p><h2 id="pergunta-boss"></h2><div id="alternativas-boss"></div><p id="feedback-boss" class="feedback-boss"></p>
        </div>`);
    const exibirQuestao = () => {
        const atual = questoes[indice];
        overlay.querySelector('#contador-boss').textContent = `Ataque ${indice + 1} de 3`;
        overlay.querySelector('#pergunta-boss').textContent = atual.texto;
        const opcoes = overlay.querySelector('#alternativas-boss');
        opcoes.innerHTML = '';
        atual.alternativas.forEach((texto, posicao) => {
            const botao = document.createElement('button'); botao.textContent = texto;
            botao.onclick = () => responderBoss(posicao, atual, opcoes);
            opcoes.appendChild(botao);
        });
    };
    const responderBoss = (resposta, atual, opcoes) => {
        opcoes.querySelectorAll('button').forEach((botao) => botao.disabled = true);
        const acertou = resposta === atual.respostaCorreta;
        const feedbackBoss = overlay.querySelector('#feedback-boss');
        if (acertou) { acertos++; overlay.querySelector('.kaiju').classList.add('sofrendo-dano'); setTimeout(() => overlay.querySelector('.kaiju')?.classList.remove('sofrendo-dano'), 450); }
        overlay.querySelector('#vida-kaiju').style.width = `${100 - (acertos / 3) * 100}%`;
        feedbackBoss.textContent = `${acertou ? 'Acerto! O Kaiju sofreu dano.' : 'Errou! O Kaiju resistiu.'} ${atual.explicacao}`;
        setTimeout(() => { indice++; if (indice < 3) exibirQuestao(); else encerrarBatalha(overlay, acertos); }, 1500);
    };
    exibirQuestao();
}

function encerrarBatalha(overlay, acertos) {
    if (acertos === 3) {
        overlay.innerHTML = `<div class="desafio-cartao vitoria-boss"><div class="trofeu">🏆</div><p class="desafio-selo">KAIJU DERROTADO</p><h2>Parabéns!</h2><p>Você acertou as 3 perguntas e conquistou o troféu.</p><button class="concluir">Ver resultado</button></div>`;
    } else {
        overlay.innerHTML = `<div class="desafio-cartao derrota-boss"><p class="perigo">BATALHA ENCERRADA</p><h2>O Kaiju resistiu</h2><p>Você acertou ${acertos} de 3 ataques. Para derrotá-lo, é preciso acertar as três perguntas.</p><button class="concluir">Ver resultado</button></div>`;
    }
    overlay.querySelector('.concluir').onclick = () => { overlay.remove(); desafioAtivo = true; finalizarResultadoPadrao(); };
}
