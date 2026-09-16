# Projeto TCC Beta

Plataforma educacional com autenticação real, XP, pontos, progressos por disciplina, loja e customização. O projeto mantém a base de quizzes existentes, mas evolui para uma aplicação com backend e banco de dados persistente.

## Objetivo

Transformar o quiz estático em uma aplicação funcional para apresentar como TCC e portfólio, mantendo a identidade visual gamer educacional e preservando a base de conteúdo já criada.

## Decisão de arquitetura

O projeto foi estruturado com Node.js + Express no backend e SQLite como banco de dados local. A escolha foi feita porque a base do projeto é um protótipo acadêmico e a execução local precisa ser simples, estável e independente de um servidor externo de banco de dados. O modelo foi desenhado de maneira coerente com uma arquitetura relacional e pode ser migrado para PostgreSQL no futuro sem alterar a lógica principal.

## Funcionalidades implementadas

- Cadastro de usuário com hash de senha
- Login e logout
- Sessão autenticada no servidor
- Perfil dinâmico com nível, XP e pontos
- Progresso por matéria
- Registro de quizzes e recompensas
- Sistema de XP e nível
- Sistema de pontos persistidos
- Loja com compra e equipagem de itens
- Inventário do usuário
- Fluxo protegido de acesso
- Páginas de matérias com integração ao backend

## Tecnologias

- HTML5
- CSS3
- JavaScript vanilla
- Node.js
- Express
- SQLite
- `node:sqlite` (nativo do Node.js 22.5+)
- bcryptjs
- express-session

## Estrutura de pastas

- `backend/src/` - servidor Express e camada de dados
- `database/` - schema e banco SQLite
- `css/` - estilos do projeto
- `js/` - scripts front-end e integração com API
- `*.html` - páginas de conteúdo e menu

## Configuração inicial

1. Instale as dependências:
   ```bash
   npm install
   ```
   O projeto requer Node.js 22.5 ou superior. O acesso ao SQLite usa o módulo
   nativo `node:sqlite`, evitando `better-sqlite3`, `node-gyp`, Python e
   compilação de addon nativo no Windows.
2. Copie o arquivo `.env.example` para `.env` e defina a chave de sessão:
   ```bash
   copy .env.example .env
   ```
3. Ajuste as variáveis se necessário.

## Variáveis de ambiente

Arquivo `.env`:

```env
PORT=3000
SESSION_SECRET=sua_chave_super_secreta
```

## Execução

Para iniciar o servidor:

```bash
npm start
```

Para desenvolvimento:

```bash
npm run dev
```

A aplicação fica disponível em:

- http://localhost:3000

## Testes

Os testes automatizados podem ser executados com:

```bash
npm test
```

Eles verificam o embaralhamento sem perder a resposta correta, a disponibilidade
do banco de Geografia e as validações de submissão e intervalo de tentativas.

## Funcionamento pedagógico do quiz

Cada página publica seu banco em `window.perguntas` antes de carregar o motor
compartilhado `js/quiz-engine.js`. Ao iniciar uma tentativa, o motor copia e
embaralha as perguntas e as alternativas com Fisher-Yates, recalculando o índice
de `respostaCorreta`. O banco original não é alterado e o mesmo processo é usado
no desafio do boss. As questões incluem uma fonte institucional de estudo,
quando disponível, exibida no feedback.

Os bancos foram elaborados priorizando interpretação, aplicação, comparação e
raciocínio. As referências pedagógicas incluem a BNCC/MEC, o IBGE Educa, o
Arquivo Nacional e o INPE, conforme o assunto.

Como perguntas e respostas ainda são entregues ao navegador, uma pessoa com
conhecimento técnico pode inspecionar ou manipular esses dados. O backend não
confia no XP ou nos pontos enviados pelo cliente e aplica limites de quantidade
e frequência, mas a proteção contra manipulação da resposta não é absoluta.
Em produção, a correção da tentativa deve ocorrer no backend, com o servidor
enviando apenas um identificador da atividade e validando as respostas.

Abra o site pelo endereço acima, e não usando `file://`. A camada de API
também reconhece `localhost` e `127.0.0.1` quando o frontend estiver sendo
servido pelo Live Server em outra porta e direciona as chamadas para a API
em `localhost:3000`.

## Autenticação

A autenticação não depende de `localStorage` para guardar os dados do usuário. A sessão fica no backend e é mantida por cookie HTTP com servidor de sessão.

### Endpoints principais

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/profile`
- `GET /api/shop`
- `POST /api/shop/purchase`
- `POST /api/shop/equip`
- `POST /api/quizzes/submit`

## Regras de XP e pontos

- Usuário inicia com XP inicial igual a 0 e nível 1
- Cada quiz gera recompensas definidas pelo backend
- O nível é calculado com base no XP total acumulado
- O ponto do usuário é persistido no banco e nunca confiado no frontend
- A compra de itens decrementa o saldo e valida disponibilidade

## Modelo de dados

O banco possui as tabelas principais:

- `users`
- `user_profiles`
- `subjects`
- `subject_progress`
- `quiz_attempts`
- `xp_history`
- `points_history`
- `shop_items`
- `user_inventory`
- `user_equipment`

## Limitações atuais

- O projeto continua sendo um protótipo educativo e não substitui uma aplicação de produção com múltiplos usuários e alta escala
- O banco usado é SQLite por simplicidade de execução local
- O Node.js precisa ser 22.5 ou superior por causa do módulo nativo `node:sqlite`
- Os quizzes são baseados no conteúdo existente e podem ser expandidos futuramente

## Próximos passos

- Adicionar painel administrativa de itens e assuntos
- Expandir a base de perguntas por disciplina
- Migrar a estrutura para PostgreSQL em um ambiente de produção
- Melhorar o design visual com assets próprios e componentes mais refinados
