# Project 2 Scaffold

Basic React + PHP + MySQL stack with Docker and GitHub Actions.

## Structure
- `frontend/`: Vite + React demo calling backend APIs. Built and served by nginx in Docker.
- `backend/`: Plain PHP endpoints under `public/index.php`.
- `docker-compose.yml`: Frontend, backend, and MySQL services wired together.
- `.github/workflows/`: CI for both frontend and backend.

## Local development (no Docker)
1) Frontend
- `cd frontend`
- `cp .env.example .env` and set `VITE_API_URL` (default http://localhost:8000).
- Install deps: `npm install`
- Run dev server: `npm run dev` (usually on http://localhost:5173)

2) Backend
- `cd backend`
- Copy `.env.example` to `.env` and fill DB values if you want to test the DB check.
- Run: `php -S 0.0.0.0:8000 -t public` (PHP 5.6 compatible)
- Hit the APIs at http://localhost:8000/api/health, `/api/greeting`, `/api/db-check`.

## Docker Compose
- `docker compose up --build`
- Frontend: http://localhost:8081
- Backend: http://localhost:8000
- MySQL: host `localhost`, port `3309`, user/password `project2`, database `project2`.

## Deploy
- Frontend (Netlify):
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Env variable: `VITE_API_URL` pointed to your backend URL.
- Backend (FTP or Render):
  - FTP: upload `backend/public` contents to your hosting doc root and set env vars `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
  - Render: create a PHP web service using the `backend` folder; set the same DB env vars.
