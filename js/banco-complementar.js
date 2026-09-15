/* Questões extras: cada série passa a ter exatamente 10 perguntas. */
(function () {
  const extras = {
    matematica: [
      ['Calcule 15% de 200.', ['20', '25', '30', '35'], 2, '15% de 200 é 0,15 × 200 = 30.'],
      ['Qual é o resultado de 7 × 8?', ['54', '56', '58', '64'], 1, '7 multiplicado por 8 é 56.'],
      ['A soma dos ângulos internos de um triângulo é:', ['90°', '180°', '270°', '360°'], 1, 'Todo triângulo possui 180° em seus ângulos internos.'],
      ['Qual fração é equivalente a 1/2?', ['2/3', '2/4', '3/4', '4/6'], 1, 'Ao multiplicar numerador e denominador por 2, temos 2/4.']
    ],
    portugues: [
      ['Em “Os estudantes pesquisaram o tema”, qual é o verbo?', ['Os', 'estudantes', 'pesquisaram', 'tema'], 2, '“Pesquisaram” indica a ação realizada.'],
      ['Qual opção apresenta um sinônimo de “feliz”?', ['Alegre', 'Cansado', 'Distante', 'Silencioso'], 0, 'Alegre tem sentido próximo de feliz.'],
      ['Em uma notícia, o lead serve principalmente para:', ['Apresentar informações principais', 'Criar um final surpresa', 'Dar uma opinião pessoal', 'Fazer rimas'], 0, 'O lead resume as informações essenciais da notícia.'],
      ['Qual frase está escrita de forma adequada?', ['Nós fomos à biblioteca.', 'Nós foi à biblioteca.', 'Nós fomos a biblioteca sem artigo.', 'Nós fomos à bibliotecas.'], 0, 'Com o verbo “ir” e a expressão “à biblioteca”, a frase está correta.']
    ],
    ingles: [
      ['What is the opposite of “hot”?', ['Cold', 'Tall', 'Fast', 'New'], 0, '“Cold” significa frio, o oposto de hot.'],
      ['Complete: “She ___ a student.”', ['are', 'is', 'am', 'be'], 1, 'Com “she”, usamos “is”.'],
      ['What does “book” mean in Portuguese?', ['Caneta', 'Livro', 'Cadeira', 'Escola'], 1, '“Book” significa livro.'],
      ['Choose the correct plural of “child”.', ['Childs', 'Childes', 'Children', 'Childrens'], 2, 'O plural irregular de child é children.']
    ],
    historia: [
      ['A História estuda principalmente:', ['Os acontecimentos e ações humanas no tempo', 'Somente o futuro', 'Apenas mapas', 'Somente animais'], 0, 'A História investiga as sociedades e suas transformações ao longo do tempo.'],
      ['Documentos, fotografias e objetos antigos podem ser:', ['Fontes históricas', 'Fenômenos climáticos', 'Planetas', 'Equações'], 0, 'Esses materiais ajudam a pesquisar e interpretar o passado.'],
      ['A abolição da escravidão no Brasil ocorreu em:', ['1500', '1822', '1888', '1988'], 2, 'A Lei Áurea foi assinada em 1888.'],
      ['A cidadania está relacionada principalmente a:', ['Direitos e deveres na sociedade', 'Somente riqueza', 'Viagens espaciais', 'Apenas exercícios físicos'], 0, 'Cidadania envolve participação social, direitos e responsabilidades.']
    ],
    geografia: [
      ['O planeta Terra é dividido em grandes massas de terra chamadas:', ['Continentes', 'Satélites', 'Vulcões', 'Constelações'], 0, 'Os continentes são grandes porções de terra emersas.'],
      ['Qual elemento influencia o clima de uma região?', ['Latitude', 'Nome da cidade', 'Cor das casas', 'Quantidade de ruas'], 0, 'A latitude interfere na incidência de luz solar e, portanto, no clima.'],
      ['A migração é o movimento de pessoas:', ['De um lugar para outro', 'Somente dentro de uma sala', 'Entre planetas', 'Sem mudar de lugar'], 0, 'Migração é o deslocamento de pessoas entre lugares.'],
      ['Um mapa é usado para:', ['Representar espaços geográficos', 'Substituir textos literários', 'Medir a temperatura corporal', 'Criar músicas'], 0, 'Mapas representam e ajudam a interpretar o espaço geográfico.']
    ],
    ciencias: [
      ['Qual órgão bombeia o sangue pelo corpo?', ['Pulmão', 'Coração', 'Estômago', 'Fígado'], 1, 'O coração impulsiona o sangue pelo sistema circulatório.'],
      ['A água no estado sólido é chamada de:', ['Vapor', 'Gelo', 'Chuva', 'Névoa'], 1, 'Quando congela, a água passa para o estado sólido: gelo.'],
      ['As plantas produzem seu próprio alimento por meio da:', ['Fotossíntese', 'Digestão', 'Fermentação', 'Erosão'], 0, 'Na fotossíntese, a planta usa luz, água e gás carbônico para produzir alimento.'],
      ['Qual hábito ajuda a preservar o ambiente?', ['Separar materiais recicláveis', 'Desperdiçar água', 'Jogar lixo no rio', 'Queimar plástico'], 0, 'A separação de recicláveis facilita o reaproveitamento de materiais.']
    ]
  };

  const bancos = {
    matematica: 'perguntasMatematica', portugues: 'perguntasPortugues', ingles: 'perguntasIngles',
    historia: 'perguntasHistoria', geografia: 'perguntasGeografia', ciencias: 'perguntasCiencias'
  };

  window.adicionarPerguntasComplementares = function (disciplina) {
    const banco = window[bancos[disciplina]];
    if (!banco || !extras[disciplina]) return;
    Object.values(banco).forEach((lista) => {
      extras[disciplina].forEach(([texto, alternativas, respostaCorreta, explicacao]) => {
        if (lista.length < 10) lista.push({ texto, alternativas, respostaCorreta, explicacao, dificuldade: 'media', tipo: 'revisao' });
      });
    });
  };
}());
