# Tasks CRUD API

API REST com Node.js + Express + JWT para cadastro/login e CRUD de tarefas.

## Stack

- Node.js
- Express
- MongoDB (Atlas ou local)

## Cenário padronizado Atlas (cluster compartilhado)

Este projeto foi padronizado para usar o mesmo cluster Atlas de outros projetos, sem sobrescrever dados existentes:

- Banco existente permanece (ex.: `Java_MongoDB`)
- Novo banco para esta API: `tasks_crud`

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3001
JWT_SECRET=mesmo_valor_usado_no_frontend
MONGO_URL=mongodb+srv://USUARIO:SENHA@javamongocluster.1ewn9wg.mongodb.net/tasks_crud?retryWrites=true&w=majority&appName=TasksCrudApp
```

Variáveis aceitas:

- `PORT` ou `APP_PORT` (a API aceita ambos)
- `JWT_SECRET` obrigatório
- `MONGO_URL` opcional em desenvolvimento

Se `MONGO_URL` não for informado, a API sobe com MongoDB em memória para dev local.

## Pré-check no Atlas

1. Security > Network Access: liberar o IP da máquina
2. Security > Database Access: usuário com permissão de escrita no `tasks_crud`

## Instalação e execução

```bash
npm install
npm run start
```

Para desenvolvimento com reload:

```bash
npm run dev
```

Health check esperado:

```http
GET /
```

Resposta:

```json
{ "message": "Server active." }
```

## Endpoints disponíveis

```http
POST    /auth/register
POST    /auth/login
GET     /auth/user
GET     /tasks
POST    /tasks
PUT     /tasks/:id/complete
PUT     /tasks/:id/uncomplete
DELETE  /tasks/:id
```

## Autenticação

Rotas protegidas exigem header:

```http
Authorization: Bearer <token>
```

## Integração com o frontend

No projeto `react-tasks-crud-app`, o `.env.local` deve apontar para:

```env
BACKEND_URL=http://localhost:3001
JWT_SECRET=mesmo_valor_do_backend
```
