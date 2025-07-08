# Boilerplate Backend

This repository contains a basic NestJS backend with authentication, a simple Ionic frontend and PostgreSQL.

## Development

1. Copy `.env.example` to `.env` inside `backend` and adjust settings.
2. Run `docker-compose up` to start PostgreSQL, the backend and the frontend.
3. Backend Swagger docs available at `http://localhost:3000/api`.
4. Frontend available at `http://localhost:4200`.

## Features

- User registration and login with JWT authentication.
- Passwords hashed with bcrypt.
- Example Docker setup.
