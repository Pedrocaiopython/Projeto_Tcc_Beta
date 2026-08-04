const themeMap = {
    cyber: {
        principal: '#00b7ff',
        secundaria: '#7b2cff',
        texto: '#ffffff',
        glow: '#00d9ff'
    },
    golden: {
        principal: '#facc15',
        secundaria: '#7c2d12',
        texto: '#fff8d6',
        glow: '#f59e0b'
    },
    crimson: {
        principal: '#ef4444',
        secundaria: '#7f1d1d',
        texto: '#fff1f2',
        glow: '#fb7185'
    }
};

function applyTheme(themeName) {
    const theme = themeMap[themeName] || themeMap.cyber;

    document.documentElement.style.setProperty('--cor-principal', theme.principal);
    document.documentElement.style.setProperty('--cor-secundaria', theme.secundaria);
    document.documentElement.style.setProperty('--cor-texto', theme.texto);
    document.documentElement.style.setProperty('--cor-glow', theme.glow);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tema-botao').forEach((button) => {
        button.addEventListener('click', () => {
            applyTheme(button.dataset.theme);
        });
    });

    applyTheme('cyber');
});
