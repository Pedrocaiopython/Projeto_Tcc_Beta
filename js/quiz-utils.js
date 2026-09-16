(function (global) {
    function embaralhar(lista) {
        const copia = [...lista];
        for (let indice = copia.length - 1; indice > 0; indice -= 1) {
            const troca = Math.floor(Math.random() * (indice + 1));
            [copia[indice], copia[troca]] = [copia[troca], copia[indice]];
        }
        return copia;
    }

    function prepararQuestao(questao) {
        const alternativasMarcadas = questao.alternativas.map((texto, indice) => ({
            texto,
            correta: indice === questao.respostaCorreta
        }));
        const alternativasEmbaralhadas = embaralhar(alternativasMarcadas);

        return {
            ...questao,
            alternativas: alternativasEmbaralhadas.map((item) => item.texto),
            respostaCorreta: alternativasEmbaralhadas.findIndex((item) => item.correta)
        };
    }

    function prepararTentativa(perguntas) {
        return embaralhar(perguntas.map(prepararQuestao));
    }

    global.embaralhar = embaralhar;
    global.prepararQuestao = prepararQuestao;
    global.prepararTentativa = prepararTentativa;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { embaralhar, prepararQuestao, prepararTentativa };
    }
}(typeof window !== 'undefined' ? window : globalThis));
