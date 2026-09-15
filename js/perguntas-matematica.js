const perguntasMatematica = {
  "7ano": [
    { texto: 'Uma loja oferece 20% de desconto em um caderno que custa R$ 50,00. Quanto o cliente paga após o desconto?', alternativas: ['R$ 35,00', 'R$ 40,00', 'R$ 42,00', 'R$ 45,00'], respostaCorreta: 1, explicacao: '20% de 50 é 10, então o preço final é 50 − 10 = 40 reais.', dificuldade: 'facil', tipo: 'aplicacao' },
    { texto: 'Em uma sala há 18 meninas e 12 meninos. Qual é a razão entre o número de meninos e o total de alunos?', alternativas: ['12/18', '12/30', '18/30', '30/12'], respostaCorreta: 1, explicacao: 'O total de alunos é 30; a razão entre meninos e total é 12/30.', dificuldade: 'media', tipo: 'comparacao' },
    { texto: 'Uma garrafa tem 1,5 L de água. Quantos mililitros isso representa?', alternativas: ['150 mL', '1.500 mL', '15.000 mL', '150.000 mL'], respostaCorreta: 1, explicacao: '1 litro equivale a 1.000 mililitros, então 1,5 litro equivale a 1.500 mL.', dificuldade: 'facil', tipo: 'aplicacao' },
    { texto: 'Um carro percorre 240 km em 4 horas. Qual foi a velocidade média?', alternativas: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'], respostaCorreta: 2, explicacao: 'Velocidade média = distância ÷ tempo = 240 ÷ 4 = 60 km/h.', dificuldade: 'media', tipo: 'resolucao' },
    { texto: 'Qual é o perímetro de um retângulo de 7 cm de largura e 12 cm de comprimento?', alternativas: ['19 cm', '38 cm', '84 cm', '96 cm'], respostaCorreta: 1, explicacao: 'Perímetro = 2 × (7 + 12) = 2 × 19 = 38 cm.', dificuldade: 'media', tipo: 'geometria' },
    { texto: 'Em uma sequência, os termos são 3, 6, 12, 24, ... Qual deve ser o próximo termo?', alternativas: ['27', '30', '36', '48'], respostaCorreta: 3, explicacao: 'A sequência dobra a cada termo: 3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24, então o próximo é 48.', dificuldade: 'dificil', tipo: 'analise' }
  ],
  "8ano": [
    { texto: 'Um produto passou de R$ 80,00 para R$ 96,00. Qual foi o percentual de aumento?', alternativas: ['12%', '16%', '18%', '20%'], respostaCorreta: 3, explicacao: 'A diferença é 16 reais. 16 em relação a 80 representa 20%.', dificuldade: 'media', tipo: 'aplicacao' },
    { texto: 'Se x + 7 = 19, então qual é o valor de x?', alternativas: ['10', '11', '12', '13'], respostaCorreta: 2, explicacao: 'Subtraindo 7 dos dois lados: x = 19 − 7 = 12.', dificuldade: 'facil', tipo: 'equacao' },
    { texto: 'Uma proporção indica que 3 camisetas custam R$ 75,00. Qual é o preço de 5 camisetas no mesmo padrão?', alternativas: ['R$ 100,00', 'R$ 115,00', 'R$ 120,00', 'R$ 125,00'], respostaCorreta: 3, explicacao: 'Cada camiseta custa 25 reais; 5 × 25 = 125 reais.', dificuldade: 'media', tipo: 'proporcao' },
    { texto: 'Qual é o valor de 2³ + 3²?', alternativas: ['11', '17', '18', '25'], respostaCorreta: 1, explicacao: '2³ = 8 e 3² = 9; 8 + 9 = 17.', dificuldade: 'media', tipo: 'analise' },
    { texto: 'Uma praça tem formato retangular com lados 18 m e 12 m. Qual é a área?', alternativas: ['30 m²', '60 m²', '216 m²', '300 m²'], respostaCorreta: 2, explicacao: 'Área = 18 × 12 = 216 m².', dificuldade: 'facil', tipo: 'geometria' },
    { texto: 'Uma empresa vende 80 produtos em 5 dias. Mantendo a mesma média, quantos produtos serão vendidos em 12 dias?', alternativas: ['160', '192', '200', '240'], respostaCorreta: 1, explicacao: 'A média é 16 produtos por dia. Em 12 dias, 16 × 12 = 192.', dificuldade: 'dificil', tipo: 'resolucao' }
  ],
  "9ano": [
    { texto: 'A equação 3x − 5 = 16 tem solução x igual a:', alternativas: ['5', '6', '7', '8'], respostaCorreta: 2, explicacao: '3x = 21, então x = 7.', dificuldade: 'facil', tipo: 'equacao' },
    { texto: 'Um ônibus sai às 8h15 e leva 1h40 até o destino. A que horas chega?', alternativas: ['9h45', '9h55', '10h05', '10h15'], respostaCorreta: 2, explicacao: '8h15 + 1h40 = 10h05.', dificuldade: 'media', tipo: 'aplicacao' },
    { texto: 'Uma função f(x) = 2x + 3 foi aplicada ao número 4. Qual é o valor de f(4)?', alternativas: ['7', '9', '11', '13'], respostaCorreta: 2, explicacao: 'f(4) = 2 × 4 + 3 = 8 + 3 = 11.', dificuldade: 'media', tipo: 'funcao' },
    { texto: 'A média das idades de 5 alunos é 14 anos. Se quatro deles têm 12, 13, 15 e 16 anos, qual é a idade do quinto aluno?', alternativas: ['12', '13', '14', '15'], respostaCorreta: 2, explicacao: 'A soma total é 5 × 14 = 70. Os quatro conhecidos somam 56, então o quinto é 14.', dificuldade: 'dificil', tipo: 'estatistica' },
    { texto: 'Considerando π ≈ 3,14, qual é o comprimento de uma circunferência de raio 5 cm?', alternativas: ['15,7 cm', '31,4 cm', '62,8 cm', '78,5 cm'], respostaCorreta: 1, explicacao: 'C = 2πr = 2 × 3,14 × 5 = 31,4 cm.', dificuldade: 'media', tipo: 'geometria' },
    { texto: 'Ana comprou um celular por R$ 1.200,00 e, após um desconto, pagou R$ 1.020,00. Qual foi o percentual de desconto?', alternativas: ['10%', '12%', '15%', '18%'], respostaCorreta: 2, explicacao: 'A diferença foi 180 reais. 180/1200 = 0,15, ou seja, 15%.', dificuldade: 'dificil', tipo: 'aplicacao' }
  ],
  "1medio": [
    { texto: 'Uma empresa teve lucro de R$ 360.000,00 em 12 meses. Qual foi o lucro médio mensal?', alternativas: ['R$ 25.000,00', 'R$ 30.000,00', 'R$ 35.000,00', 'R$ 40.000,00'], respostaCorreta: 1, explicacao: '360.000 ÷ 12 = 30.000 reais por mês.', dificuldade: 'media', tipo: 'resolucao' },
    { texto: 'Qual é a forma fatorada de x² − 9?', alternativas: ['(x − 3)(x + 3)', '(x − 9)(x + 1)', '(x − 2)(x + 4)', '(x − 1)(x + 9)'], respostaCorreta: 0, explicacao: 'x² − 9 é uma diferença de quadrados: a² − b² = (a − b)(a + b).', dificuldade: 'media', tipo: 'algebra' },
    { texto: 'Um triângulo retângulo tem catetos de 6 cm e 8 cm. Qual é a medida da hipotenusa?', alternativas: ['9 cm', '10 cm', '12 cm', '14 cm'], respostaCorreta: 1, explicacao: 'Pelo teorema de Pitágoras: 6² + 8² = 36 + 64 = 100; a raiz quadrada é 10.', dificuldade: 'media', tipo: 'geometria' },
    { texto: 'A função h(x) = x² − 4x + 3 tem zeros em:', alternativas: ['1 e 3', '−1 e 3', '2 e 4', '−2 e 4'], respostaCorreta: 0, explicacao: 'h(x) = (x − 1)(x − 3), então os zeros são 1 e 3.', dificuldade: 'dificil', tipo: 'funcao' },
    { texto: 'Em uma pesquisa, 40% dos alunos preferem educação física. Se 70 alunos responderam, quantos preferem a disciplina?', alternativas: ['24', '28', '32', '36'], respostaCorreta: 1, explicacao: '40% de 70 = 0,4 × 70 = 28.', dificuldade: 'media', tipo: 'porcentagem' },
    { texto: 'O valor de 3/4 + 1/6 é:', alternativas: ['5/12', '7/12', '9/12', '11/12'], respostaCorreta: 3, explicacao: '3/4 = 9/12 e 1/6 = 2/12, logo 9/12 + 2/12 = 11/12.', dificuldade: 'dificil', tipo: 'racional' }
  ],
  "2medio": [
    { texto: 'A sequência a_n = 2n + 1 começa em 3, 5, 7, ... Qual é o 8º termo?', alternativas: ['15', '16', '17', '18'], respostaCorreta: 2, explicacao: 'Substituindo n = 8: 2×8 + 1 = 17.', dificuldade: 'media', tipo: 'funcao' },
    { texto: 'Qual é a solução do sistema x + y = 10 e x − y = 2?', alternativas: ['(4, 6)', '(5, 5)', '(6, 4)', '(7, 3)'], respostaCorreta: 2, explicacao: 'Somando as equações: 2x = 12, x = 6; logo y = 4.', dificuldade: 'dificil', tipo: 'sistema' },
    { texto: 'Uma circunferência tem raio 4 cm. Qual é a área do círculo correspondente?', alternativas: ['12,56 cm²', '25,12 cm²', '50,24 cm²', '100,48 cm²'], respostaCorreta: 2, explicacao: 'A = πr² = 3,14 × 16 = 50,24 cm².', dificuldade: 'media', tipo: 'geometria' },
    { texto: 'Uma pesquisa mostra que 30% dos estudantes leem livros por prazer. Se o total é 240 estudantes, quantos leem por prazer?', alternativas: ['54', '60', '72', '84'], respostaCorreta: 2, explicacao: '30% de 240 = 0,3 × 240 = 72.', dificuldade: 'media', tipo: 'porcentagem' },
    { texto: 'Se log₂ 32 = x, então x vale:', alternativas: ['4', '5', '6', '8'], respostaCorreta: 1, explicacao: '2⁵ = 32, então o logaritmo base 2 de 32 é 5.', dificuldade: 'dificil', tipo: 'logaritmo' },
    { texto: 'Uma empresa reduz o preço de um produto de R$ 180,00 para R$ 153,00. Qual foi a redução percentual?', alternativas: ['10%', '12%', '15%', '18%'], respostaCorreta: 2, explicacao: 'A diferença é 27; 27/180 = 0,15, ou 15%.', dificuldade: 'dificil', tipo: 'porcentagem' }
  ],
  "3medio": [
    { texto: 'Uma função quadrática tem vértice em (2, −5). Qual é o valor mínimo dessa função?', alternativas: ['−5', '2', '5', '−2'], respostaCorreta: 0, explicacao: 'O vértice indica o ponto mínimo quando a parábola abre para cima; o valor mínimo é y = −5.', dificuldade: 'dificil', tipo: 'funcao' },
    { texto: 'Uma urna contém 5 bolas vermelhas, 3 azuis e 2 verdes. Qual a probabilidade de retirar uma bola azul?', alternativas: ['3/10', '3/8', '5/10', '2/10'], respostaCorreta: 0, explicacao: 'Há 10 bolas no total e 3 azuis, então a probabilidade é 3/10.', dificuldade: 'media', tipo: 'probabilidade' },
    { texto: 'A expressão (x + 2)² − 9 é igual a:', alternativas: ['x² + 4x − 5', 'x² + 4x + 13', 'x² + 2x − 5', 'x² + 4x − 13'], respostaCorreta: 0, explicacao: '(x + 2)² = x² + 4x + 4; subtraindo 9, resulta x² + 4x − 5.', dificuldade: 'dificil', tipo: 'algebra' },
    { texto: 'Uma empresa investiu R$ 20.000,00 e obteve retorno de R$ 4.500,00 no primeiro ano. Qual foi o rendimento percentual?', alternativas: ['20%', '22,5%', '25%', '30%'], respostaCorreta: 1, explicacao: '4.500 / 20.000 = 0,225, ou seja, 22,5%.', dificuldade: 'dificil', tipo: 'aplicacao' },
    { texto: 'Qual é o valor de 2^3 × 2^2?', alternativas: ['32', '64', '16', '8'], respostaCorreta: 0, explicacao: '2^3 × 2^2 = 2^(3+2) = 2^5 = 32.', dificuldade: 'media', tipo: 'expoente' },
    { texto: 'O gráfico de uma função afim passa pelos pontos (0, 3) e (2, 7). Qual é a lei da função?', alternativas: ['f(x) = x + 3', 'f(x) = 2x + 3', 'f(x) = 3x + 2', 'f(x) = 2x + 1'], respostaCorreta: 1, explicacao: 'A taxa de variação é (7 − 3)/(2 − 0) = 2, então f(x) = 2x + 3.', dificuldade: 'dificil', tipo: 'funcao' }
  ]
};

// A estrutura mantém compatibilidade com o jogo atual: cada questão continua com
// texto, alternativas e resposta correta, além de metadados pedagógicos (tipo e dificuldade)
// para facilitar futuras evoluções do sistema sem quebrar o fluxo atual de XP, pontos e progresso.
if (typeof window !== 'undefined') {
  window.perguntasMatematica = perguntasMatematica;
}
