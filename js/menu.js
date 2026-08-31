// --- CONFIGURAÇÃO DAS MATÉRIAS COM IMAGENS CONCEITUAIS E SÍMBOLOS (FIM DO ROBÔ EXTRA) ---
const listaMaterias = [
    { 
        id: "matematica", 
        name: "Matemática", 
        badge: "EXATAS • NÍVEL I", 
        url: "matematico.html", 
        simbolo: "📐",
        bg: "https://unsplash.com" 
    },
    { 
        id: "ciencias", 
        name: "Ciências", 
        badge: "EXATAS • NÍVEL II", 
        url: "ciencias.html", 
        simbolo: "⚛️",
        bg: "https://unsplash.com"
    },
    { 
        id: "geografia", 
        name: "Geografia", 
        badge: "HUMANAS • NÍVEL I", 
        url: "geografia.html", 
        simbolo: "🌍",
        bg: "https://unsplash.com"
    },
    { 
        id: "historia", 
        name: "História", 
        badge: "HUMANAS • NÍVEL II", 
        url: "historia.html", 
        simbolo: "📜",
        bg: "https://unsplash.com"
    },
    { 
        id: "portugues", 
        name: "Português", 
        badge: "LINGUAGENS • NÍVEL I", 
        url: "portugues.html", 
        simbolo: "✍️",
        bg: "https://unsplash.com"
    },
    { 
        id: "ingles", 
        name: "Inglês", 
        badge: "LINGUAGENS • NÍVEL II", 
        url: "ingles.html", 
        simbolo: "🇬🇧",
        bg: "https://unsplash.com"
    }
];

const catalogoItens = [
    { id: "padrao", nome: "Padrão", tipo: "corpo", visual: "✨", preco: 0 },
    { id: "fogo", nome: "Efeito Fogo", tipo: "corpo", visual: "🔥", preco: 1 },
    { id: "raio", nome: "Efeito Raio", tipo: "corpo", visual: "⚡", preco: 1 }
];

let indiceAtual = 0;
let categoriaAtivaLoja = 'corpo';

const botaoJogarRank = document.getElementById('botaoJogarRank');
const distintivoMateria = document.getElementById('distintivoMateria');
const tituloMateria = document.getElementById('tituloMateria');
const plataformaMapa = document.getElementById('plataformaMapa');
const simboloMateria = document.getElementById('simboloMateria');
const modalLoja = document.getElementById('modalLoja');
const gradeItensLoja = document.getElementById('gradeItensLoja');

function atualizarMenu(index) {
    const materia = listaMaterias[index];
    const moldura = document.getElementById('recipienteMapa');
    
    moldura.classList.add('efeito-transicao');
    tituloMateria.classList.add('efeito-transicao');
    
    setTimeout(() => {
        tituloMateria.textContent = materia.name;
        distintivoMateria.textContent = materia.badge;
        simboloMateria.textContent = materia.simbolo;
        plataformaMapa.style.backgroundImage = `url('${materia.bg}')`;
        
        moldura.classList.remove('efeito-transicao');
        tituloMateria.classList.remove('efeito-transicao');
    }, 150);
}

document.getElementById('botaoAnterior').addEventListener('click', () => {
    indiceAtual = (indiceAtual === 0) ? listaMaterias.length - 1 : indiceAtual - 1;
    atualizarMenu(indiceAtual);
});
document.getElementById('botaoProximo').addEventListener('click', () => {
    indiceAtual = (indiceAtual === listaMaterias.length - 1) ? 0 : indiceAtual + 1;
    atualizarMenu(indiceAtual);
});

botaoJogarRank.addEventListener('click', () => { window.location.href = listaMaterias[indiceAtual].url; });

function atualizarInterfaceEconomia() {
    let pontos = parseInt(localStorage.getItem('tcc_pontos_avatar')) || 0;
    document.getElementById('saldoPontos').textContent = pontos;
}

document.getElementById('btnAbrirLoja').addEventListener('click', () => { modalLoja.style.display = 'flex'; renderizarItensLoja(); });
document.getElementById('btnFecharLoja').addEventListener('click', () => { modalLoja.style.display = 'none'; });

// --- SISTEMA CORRETOR DE ÁUDIO (MUTAR TOTALMENTE) ---
const musicaFundo = document.getElementById('musicaFundo');
const botaoAlternarAudio = document.getElementById('botaoAlternarAudio');
const iconeAudio = document.getElementById('iconeAudio');

botaoAlternarAudio.addEventListener('click', () => {
    if (musicaFundo.paused) {
        musicaFundo.play().catch(() => {});
        iconeAudio.textContent = "🔊";
        localStorage.setItem('tcc_audio_mutado', 'false');
    } else {
        musicaFundo.pause();
        iconeAudio.textContent = "🔇";
        localStorage.setItem('tcc_audio_mutado', 'true');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    atualizarMenu(indiceAtual);
    atualizarInterfaceEconomia();
});
