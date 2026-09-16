const listaMaterias = [
    { id: 'matematica', name: 'Matemática', badge: 'EXATAS • NÍVEL I', url: 'matematico.html', simbolo: 'M', bg: 'linear-gradient(135deg, #2841ad, #5c7cff)' },
    { id: 'ciencias', name: 'Ciências', badge: 'EXATAS • NÍVEL II', url: 'ciencias.html', simbolo: 'C', bg: 'linear-gradient(135deg, #19866d, #4ee0c8)' },
    { id: 'geografia', name: 'Geografia', badge: 'HUMANAS • NÍVEL I', url: 'geografia.html', simbolo: 'G', imagem: 'assets/materias/geografia/globo-terrestre.png', bg: 'linear-gradient(135deg, #255f6c, #62c6d8)' },
    { id: 'historia', name: 'História', badge: 'HUMANAS • NÍVEL II', url: 'historia.html', simbolo: 'H', imagem: 'assets/materias/historia/mapa-antigo.png', bg: 'linear-gradient(135deg, #7a4a11, #d8a32d)' },
    { id: 'portugues', name: 'Português', badge: 'LINGUAGENS • NÍVEL I', url: 'portugues.html', simbolo: 'P', bg: 'linear-gradient(135deg, #184f7a, #6ba8ff)' },
    { id: 'ingles', name: 'Inglês', badge: 'LINGUAGENS • NÍVEL II', url: 'ingles.html', simbolo: 'I', bg: 'linear-gradient(135deg, #502d87, #9d77ff)' }
];

let indiceAtual = 0;
let categoriaAtivaLoja = 'avatar';

const botaoJogarRank = document.getElementById('botaoJogarRank');
const distintivoMateria = document.getElementById('distintivoMateria');
const tituloMateria = document.getElementById('tituloMateria');
const plataformaMapa = document.getElementById('plataformaMapa');
const simboloMateria = document.getElementById('simboloMateria');
const imagemMateria = document.getElementById('imagemMateria');
const modalLoja = document.getElementById('modalLoja');
const gradeItensLoja = document.getElementById('gradeItensLoja');
const nomeUsuario = document.getElementById('nomeUsuario');
const nivelUsuario = document.getElementById('nivelUsuario');
const textoXp = document.getElementById('textoXp');
const saldoPontos = document.getElementById('saldoPontos');
const preenchimentoBarraXp = document.getElementById('preenchimentoBarraXp');
const iniciaisAvatar = document.getElementById('iniciaisAvatar');

function atualizarMenu(index) {
    const materia = listaMaterias[index];
    const moldura = document.getElementById('recipienteMapa');

    moldura.classList.add('efeito-transicao');
    tituloMateria.classList.add('efeito-transicao');

    setTimeout(() => {
        tituloMateria.textContent = materia.name;
        distintivoMateria.textContent = materia.badge;
        simboloMateria.textContent = materia.simbolo;
        imagemMateria.hidden = !materia.imagem;
        imagemMateria.alt = materia.imagem ? `Símbolo de ${materia.name}` : '';
        if (materia.imagem) {
            imagemMateria.src = materia.imagem;
        } else {
            imagemMateria.removeAttribute('src');
        }
        plataformaMapa.style.background = materia.bg;
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

botaoJogarRank.addEventListener('click', () => {
    window.location.href = listaMaterias[indiceAtual].url;
});

function renderProfile(profile) {
    const xpTotal = Number(profile?.xp_total || 0);
    const level = Number(profile?.level || profile?.levelInfo?.level || 1);
    const xpForNext = Number(profile?.xpForNextLevel || 250);
    const percentage = Math.min(100, Math.max(0, Number(profile?.xpProgressPercent || 0)));

    nomeUsuario.textContent = profile?.name || 'Jogador';
    nivelUsuario.textContent = String(level);
    textoXp.textContent = `${xpTotal} / ${xpForNext} XP`;
    saldoPontos.textContent = String(profile?.points || 0);
    preenchimentoBarraXp.style.width = `${percentage}%`;
    iniciaisAvatar.textContent = (profile?.name || 'J').charAt(0).toUpperCase();
}

function renderShop(items) {
    const activeItems = items.filter((item) => item.category === categoriaAtivaLoja);
    gradeItensLoja.innerHTML = '';

    if (!activeItems.length) {
        gradeItensLoja.innerHTML = '<p class="empty-state">Nenhum item disponível nesta categoria.</p>';
        return;
    }

    activeItems.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'item-loja';

        const icon = document.createElement('div');
        icon.className = 'icone-item-loja';
        icon.textContent = item.visual || item.name.charAt(0).toUpperCase();

        const info = document.createElement('div');
        info.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <strong>${item.price} pontos</strong>
        `;

        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = item.owned ? 'Equipar' : 'Comprar';
        button.addEventListener('click', () => {
            if (item.owned) {
                equipItem(item.id);
            } else {
                buyItem(item.id);
            }
        });

        card.append(icon, info, button);
        gradeItensLoja.appendChild(card);
    });
}

async function loadProfile() {
    try {
        const response = await requestJson('/api/profile');
        renderProfile(response.profile);
        return response.profile;
    } catch (error) {
        window.location.href = '/index.html';
        return null;
    }
}

async function loadShop() {
    try {
        const response = await requestJson('/api/shop');
        renderShop(response.items || []);
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function buyItem(itemId) {
    try {
        const response = await requestJson('/api/shop/purchase', {
            method: 'POST',
            body: JSON.stringify({ itemId })
        });
        alert(response.message || 'Item comprado com sucesso.');
        await loadProfile();
        await loadShop();
    } catch (error) {
        alert(error.message || 'Não foi possível comprar o item.');
    }
}

async function equipItem(itemId) {
    try {
        const response = await requestJson('/api/shop/equip', {
            method: 'POST',
            body: JSON.stringify({ itemId })
        });
        alert(response.message || 'Item equipado.');
        await loadProfile();
        await loadShop();
    } catch (error) {
        alert(error.message || 'Não foi possível equipar o item.');
    }
}

document.getElementById('btnAbrirLoja').addEventListener('click', () => {
    modalLoja.style.display = 'flex';
    loadShop();
});

document.getElementById('btnFecharLoja').addEventListener('click', () => {
    modalLoja.style.display = 'none';
});

Array.from(document.querySelectorAll('.aba-item')).forEach((item) => {
    item.addEventListener('click', async () => {
        categoriaAtivaLoja = item.dataset.category;
        Array.from(document.querySelectorAll('.aba-item')).forEach((button) => {
            button.classList.toggle('ativa', button === item);
        });
        await loadShop();
    });
});

document.getElementById('btnLogout').addEventListener('click', async () => {
    try {
        await requestJson('/api/auth/logout', { method: 'POST' });
        window.location.href = '/index.html';
    } catch (error) {
        console.error(error);
        window.location.href = '/index.html';
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    atualizarMenu(indiceAtual);
    await loadProfile();
    await loadShop();
});
