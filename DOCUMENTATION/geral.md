# Visão Geral do Sistema

Este projeto demonstra uma aplicação completa com backend em NestJS e frontend em Ionic/Angular, utilizando banco de dados PostgreSQL. A finalidade é servir como base para sistemas que precisam de autenticação e gerenciamento de usuários.

## Tecnologias e Bibliotecas

### Backend

- **NestJS** – framework Node.js para construção de APIs escaláveis.
- **TypeORM** – ORM utilizado para acessar o PostgreSQL.
- **Passport** – biblioteca de autenticação, com estratégias Local e JWT.
- **@nestjs/jwt** – integração do JWT com NestJS.
- **bcryptjs** – responsável por gerar o hash das senhas.
- **class-validator** e **class-transformer** – validação de DTOs.
- **Swagger** – documentação automática disponível em `/api`.

### Frontend

- **Ionic Framework** – conjunto de componentes para aplicações híbridas.
- **Angular** – framework SPA utilizado pelo Ionic.
- **RxJS** – manipulação de observables para chamadas HTTP.

### Infraestrutura

- **Docker** e **docker-compose** – fornecem contêineres para o banco, backend e frontend.

## Funcionamento Geral

1. O `docker-compose.yml` sobe um contêiner Postgres, o backend (porta 3000) e o frontend (porta 4200).
2. O backend expõe rotas REST para autenticação e CRUD de usuários. Utiliza JWT para proteger as rotas.
3. O frontend consome essas rotas por meio dos serviços `AuthService` e `UserService`. O token é armazenado em `localStorage` e enviado automaticamente pelo interceptor.

## Como Melhorar

- Implementar testes unitários e2e adicionais para outras funcionalidades.
- Criar papéis de usuário (admin, etc.) e autorizações mais refinadas.
- Adicionar refresh token para sessões mais longas.
- Utilizar variáveis de ambiente diferenciadas para produção.
- Configurar CI/CD para build e deploy automáticos.

Este boilerplate serve como ponto de partida para projetos que exijam autenticação básica e um painel simples de usuários.

