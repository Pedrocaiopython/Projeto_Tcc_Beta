// Cada série recebe questões próprias para completar dez itens sem repetir um
// bloco genérico. Os temas e valores variam por nível para preservar progressão.
(function () {
  const fontes = {
    matematica: 'https://basenacionalcomum.mec.gov.br/',
    portugues: 'https://basenacionalcomum.mec.gov.br/',
    ciencias: 'https://basenacionalcomum.mec.gov.br/',
    ingles: 'https://basenacionalcomum.mec.gov.br/',
    historia: 'https://www.gov.br/arquivonacional/',
    geografia: 'https://educa.ibge.gov.br/'
  };
  const niveis = ['7ano', '8ano', '9ano', '1medio', '2medio', '3medio'];
  const bancos = {
    matematica: 'perguntasMatematica', portugues: 'perguntasPortugues',
    ingles: 'perguntasIngles', historia: 'perguntasHistoria',
    geografia: 'perguntasGeografia', ciencias: 'perguntasCiencias'
  };
  const q = (texto, alternativas, respostaCorreta, explicacao, dificuldade, tipo, fonte) => ({
    texto, alternativas, respostaCorreta, explicacao, dificuldade, tipo, fonte
  });

  function extrasMatematica(nivel, n) {
    const base = n * 2 + 6;
    return [
      q(`Uma cooperativa distribuiu ${base * 3} kg de alimentos igualmente em ${base} caixas. Quantos quilogramas ficaram em cada caixa?`, ['2 kg', '3 kg', '4 kg', '6 kg'], 1, `${base * 3} ÷ ${base} = 3 kg por caixa.`, n < 2 ? 'media' : 'dificil', 'divisao'),
      q(`Uma tarifa de R$ ${base * 10},00 recebeu desconto de 15%. Qual valor deve ser pago?`, [`R$ ${base * 7},00`, `R$ ${base * 8},00`, `R$ ${base * 8.5},00`, `R$ ${base * 9},00`], 2, `15% de R$ ${base * 10},00 é R$ ${base * 1.5},00; o total é R$ ${base * 8.5},00.`, 'media', 'porcentagem'),
      q(`Uma sequência começa em ${n + 2} e aumenta ${n + 3} unidades a cada termo. Qual é o quarto termo?`, [String(n + 8), String(2 * n + 8), String(4 * n + 11), String(5 * n + 12)], 2, `Somam-se ${n + 3} três vezes: ${n + 2} + 3 × ${n + 3} = ${4 * n + 11}.`, 'media', 'sequencia'),
      q(`Em uma planta na escala 1:${base * 100}, ${base / 2} cm representam qual distância real?`, [`${base / 2} m`, `${base} m`, `${base * 2} m`, `${base * 5} m`], 1, `${base / 2} × ${base * 100} cm = ${base * 50} cm = ${base} m.`, 'dificil', 'escala')
    ];
  }

  function extrasGeografia(nivel, n) {
    const cidades = ['duas cidades de uma mesma bacia', 'dois municípios de uma região metropolitana', 'duas áreas de um mapa temático', 'dois bairros com densidades distintas', 'duas regiões climáticas', 'dois territórios com redes de transporte'];
    return [
      q(`Ao comparar ${cidades[n]}, qual dado permite uma conclusão geográfica mais consistente?`, ['Uma impressão sem medida', 'Indicadores acompanhados de escala e legenda', 'A cor escolhida pelo leitor', 'O tamanho físico da folha'], 1, 'Dados, escala e legenda permitem interpretar e comparar fenômenos espaciais.', 'media', 'cartografia'),
      q(`Uma população de ${(n + 2) * 1000} habitantes ocupa ${n + 2} km². A densidade aproximada é:`, [`${n + 200} hab./km²`, `${n + 500} hab./km²`, '1.000 hab./km²', `${(n + 2) * 2}.000 hab./km²`], 2, `A densidade é população ÷ área: ${(n + 2) * 1000} ÷ ${n + 2} = 1.000 hab./km².`, 'dificil', 'demografia'),
      q(`Uma cidade impermeabilizou grande parte do solo e ocupou margens de rios. Qual combinação de efeitos é mais provável?`, ['Menos escoamento e menor risco', 'Mais escoamento superficial e maior risco de enchentes', 'Aumento automático de nascentes', 'Redução da urbanização'], 1, 'Impermeabilização e ocupação de áreas de risco dificultam a drenagem e ampliam enchentes.', 'media', 'urbanizacao'),
      q(`Para reduzir a pressão sobre um rio usado por cidades e agricultura, a medida mais completa é:`, ['Aumentar captações sem controle', 'Proteger nascentes, tratar efluentes e planejar o uso da água', 'Canalizar todos os cursos d’água', 'Retirar a vegetação das margens'], 1, 'A gestão integrada combina conservação, saneamento e planejamento do consumo.', 'dificil', 'recursos_hidricos')
    ];
  }

  function extrasCiencias(nivel, n) {
    const temas = ['uma horta escolar', 'um reservatório doméstico', 'um laboratório', 'uma praça urbana', 'uma estação de tratamento', 'uma área de conservação'];
    return [
      q(`Em ${temas[n]}, uma variável foi alterada e outra foi medida. Por que manter as demais condições constantes?`, ['Para eliminar a necessidade de dados', 'Para identificar o efeito da variável investigada', 'Para garantir qualquer resultado', 'Para substituir a hipótese'], 1, 'Controlar variáveis permite relacionar o resultado à condição que foi alterada.', 'dificil', 'metodologia'),
      q(`Se uma população de insetos diminui muito em ${temas[n]}, qual consequência ecológica é plausível?`, ['Nenhuma, pois as espécies são independentes', 'Alterações nas relações alimentares do ecossistema', 'Aumento obrigatório de todas as plantas', 'Transformação imediata do clima'], 1, 'A redução de uma população pode afetar predadores, presas e o equilíbrio da teia alimentar.', 'media', 'ecologia'),
      q(`Ao aquecer uma amostra de água em ${temas[n]}, a energia fornecida provoca principalmente:`, ['Desaparecimento da matéria', 'Aumento da agitação das partículas e possível mudança de estado', 'Criação de um novo elemento', 'Redução absoluta da temperatura'], 1, 'O aquecimento aumenta a energia das partículas e pode levar à vaporização.', 'media', 'materia'),
      q(`Para avaliar uma afirmação sobre saúde em ${temas[n]}, a melhor prática científica é:`, ['Aceitar o primeiro relato', 'Comparar evidências, método e repetição dos resultados', 'Escolher o resultado mais conveniente', 'Ignorar fontes e controles'], 1, 'Conclusões confiáveis dependem de evidências verificáveis e de método controlado.', 'dificil', 'saude')
    ];
  }

  function extrasHistoria(nivel, n) {
    const periodos = ['a expansão marítima', 'a industrialização', 'a formação republicana', 'a urbanização do século XX', 'a redemocratização', 'as relações internacionais contemporâneas'];
    return [
      q(`Ao estudar ${periodos[n]}, qual pergunta ajuda a evitar uma explicação apenas memorística?`, ['Qual foi a data isolada?', 'Quais grupos participaram e quais interesses estavam em disputa?', 'Qual personagem apareceu mais em livros?', 'Qual evento é mais fácil de decorar?'], 1, 'Analisar agentes e interesses relaciona o acontecimento ao contexto histórico.', 'dificil', 'analise'),
      q(`Uma carta, fotografia ou ata sobre ${periodos[n]} deve ser analisada considerando:`, ['A fonte como verdade completa', 'autoria, finalidade, contexto e limites do documento', 'apenas a aparência do papel', 'somente a data de produção'], 1, 'Fontes históricas precisam ser contextualizadas e confrontadas com outras evidências.', 'dificil', 'fontes'),
      q(`Uma mudança em ${periodos[n]} pode ser considerada consequência quando:`, ['ocorre sem relação temporal', 'resulta de condições e ações ligadas ao processo estudado', 'é escolhida por ser mais famosa', 'não afeta grupos sociais'], 1, 'Causas e consequências devem ser relacionadas ao processo e às ações históricas.', 'media', 'causa_consequencia'),
      q(`Ao comparar dois relatos sobre ${periodos[n]}, o estudante deve primeiro:`, ['Escolher o mais longo', 'identificar perspectivas, evidências e silêncios de cada relato', 'descartar ambos', 'aceitar a opinião mais recente'], 1, 'A comparação crítica revela perspectivas e limites das narrativas.', 'dificil', 'comparacao')
    ];
  }

  function extrasPortugues(nivel, n) {
    const textos = ['um editorial sobre transporte', 'uma campanha de saúde', 'um conto sobre memória', 'uma reportagem ambiental', 'um artigo de opinião', 'uma redação de vestibular'];
    return [
      q(`Em ${textos[n]}, o uso de dados verificáveis contribui principalmente para:`, ['Substituir completamente a interpretação', 'sustentar a argumentação e permitir avaliação da tese', 'tornar o texto necessariamente literário', 'eliminar a responsabilidade do autor'], 1, 'Dados funcionam como evidência e fortalecem uma tese quando são pertinentes.', 'dificil', 'argumentacao'),
      q(`Se o autor de ${textos[n]} usa “porém” para ligar duas ideias, o leitor deve reconhecer:`, ['uma oposição ou ressalva', 'uma sequência temporal obrigatória', 'uma explicação de lugar', 'uma enumeração sem contraste'], 0, '“Porém” introduz contraste ou ressalva entre as ideias conectadas.', 'media', 'coesao'),
      q(`Ao trocar uma palavra de ${textos[n]} por um sinônimo, é necessário verificar:`, ['somente o número de letras', 'se o sentido e o registro permanecem adequados ao contexto', 'se a palavra fica mais difícil', 'apenas a posição no parágrafo'], 1, 'Sinônimos dependem do sentido contextual e do grau de formalidade.', 'media', 'semantica'),
      q(`Uma revisão final de ${textos[n]} deve priorizar:`, ['apenas a aparência', 'clareza das relações entre ideias, concordância e pontuação', 'a troca de todas as palavras', 'a retirada de exemplos'], 1, 'Revisar envolve sentido, coesão e convenções da língua, não apenas aparência.', 'dificil', 'revisao')
    ];
  }

  function extrasIngles(nivel, n) {
    const contexts = ['a school notice', 'a short dialogue', 'a public poster', 'an email', 'a news excerpt', 'an academic summary'];
    return [
      q(`In ${contexts[n]}, “although” introduces an idea of:`, ['contrast', 'cause', 'place', 'quantity'], 0, '“Although” introduces a contrast or concession.', 'media', 'reading'),
      q(`Choose the sentence that best fits ${contexts[n]}:`, ['The information are useful.', 'The information is useful.', 'The information be useful.', 'The information am useful.'], 1, '“Information” is uncountable and takes the singular verb “is”.', 'dificil', 'grammar'),
      q(`If a reader checks the context before translating ${contexts[n]}, the main benefit is:`, ['a more accurate meaning', 'a longer sentence', 'a different alphabet', 'the removal of verbs'], 0, 'Context helps identify the intended meaning instead of relying on isolated words.', 'media', 'reading'),
      q(`A polite request in ${contexts[n]} is:`, ['Send it now!', 'Could you send it, please?', 'You sending it?', 'Send you it.'], 1, '“Could you… please?” is a polite request structure.', 'media', 'communication')
    ];
  }

  const geradores = { matematica: extrasMatematica, portugues: extrasPortugues, ingles: extrasIngles, historia: extrasHistoria, geografia: extrasGeografia, ciencias: extrasCiencias };
  window.adicionarPerguntasComplementares = function (disciplina) {
    const banco = window[bancos[disciplina]];
    const gerar = geradores[disciplina];
    if (!banco || !gerar) return;

    niveis.forEach((nivel, indice) => {
      const lista = banco[nivel];
      if (!lista) return;
      lista.forEach((questao) => { if (!questao.fonte) questao.fonte = fontes[disciplina]; });
      while (lista.length < 10) {
        lista.push(...gerar(nivel, indice).slice(0, 10 - lista.length));
      }
      lista.forEach((questao) => { if (!questao.fonte) questao.fonte = fontes[disciplina]; });
    });
  };
}());
