# Todo List App 🚀

A simple Todo application with a React frontend, NestJS backend, Prisma ORM, and SQLite database.

## Features

- Add a new todo
- Modify a todo
- Mark a todo as completed
- Delete a todo
- Order todos

## Tech Stack

- React / TypeScript / Vite
- TailwindCSS
- NestJS / TypeScript
- Prisma / SQLite
- Swagger

## Setup

### Clone the repository

```bash
git clone git@github.com:ogabor82/todo-app.git
cd todo-app
```

### Backend

1. Navigate to the backend directory

```bash
cd backend
```

2. Install dependencies

```bash
npm install
```

3. Copy the `.env.example` file to `.env` and set the environment variables

```bash
cp .env.example .env
```

4. Migrate the database and seed the data

```bash
npx prisma migrate dev
```

5. Start the backend server

```bash
npm run start:dev
```

You can now access the Swagger UI at http://localhost:3000/api and test the API endpoints.

### Frontend

1. Navigate to the frontend directory

```bash
cd ..
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Copy the `.env.local.example` file to `.env.local` and set the environment variables

```bash
cp .env.local.example .env.local
```

4. Start the frontend server

```bash
npm run dev
```

You can now access the application at http://localhost:5173.
