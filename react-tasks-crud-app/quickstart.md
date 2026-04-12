# Quickstart — Tasks CRUD App

Aplicação Next.js 15 com autenticação JWT para gerenciamento de tarefas (CRUD).

---

## Pré-requisitos

- **Node.js** 18+
- **npm** 9+ (ou yarn / pnpm)
- Projeto backend **react-tasks-crud-api** disponível
- Conta no **MongoDB Atlas**

---

## Configuração das variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
# URL base do backend (sem barra final)
BACKEND_URL=http://localhost:3001

# Segredo usado para verificar o JWT emitido pelo backend
JWT_SECRET=seu_segredo_aqui
```

> **Atenção:** `JWT_SECRET` precisa ser **idêntico** ao segredo usado pelo backend para assinar os tokens.

---

## Setup Atlas padronizado (mesmo cluster, banco novo)

Este projeto está padronizado para:

- **Manter** seu banco existente no cluster (ex.: `Java_MongoDB`)
- **Adicionar** um novo banco para o CRUD de tasks (ex.: `tasks_crud`)

### 1) Configurar MongoDB Atlas no backend

No projeto `react-tasks-crud-api`, crie/edite o arquivo `.env` com:

```env
PORT=3001
JWT_SECRET=mesmo_valor_usado_no_frontend
MONGO_URL=mongodb+srv://USUARIO:SENHA@javamongocluster.1ewn9wg.mongodb.net/tasks_crud?retryWrites=true&w=majority&appName=TasksCrudApp
```

Notas:

- O nome `tasks_crud` no final da URI define o **novo database**.
- Isso **não apaga** nem altera o banco existente (`Java_MongoDB`).
- Se a senha tiver caracteres especiais (`@`, `#`, `/`, `:`), faça URL encode.

### 2) Network Access no Atlas

No Atlas, libere o IP da sua máquina:

1. Acesse **Security > Network Access**.
2. Clique em **Add IP Address**.
3. Para desenvolvimento, pode usar `0.0.0.0/0` temporariamente.

### 3) Database Access no Atlas

Garanta que o usuário de banco tenha permissão **readWrite** no database `tasks_crud` (ou permissões equivalentes no cluster).

### 4) Subir backend e frontend

No backend (`react-tasks-crud-api`):

```bash
npm install
npm run start
```

No frontend (`react-tasks-crud-app`):

```bash
npm install
npm run dev
```

Backend esperado em `http://localhost:3001` e frontend em `http://localhost:3000`.

---

## Instalação

```bash
npm install
```

---

## Scripts disponíveis

| Comando           | Descrição                              |
|-------------------|----------------------------------------|
| `npm run dev`     | Inicia em desenvolvimento (Turbopack)  |
| `npm run build`   | Gera o build de produção               |
| `npm start`       | Inicia o servidor de produção          |
| `npm run lint`    | Executa o linter (ESLint)              |

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Endpoints da API (Backend)

Todos os endpoints de tarefas requerem o cabeçalho `Authorization: Bearer <token>`.

| Método   | Rota                    | Auth | Descrição              |
|----------|-------------------------|------|------------------------|
| `POST`   | `/auth/register`        | Não  | Cadastro de usuário    |
| `POST`   | `/auth/login`           | Não  | Login (retorna JWT)    |
| `GET`    | `/tasks`                | Sim  | Listar tarefas         |
| `POST`   | `/tasks`                | Sim  | Criar tarefa           |
| `PUT`    | `/tasks/:id/complete`   | Sim  | Marcar como concluída  |
| `DELETE` | `/tasks/:id`            | Sim  | Deletar tarefa         |

### Corpo das requisições

**`POST /auth/register`**
```json
{ "username": "Marcus", "email": "marcus@example.com", "password": "senha123" }
```

**`POST /auth/login`**
```json
{ "email": "marcus@example.com", "password": "senha123" }
```

**`POST /tasks`**
```json
{ "title": "Minha nova tarefa" }
```

### Resposta de autenticação

Ambos `/auth/register` e `/auth/login` devem retornar:
```json
{ "token": "<jwt>" }
```
Em caso de erro, retornam `{ "message": "descrição do erro" }`.

A resposta de `GET /tasks` deve seguir o formato:
```json
{ "tasks": [ { "_id": "...", "title": "...", "completed": false, ... } ] }
```

---

## Validações do frontend

O frontend valida os dados **antes** de enviar ao backend:

- **Email:** deve seguir o formato `usuario@dominio.ext`.
- **Senha:** mínimo de **6 caracteres**.
- Todos os campos de cada formulário são obrigatórios.

---

## Estrutura de rotas (Frontend)

| Rota        | Descrição                                      |
|-------------|------------------------------------------------|
| `/`         | Página inicial com links para as telas         |
| `/register` | Formulário de cadastro                         |
| `/login`    | Formulário de login                            |
| `/tasks`    | Lista de tarefas (requer autenticação via JWT) |

A rota `/tasks` é protegida por **middleware** — sem cookie `token` válido, o usuário é redirecionado para `/login`.

---

## Autenticação e sessão

- Após login/cadastro bem-sucedido, o JWT é armazenado em um cookie `HttpOnly` + `Secure` com validade de **24 horas**.
- O middleware verifica e valida o JWT a cada acesso à rota `/tasks`.
- O logout ocorre automaticamente quando o cookie expira (24 h). Não há rota de logout explícita.

---

## Testando com Postman

O arquivo `tasks-crud-app.postman_collection.json` na raiz do projeto contém a coleção completa pronta para importar.

**Variáveis da coleção:**

| Variável    | Descrição                                         |
|-------------|---------------------------------------------------|
| `baseUrl`   | URL base do backend (padrão: `http://localhost:3001`) |
| `authToken` | Preenchido automaticamente após Register ou Login |
| `taskId`    | ID de uma tarefa — preenchido automaticamente após List Tasks |

**Fluxo recomendado:**
1. Importe a coleção no Postman.
2. Execute **Register** ou **Login** — `authToken` é salvo automaticamente.
3. Execute **List Tasks** — `taskId` é salvo automaticamente com o `_id` da primeira tarefa.
4. Execute **Complete Task** ou **Delete Task** usando o `taskId` salvo.

---

## Diagnóstico rápido

Se cadastro/login falhar:

1. Verifique se a API responde em `http://localhost:3001/` com `{ "message": "Server active." }`.
2. Confirme que `BACKEND_URL` em `.env.local` é `http://localhost:3001`.
3. Confirme que `JWT_SECRET` do frontend e backend são iguais.
4. Valide no Atlas se o IP está liberado e o usuário tem permissão.

---

## Fluxo de uso

1. Acesse `/register` e crie uma conta (usuário, e-mail e senha com no mínimo 6 caracteres).
2. Faça login em `/login` — o token JWT é salvo em cookie `HttpOnly`.
3. Em `/tasks`, crie tarefas, marque como concluídas ou exclua-as.
4. O logout ocorre automaticamente quando o cookie expira (24 h).
