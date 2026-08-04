document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('botaoConfiguracoes');
    const settingsPanel = document.getElementById('configPanel');
    const transitionOverlay = document.getElementById('menuTransition');
    const materiaLinks = document.querySelectorAll('.botao-materia[data-target]');

    if (settingsButton && settingsPanel) {
        settingsButton.addEventListener('click', () => {
            settingsPanel.classList.toggle('hidden');
            settingsPanel.setAttribute(
                'aria-hidden',
                String(settingsPanel.classList.contains('hidden'))
            );
        });
    }

    materiaLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = link.dataset.target;

            if (!target) return;

            event.preventDefault();

            if (transitionOverlay) {
                transitionOverlay.classList.add('show');
            }

            setTimeout(() => {
                window.location.href = target;
            }, 700);
        });
    });
});
