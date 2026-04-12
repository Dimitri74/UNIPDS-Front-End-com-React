# UNIPDS Front-End com React

Repositorio com tres projetos relacionados ao modulo de estudos em React, Next.js e integracao com APIs.

## Projetos no diretorio

1. [fundamentos-front-end-react](fundamentos-front-end-react)
Projeto de estudos com aulas praticas de fundamentos, renderizacao, contexto, autenticacao e chamadas de API no Next.js.

2. [react-tasks-crud-app](react-tasks-crud-app)
Frontend da aplicacao Tasks CRUD com cadastro, login e area protegida de tarefas usando JWT.

3. [react-tasks-crud-api](react-tasks-crud-api)
API REST de autenticacao e tarefas (CRUD), integrada ao MongoDB Atlas.

## Como os projetos se conectam

- `react-tasks-crud-app` consome a API do `react-tasks-crud-api` em `http://localhost:3001`.
- `react-tasks-crud-api` persiste dados no MongoDB (Atlas no cenario padronizado).
- `fundamentos-front-end-react` e um projeto de apoio didatico, independente do CRUD.

## Resumo de cada projeto

### 1) fundamentos-front-end-react

- Foco: fundamentos de React/Next em aulas progressivas.
- Destaques: contexto global, paginas client/server, rotas protegidas e exemplos de API.
- Principais libs: Next.js 16, React 19, SWR, JOSE, js-cookie, Tailwind CSS, TypeScript.

### 2) react-tasks-crud-app

- Foco: interface web do sistema de tarefas.
- Destaques: cadastro/login, middleware de protecao, gerenciamento de sessao via cookie JWT e CRUD de tarefas.
- Principais libs: Next.js 15, React 19, JOSE, classnames, Tailwind CSS, TypeScript.

### 3) react-tasks-crud-api

- Foco: backend REST para autenticacao e tarefas.
- Destaques: endpoints `/auth/*` e `/tasks/*`, validacao de token e integracao com MongoDB Atlas.
- Principais libs: Node.js, Express 5, Mongoose, jsonwebtoken, bcryptjs, dotenv, cors, nodemon.

## Tecnologias usadas (icones + descricao)

| Tecnologia | Icone | O que faz |
|---|---|---|
| Next.js | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) | Framework React para renderizacao hibrida (SSR/SSG), roteamento e backend routes. |
| React | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | Biblioteca para construir interfaces componentizadas e reativas. |
| TypeScript | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Tipagem estatica para aumentar seguranca e manutencao do codigo JavaScript. |
| Tailwind CSS | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Framework CSS utilitario para criar layouts rapidos e consistentes. |
| SWR | ![SWR](https://img.shields.io/badge/SWR-000000?style=flat-square&logo=vercel&logoColor=white) | Estrategia de cache e revalidacao para busca de dados no frontend. |
| Node.js | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | Runtime JavaScript no servidor para executar APIs e scripts. |
| Express | ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) | Framework web minimalista para criar APIs REST em Node.js. |
| MongoDB | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Banco NoSQL orientado a documentos para persistencia de dados. |
| Mongoose | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) | ODM para modelagem, validacao e acesso ao MongoDB em Node.js. |
| JWT (jsonwebtoken / jose) | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Padrao de token para autenticacao stateless entre frontend e backend. |
| bcryptjs | ![bcryptjs](https://img.shields.io/badge/bcryptjs-4A4A4A?style=flat-square) | Hash seguro de senhas antes de salvar no banco. |
| ESLint | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) | Analise estatica para padrao de codigo e prevencao de erros comuns. |

## Arquitetura (visao geral)

```mermaid
flowchart LR
	U[Usuario / Navegador] --> A[react-tasks-crud-app\nNext.js Frontend]
	A -->|HTTP + JSON| B[react-tasks-crud-api\nNode.js + Express]
	B -->|Mongoose| C[(MongoDB Atlas\nDatabase: tasks_crud)]

	D[fundamentos-front-end-react\nProjeto didatico] -. estudos e experimentos .- U
```

## Demonstracao visual

### Tasks CRUD

- Tela de cadastro e login com JWT
- Lista de tarefas com criacao, conclusao e exclusao
- Integracao com API e persistencia no MongoDB Atlas

Sugestao para enriquecer este README com imagens:

1. Criar pasta `docs/assets` na raiz
2. Salvar capturas da aplicacao (ex.: `tasks-login.png`, `tasks-list.png`)
3. Incluir no README usando Markdown:

```md
![Login Tasks](docs/assets/tasks-login.png)
![Lista de Tasks](docs/assets/tasks-list.png)
```

## Execucao rapida (Tasks CRUD)

1. Subir API
- Entre em [react-tasks-crud-api](react-tasks-crud-api)
- Configure `.env`
- Rode `npm install` e `npm run start`

2. Subir frontend
- Entre em [react-tasks-crud-app](react-tasks-crud-app)
- Configure `.env.local`
- Rode `npm install` e `npm run dev`

3. Acessar
- Frontend: `http://localhost:3000`
- API: `http://localhost:3001`
