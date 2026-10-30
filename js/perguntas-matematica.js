
const perguntasMatematica = {
  // ==========================================
  // 7º ANO - ENSINO FUNDAMENTAL
  // ==========================================
  "7ano": [
    {
      texto: 'Uma loja oferece 20% de desconto em um caderno que custa R$ 50,00. Qual será o valor pago pelo cliente após a aplicação do desconto?',
      alternativas: ['R$ 35,00', 'R$ 40,00', 'R$ 42,00', 'R$ 45,00'],
      respostaCorreta: 1,
      explicacao: '20% de 50 = 10. Subtraindo o desconto: 50 − 10 = R$ 40,00.',
      dificuldade: 'facil',
      tipo: 'aplicacao'
    },
    {
      texto: 'Em uma sala de aula há 18 meninas e 12 meninos. Qual é a razão entre o número de meninos e o total de alunos, na forma de fração simplificada?',
      alternativas: ['2/3', '2/5', '3/5', '5/2'],
      respostaCorreta: 1,
      explicacao: 'O total é 18 + 12 = 30 alunos. A razão é 12/30. Simplificando por 6, obtemos 2/5.',
      dificuldade: 'media',
      tipo: 'comparacao'
    },
    {
      texto: 'Uma garrafa contém 1,5 litro de água. Sabendo que 1 litro equivale a 1.000 mililitros, quantos mililitros há na garrafa?',
      alternativas: ['150 mL', '1.500 mL', '15.000 mL', '150.000 mL'],
      respostaCorreta: 1,
      explicacao: 'Multiplicamos 1,5 por 1.000. O resultado é 1.500 mL.',
      dificuldade: 'facil',
      tipo: 'aplicacao'
    },
    {
      texto: 'Um carro percorreu 240 quilômetros em 4 horas, mantendo velocidade média constante. Qual foi sua velocidade média?',
      alternativas: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
      respostaCorreta: 2,
      explicacao: 'Velocidade média = distância ÷ tempo. Assim: 240 ÷ 4 = 60 km/h.',
      dificuldade: 'media',
      tipo: 'resolucao'
    },
    {
      texto: 'Um terreno retangular possui 7 metros de largura e 12 metros de comprimento. Qual é o seu perímetro?',
      alternativas: ['19 m', '38 m', '84 m', '96 m'],
      respostaCorreta: 1,
      explicacao: 'Perímetro = 2 × (7 + 12) = 2 × 19 = 38 metros.',
      dificuldade: 'media',
      tipo: 'geometria'
    },
    {
      texto: 'Observe a sequência numérica: 3, 6, 12, 24, ... Cada termo é obtido multiplicando o anterior por 2. Qual é o próximo termo?',
      alternativas: ['27', '30', '36', '48'],
      respostaCorreta: 3,
      explicacao: 'A sequência segue a regra de multiplicação por 2. Portanto, 24 × 2 = 48.',
      dificuldade: 'media',
      tipo: 'analise'
    },
    {
      texto: 'Uma escola possui 40 alunos em uma turma. Se 3/5 desses alunos participam de atividades esportivas, quantos alunos participam dessas atividades?',
      alternativas: ['20 alunos', '22 alunos', '24 alunos', '28 alunos'],
      respostaCorreta: 2,
      explicacao: 'Calculamos 3/5 de 40: 40 ÷ 5 = 8. Depois, 8 × 3 = 24 alunos.',
      dificuldade: 'media',
      tipo: 'fracao'
    },
    {
      texto: 'Durante uma manhã, a temperatura era de −8 °C. Ao longo do dia, ela aumentou 13 °C. Qual foi a temperatura final?',
      alternativas: ['3 °C', '5 °C', '8 °C', '13 °C'],
      respostaCorreta: 1,
      explicacao: 'Somamos a variação à temperatura inicial: −8 + 13 = 5 °C.',
      dificuldade: 'media',
      tipo: 'numerosInteiros'
    },
    {
      texto: 'Um terreno triangular possui 10 metros de base e 6 metros de altura. Qual é a área desse terreno?',
      alternativas: ['16 m²', '30 m²', '60 m²', '80 m²'],
      respostaCorreta: 1,
      explicacao: 'Área do triângulo = (base × altura) ÷ 2. Assim: (10 × 6) ÷ 2 = 30 m².',
      dificuldade: 'media',
      tipo: 'geometria'
    },
    {
      texto: 'Uma máquina produz 2,4 metros de tecido por hora. Quantos metros ela produzirá em 3 horas, mantendo o mesmo ritmo?',
      alternativas: ['6,2 m', '6,8 m', '7,2 m', '7,8 m'],
      respostaCorreta: 2,
      explicacao: 'Multiplicamos a produção por hora pelo tempo: 2,4 × 3 = 7,2 metros.',
      dificuldade: 'facil',
      tipo: 'proporcao'
    }
  ],

  // ==========================================
  // 8º ANO - ENSINO FUNDAMENTAL
  // ==========================================
  "8ano": [
    {
      texto: 'Um produto custava R$ 80,00 e passou a custar R$ 96,00. Considerando o preço inicial, qual foi o percentual de aumento?',
      alternativas: ['12%', '16%', '18%', '20%'],
      respostaCorreta: 3,
      explicacao: 'O aumento foi de 96 − 80 = R$ 16,00. Dividindo pelo preço inicial: 16 ÷ 80 = 0,20. Portanto, o aumento foi de 20%.',
      dificuldade: 'media',
      tipo: 'aplicacao'
    },
    {
      texto: 'Uma equação do primeiro grau é representada por x + 7 = 19. Qual valor de x torna essa igualdade verdadeira?',
      alternativas: ['10', '11', '12', '13'],
      respostaCorreta: 2,
      explicacao: 'Subtraímos 7 dos dois lados: x = 19 − 7 = 12.',
      dificuldade: 'facil',
      tipo: 'equacao'
    },
    {
      texto: 'Uma loja vende 3 camisetas por R$ 75,00. Mantendo o mesmo preço por unidade, quanto custarão 5 camisetas?',
      alternativas: ['R$ 100,00', 'R$ 115,00', 'R$ 120,00', 'R$ 125,00'],
      respostaCorreta: 3,
      explicacao: 'Cada camiseta custa 75 ÷ 3 = R$ 25,00. Para 5 camisetas: 25 × 5 = R$ 125,00.',
      dificuldade: 'media',
      tipo: 'proporcao'
    },
    {
      texto: 'Respeitando a ordem das operações matemáticas, qual é o resultado da expressão 2³ + 3²?',
      alternativas: ['11', '17', '18', '25'],
      respostaCorreta: 1,
      explicacao: 'Primeiro resolvemos as potências: 2³ = 8 e 3² = 9. Depois somamos: 8 + 9 = 17.',
      dificuldade: 'media',
      tipo: 'analise'
    },
    {
      texto: 'Uma praça possui formato retangular, com 18 metros de comprimento e 12 metros de largura. Qual é a área total dessa praça?',
      alternativas: ['30 m²', '60 m²', '216 m²', '300 m²'],
      respostaCorreta: 2,
      explicacao: 'A área de um retângulo é comprimento × largura: 18 × 12 = 216 m².',
      dificuldade: 'facil',
      tipo: 'geometria'
    },
    {
      texto: 'Uma empresa vendeu 80 produtos em 5 dias. Se mantiver a mesma média diária de vendas, quantos produtos venderá em 12 dias?',
      alternativas: ['160', '192', '200', '240'],
      respostaCorreta: 1,
      explicacao: 'A média diária é 80 ÷ 5 = 16 produtos. Em 12 dias: 16 × 12 = 192 produtos.',
      dificuldade: 'dificil',
      tipo: 'resolucao'
    },
    {
      texto: 'Resolva a equação do primeiro grau: 2x − 4 = 10. Qual é o valor de x?',
      alternativas: ['5', '6', '7', '8'],
      respostaCorreta: 2,
      explicacao: 'Somamos 4 aos dois lados: 2x = 14. Depois dividimos por 2: x = 7.',
      dificuldade: 'media',
      tipo: 'equacao'
    },
    {
      texto: 'Utilizando as propriedades das potências, qual é o resultado da expressão 5² − 3²?',
      alternativas: ['12', '16', '18', '22'],
      respostaCorreta: 1,
      explicacao: 'Calculamos as potências: 5² = 25 e 3² = 9. Depois subtraímos: 25 − 9 = 16.',
      dificuldade: 'media',
      tipo: 'potenciacao'
    },
    {
      texto: 'Quatro quilogramas de arroz custam R$ 28,00. Mantendo o mesmo preço por quilograma, quanto custarão 7 quilogramas?',
      alternativas: ['R$ 42,00', 'R$ 45,00', 'R$ 49,00', 'R$ 56,00'],
      respostaCorreta: 2,
      explicacao: 'Cada quilograma custa 28 ÷ 4 = R$ 7,00. Para 7 quilogramas: 7 × 7 = R$ 49,00.',
      dificuldade: 'media',
      tipo: 'proporcao'
    },
    {
      texto: 'Um dado comum possui seis faces numeradas de 1 a 6. Ao lançá-lo uma vez, qual é a probabilidade de obter um número par?',
      alternativas: ['1/6', '1/3', '1/2', '2/3'],
      respostaCorreta: 2,
      explicacao: 'Os resultados pares são 2, 4 e 6. Existem 3 resultados favoráveis entre 6 possíveis: 3/6 = 1/2, ou 50%.',
      dificuldade: 'media',
      tipo: 'probabilidade'
    }
  ],

  // ==========================================
  // 9º ANO - ENSINO FUNDAMENTAL
  // ==========================================
  "9ano": [
    {
      texto: 'Considere a equação do primeiro grau 3x − 5 = 16. Qual é o valor de x que satisfaz essa equação?',
      alternativas: ['5', '6', '7', '8'],
      respostaCorreta: 2,
      explicacao: 'Somamos 5 aos dois lados: 3x = 21. Depois dividimos por 3: x = 7.',
      dificuldade: 'facil',
      tipo: 'equacao'
    },
    {
      texto: 'Um ônibus saiu às 8h15 e realizou uma viagem com duração de 1 hora e 40 minutos. Considerando que não houve atrasos, a que horas chegou ao destino?',
      alternativas: ['9h45', '9h55', '10h05', '10h15'],
      respostaCorreta: 1,
      explicacao: '8h15 + 1 hora = 9h15. Acrescentando 40 minutos, chegamos a 9h55.',
      dificuldade: 'media',
      tipo: 'aplicacao'
    },
    {
      texto: 'Uma função é definida por f(x) = 2x + 3. Qual é o resultado de f(4)?',
      alternativas: ['7', '9', '11', '13'],
      respostaCorreta: 2,
      explicacao: 'Substituímos x por 4: f(4) = 2 × 4 + 3 = 8 + 3 = 11.',
      dificuldade: 'media',
      tipo: 'funcao'
    },
    {
      texto: 'A média aritmética das idades de 5 alunos é 14 anos. Quatro deles têm 12, 13, 15 e 16 anos. Qual é a idade do quinto aluno?',
      alternativas: ['12 anos', '13 anos', '14 anos', '15 anos'],
      respostaCorreta: 2,
      explicacao: 'A soma das cinco idades é 5 × 14 = 70. Os quatro alunos somam 56. Portanto, o quinto aluno tem 70 − 56 = 14 anos.',
      dificuldade: 'dificil',
      tipo: 'estatistica'
    },
    {
      texto: 'Uma circunferência possui raio de 5 cm. Considerando π ≈ 3,14, qual é o comprimento dessa circunferência?',
      alternativas: ['15,7 cm', '31,4 cm', '62,8 cm', '78,5 cm'],
      respostaCorreta: 1,
      explicacao: 'C = 2 × π × r. Substituindo: C = 2 × 3,14 × 5 = 31,4 cm.',
      dificuldade: 'media',
      tipo: 'geometria'
    },
    {
      texto: 'Ana comprou um celular que custava R$ 1.200,00, mas recebeu um desconto e pagou apenas R$ 1.020,00. Qual foi o percentual de desconto?',
      alternativas: ['10%', '12%', '15%', '18%'],
      respostaCorreta: 2,
      explicacao: 'O desconto foi de 1.200 − 1.020 = R$ 180,00. Dividindo pelo preço original: 180 ÷ 1.200 = 0,15. Portanto, 15%.',
      dificuldade: 'dificil',
      tipo: 'aplicacao'
    },
    {
      texto: 'Uma equação apresenta a seguinte expressão: 2(x + 3) = 18. Qual é o valor de x?',
      alternativas: ['3', '5', '6', '9'],
      respostaCorreta: 2,
      explicacao: 'Aplicando a distributiva: 2x + 6 = 18. Subtraindo 6: 2x = 12. Dividindo por 2: x = 6.',
      dificuldade: 'media',
      tipo: 'equacao'
    },
    {
      texto: 'Um triângulo retângulo possui catetos medindo 5 cm e 12 cm. Qual é a medida de sua hipotenusa?',
      alternativas: ['11 cm', '12 cm', '13 cm', '17 cm'],
      respostaCorreta: 2,
      explicacao: 'Pelo teorema de Pitágoras: h² = 5² + 12² = 25 + 144 = 169. A raiz quadrada de 169 é 13 cm.',
      dificuldade: 'media',
      tipo: 'geometria'
    },
    {
      texto: 'Uma função quadrática é definida por f(x) = x² − 5x + 6. Quais são suas raízes?',
      alternativas: ['1 e 6', '2 e 3', '−2 e −3', '1 e 5'],
      respostaCorreta: 1,
      explicacao: 'Fatorando: x² − 5x + 6 = (x − 2)(x − 3). Igualando os fatores a zero, encontramos x = 2 e x = 3.',
      dificuldade: 'dificil',
      tipo: 'funcao'
    },
    {
      texto: 'Em um mapa com escala de 1:50.000, a distância entre duas cidades é representada por 3 cm. Qual é a distância real entre elas?',
      alternativas: ['500 m', '1 km', '1,5 km', '3 km'],
      respostaCorreta: 2,
      explicacao: 'Cada centímetro representa 50.000 cm. Logo, 3 × 50.000 = 150.000 cm, que correspondem a 1,5 km.',
      dificuldade: 'dificil',
      tipo: 'escala'
    }
  ],

  // ==========================================
  // 1º ANO - ENSINO MÉDIO
  // ==========================================
  "1medio": [
    {
      texto: 'Uma empresa obteve um lucro total de R$ 360.000,00 ao longo de 12 meses. Considerando uma distribuição uniforme desse lucro, qual foi o lucro médio mensal?',
      alternativas: ['R$ 25.000,00', 'R$ 30.000,00', 'R$ 35.000,00', 'R$ 40.000,00'],
      respostaCorreta: 1,
      explicacao: 'Dividimos o lucro total pelo número de meses: 360.000 ÷ 12 = R$ 30.000,00.',
      dificuldade: 'facil',
      tipo: 'resolucao'
    },
    {
      texto: 'Qual é a forma fatorada da expressão x² − 9, utilizando a diferença de dois quadrados?',
      alternativas: ['(x − 3)(x + 3)', '(x − 9)(x + 1)', '(x − 2)(x + 4)', '(x − 1)(x + 9)'],
      respostaCorreta: 0,
      explicacao: 'x² − 9 = x² − 3². Aplicando a diferença de quadrados: (x − 3)(x + 3).',
      dificuldade: 'media',
      tipo: 'algebra'
    },
    {
      texto: 'Um triângulo retângulo possui catetos medindo 6 cm e 8 cm. Qual é a medida da hipotenusa?',
      alternativas: ['9 cm', '10 cm', '12 cm', '14 cm'],
      respostaCorreta: 1,
      explicacao: 'Pelo teorema de Pitágoras: h² = 6² + 8² = 36 + 64 = 100. Portanto, h = 10 cm.',
      dificuldade: 'media',
      tipo: 'geometria'
    },
    {
      texto: 'A função quadrática h(x) = x² − 4x + 3 possui duas raízes reais. Quais são os valores de x para os quais h(x) = 0?',
      alternativas: ['1 e 3', '−1 e 3', '2 e 4', '−2 e 4'],
      respostaCorreta: 0,
      explicacao: 'Fatorando: x² − 4x + 3 = (x − 1)(x − 3). Assim, as raízes são x = 1 e x = 3.',
      dificuldade: 'dificil',
      tipo: 'funcao'
    },
    {
      texto: 'Em uma pesquisa com 70 alunos, 40% afirmaram que sua disciplina preferida é Educação Física. Quantos alunos escolheram essa disciplina?',
      alternativas: ['24', '28', '32', '36'],
      respostaCorreta: 1,
      explicacao: '40% de 70 = 0,40 × 70 = 28 alunos.',
      dificuldade: 'media',
      tipo: 'porcentagem'
    },
    {
      texto: 'Resolva a operação entre frações: 3/4 + 1/6. Qual é o resultado?',
      alternativas: ['5/12', '7/12', '9/12', '11/12'],
      respostaCorreta: 3,
      explicacao: 'O MMC entre 4 e 6 é 12. Assim, 3/4 = 9/12 e 1/6 = 2/12. Somando: 9/12 + 2/12 = 11/12.',
      dificuldade: 'media',
      tipo: 'racional'
    },
    {
      texto: 'Qual é o valor do discriminante (Δ) da equação do segundo grau x² − 6x + 9 = 0?',
      alternativas: ['0', '4', '9', '36'],
      respostaCorreta: 0,
      explicacao: 'Na equação, a = 1, b = −6 e c = 9. Aplicando Δ = b² − 4ac: Δ = 36 − 36 = 0.',
      dificuldade: 'media',
      tipo: 'equacao'
    },
    {
      texto: 'Uma progressão aritmética começa com o primeiro termo igual a 4 e possui razão 3. Qual é o décimo termo dessa sequência?',
      alternativas: ['28', '30', '31', '34'],
      respostaCorreta: 2,
      explicacao: 'Utilizamos a fórmula aₙ = a₁ + (n − 1) × r. Assim: a₁₀ = 4 + 9 × 3 = 31.',
      dificuldade: 'media',
      tipo: 'progressao'
    },
    {
      texto: 'Como podemos representar o número decimal 0,00045 utilizando notação científica?',
      alternativas: ['4,5 × 10⁻³', '4,5 × 10⁻⁴', '45 × 10⁻⁴', '4,5 × 10⁴'],
      respostaCorreta: 1,
      explicacao: 'Deslocamos a vírgula quatro casas para a direita, obtendo 4,5. Como o número original é menor que 1, utilizamos expoente negativo: 4,5 × 10⁻⁴.',
      dificuldade: 'media',
      tipo: 'notacaoCientifica'
    },
    {
      texto: 'Uma pessoa investiu R$ 1.000,00 a juros simples de 2% ao mês durante 5 meses. Qual será o valor dos juros obtidos ao final desse período?',
      alternativas: ['R$ 50,00', 'R$ 100,00', 'R$ 150,00', 'R$ 200,00'],
      respostaCorreta: 1,
      explicacao: 'Utilizamos J = C × i × t. Assim: J = 1.000 × 0,02 × 5 = R$ 100,00.',
      dificuldade: 'media',
      tipo: 'matematicaFinanceira'
    }
  ],

  // ==========================================
  // 2º ANO - ENSINO MÉDIO
  // ==========================================
  "2medio": [
    {
      texto: 'Uma sequência numérica é definida pela fórmula do termo geral aₙ = 2n + 1. Qual é o valor do oitavo termo?',
      alternativas: ['15', '16', '17', '18'],
      respostaCorreta: 2,
      explicacao: 'Substituímos n por 8: a₈ = 2 × 8 + 1 = 17.',
      dificuldade: 'media',
      tipo: 'funcao'
    },
    {
      texto: 'Considere o sistema de equações x + y = 10 e x − y = 2. Qual é o par ordenado (x, y) que satisfaz as duas equações?',
      alternativas: ['(4, 6)', '(5, 5)', '(6, 4)', '(7, 3)'],
      respostaCorreta: 2,
      explicacao: 'Somando as equações: 2x = 12, logo x = 6. Substituindo na primeira: 6 + y = 10, então y = 4. A solução é (6, 4).',
      dificuldade: 'dificil',
      tipo: 'sistema'
    },
    {
      texto: 'Um círculo possui raio de 4 cm. Considerando π ≈ 3,14, qual é a área da região interna desse círculo?',
      alternativas: ['12,56 cm²', '25,12 cm²', '50,24 cm²', '100,48 cm²'],
      respostaCorreta: 2,
      explicacao: 'A área é A = π × r². Assim: A = 3,14 × 4² = 3,14 × 16 = 50,24 cm².',
      dificuldade: 'media',
      tipo: 'geometria'
    },
    {
      texto: 'Em uma escola com 240 estudantes, uma pesquisa revelou que 30% deles leem livros por prazer. Quantos estudantes representam esse percentual?',
      alternativas: ['54', '60', '72', '84'],
      respostaCorreta: 2,
      explicacao: 'Calculamos 30% de 240: 0,30 × 240 = 72 estudantes.',
      dificuldade: 'media',
      tipo: 'porcentagem'
    },
    {
      texto: 'Sabendo que log₂ 32 = x, qual é o valor de x?',
      alternativas: ['4', '5', '6', '8'],
      respostaCorreta: 1,
      explicacao: 'O logaritmo pergunta a qual expoente devemos elevar 2 para obter 32. Como 2⁵ = 32, x = 5.',
      dificuldade: 'media',
      tipo: 'logaritmo'
    },
    {
      texto: 'Uma loja reduziu o preço de um produto de R$ 180,00 para R$ 153,00. Considerando o preço original, qual foi o percentual de redução?',
      alternativas: ['10%', '12%', '15%', '18%'],
      respostaCorreta: 2,
      explicacao: 'A redução foi de 180 − 153 = R$ 27,00. Dividindo pelo preço original: 27 ÷ 180 = 0,15. Portanto, 15%.',
      dificuldade: 'dificil',
      tipo: 'porcentagem'
    },
    {
      texto: 'Uma progressão aritmética possui primeiro termo igual a 2 e razão igual a 3. Qual é a soma dos seus 10 primeiros termos?',
      alternativas: ['145', '150', '155', '160'],
      respostaCorreta: 2,
      explicacao: 'Primeiro calculamos o décimo termo: a₁₀ = 2 + 9 × 3 = 29. Depois: S₁₀ = 10 × (2 + 29) ÷ 2 = 155.',
      dificuldade: 'dificil',
      tipo: 'progressao'
    },
    {
      texto: 'Uma população de bactérias dobra a cada hora. Se inicialmente existem 2 bactérias, quantas existirão após 4 horas?',
      alternativas: ['16', '24', '32', '64'],
      respostaCorreta: 2,
      explicacao: 'A quantidade dobra a cada hora. Utilizamos Q = 2 × 2⁴ = 2 × 16 = 32 bactérias.',
      dificuldade: 'media',
      tipo: 'funcaoExponencial'
    },
    {
      texto: 'Em um triângulo retângulo, um dos ângulos agudos mede 30°. Qual é o valor do seno desse ângulo?',
      alternativas: ['1/2', '√2/2', '√3/2', '1'],
      respostaCorreta: 0,
      explicacao: 'Entre os ângulos notáveis da trigonometria, o seno de 30° é igual a 1/2.',
      dificuldade: 'media',
      tipo: 'trigonometria'
    },
    {
      texto: 'Uma turma possui 8 alunos. De quantas maneiras diferentes podemos escolher um grupo de 2 alunos, sem considerar a ordem da escolha?',
      alternativas: ['16', '24', '28', '56'],
      respostaCorreta: 2,
      explicacao: 'Utilizamos a combinação C(8,2) = 8!/(2! × 6!). Calculando: (8 × 7) ÷ 2 = 28 maneiras.',
      dificuldade: 'dificil',
      tipo: 'combinatoria'
    }
  ],

  // ==========================================
  // 3º ANO - ENSINO MÉDIO
  // ==========================================
  "3medio": [
    {
      texto: 'Uma função quadrática possui vértice no ponto (2, −5) e sua parábola tem concavidade voltada para cima. Qual é o valor mínimo que essa função pode assumir?',
      alternativas: ['−5', '2', '5', '−2'],
      respostaCorreta: 0,
      explicacao: 'Como a parábola possui concavidade voltada para cima, o vértice representa seu ponto de mínimo. A segunda coordenada do vértice é −5.',
      dificuldade: 'media',
      tipo: 'funcao'
    },
    {
      texto: 'Uma urna contém 10 bolas: 5 vermelhas, 3 azuis e 2 verdes. Ao retirar uma bola ao acaso, qual é a probabilidade de ela ser azul?',
      alternativas: ['3/10', '3/8', '5/10', '2/10'],
      respostaCorreta: 0,
      explicacao: 'Existem 3 bolas azuis entre 10 bolas no total. Portanto, P = 3/10, equivalente a 30%.',
      dificuldade: 'media',
      tipo: 'probabilidade'
    },
    {
      texto: 'Aplicando os produtos notáveis e simplificando a expressão algébrica (x + 2)² − 9, qual resultado será obtido?',
      alternativas: ['x² + 4x − 5', 'x² + 4x + 13', 'x² + 2x − 5', 'x² + 4x − 13'],
      respostaCorreta: 0,
      explicacao: '(x + 2)² = x² + 4x + 4. Subtraindo 9, obtemos x² + 4x − 5.',
      dificuldade: 'media',
      tipo: 'algebra'
    },
    {
      texto: 'Uma empresa investiu R$ 20.000,00 e obteve um retorno financeiro de R$ 4.500,00 no primeiro ano. Considerando esse retorno como rendimento sobre o capital inicialmente investido, qual foi o percentual de rendimento?',
      alternativas: ['20%', '22,5%', '25%', '30%'],
      respostaCorreta: 1,
      explicacao: 'Dividimos o retorno pelo valor investido: 4.500 ÷ 20.000 = 0,225. Multiplicando por 100, obtemos 22,5%.',
      dificuldade: 'media',
      tipo: 'aplicacao'
    },
    {
      texto: 'Utilizando as propriedades da potenciação, qual é o resultado da expressão 2³ × 2²?',
      alternativas: ['32', '64', '16', '8'],
      respostaCorreta: 0,
      explicacao: 'Na multiplicação de potências de mesma base, somamos os expoentes: 2³ × 2² = 2⁵ = 32.',
      dificuldade: 'media',
      tipo: 'expoente'
    },
    {
      texto: 'Uma função afim passa pelos pontos A(0, 3) e B(2, 7) no plano cartesiano. Sabendo que sua expressão é f(x) = ax + b, qual é a lei dessa função?',
      alternativas: ['f(x) = x + 3', 'f(x) = 2x + 3', 'f(x) = 3x + 2', 'f(x) = 2x + 1'],
      respostaCorreta: 1,
      explicacao: 'O coeficiente angular é a = (7 − 3) ÷ (2 − 0) = 2. Como f(0) = 3, o coeficiente linear é 3. Portanto, f(x) = 2x + 3.',
      dificuldade: 'dificil',
      tipo: 'funcao'
    },
    {
      texto: 'Um cilindro possui raio de 2 cm e altura de 5 cm. Considerando π ≈ 3,14, qual é o volume desse cilindro?',
      alternativas: ['31,4 cm³', '50,24 cm³', '62,8 cm³', '78,5 cm³'],
      respostaCorreta: 2,
      explicacao: 'O volume é V = π × r² × h. Substituindo: V = 3,14 × 2² × 5 = 62,8 cm³.',
      dificuldade: 'media',
      tipo: 'geometriaEspacial'
    },
    {
      texto: 'Uma progressão geométrica começa com o primeiro termo igual a 3 e possui razão 2. Qual é o sétimo termo dessa sequência?',
      alternativas: ['96', '128', '192', '256'],
      respostaCorreta: 2,
      explicacao: 'Utilizamos a fórmula aₙ = a₁ × qⁿ⁻¹. Assim: a₇ = 3 × 2⁶ = 3 × 64 = 192.',
      dificuldade: 'media',
      tipo: 'progressao'
    },
    {
      texto: 'Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Duas bolas serão retiradas consecutivamente, sem reposição. Qual é a probabilidade de ambas serem vermelhas?',
      alternativas: ['1/5', '2/15', '4/15', '1/2'],
      respostaCorreta: 1,
      explicacao: 'Na primeira retirada, a probabilidade é 4/10. Sem reposição, restam 3 bolas vermelhas entre 9 bolas. Portanto: (4/10) × (3/9) = 12/90 = 2/15.',
      dificuldade: 'dificil',
      tipo: 'probabilidade'
    },
    {
      texto: 'Considere a matriz A = [[2, 1], [3, 4]]. Qual é o determinante dessa matriz?',
      alternativas: ['5', '8', '11', '14'],
      respostaCorreta: 0,
      explicacao: 'Para uma matriz 2 × 2, calculamos o determinante multiplicando os elementos da diagonal principal e subtraindo o produto da diagonal secundária: det(A) = (2 × 4) − (1 × 3) = 8 − 3 = 5.',
      dificuldade: 'media',
      tipo: 'matrizes'
    }
  ]
};

// ==========================================
// CONFIGURAÇÃO FINAL
// ==========================================

// Adiciona uma fonte padrão às questões que ainda não possuem uma.
if (typeof window !== 'undefined') {
  Object.values(perguntasMatematica).flat().forEach((questao) => {
    questao.fonte = questao.fonte ||
      'https://basenacionalcomum.mec.gov.br/';
  });

  // Disponibiliza as questões para os outros arquivos JavaScript.
  window.perguntasMatematica = perguntasMatematica;
}
