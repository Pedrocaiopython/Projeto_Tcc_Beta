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
- Os quizzes são baseados no conteúdo existente e podem ser expandidos futuramente

## Próximos passos

- Adicionar painel administrativa de itens e assuntos
- Expandir a base de perguntas por disciplina
- Migrar a estrutura para PostgreSQL em um ambiente de produção
- Melhorar o design visual com assets próprios e componentes mais refinados
