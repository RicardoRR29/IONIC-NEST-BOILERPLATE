# Autenticação

A autenticação usa JWT (JSON Web Tokens) com as estratégias do Passport no NestJS. A seguir estão os detalhes de cada parte da implementação.

## Módulo Auth

- **auth.module.ts**: registra `PassportModule` e `JwtModule`. O `JwtModule` é configurado de forma assíncrona usando `ConfigService` para ler a chave `JWT_SECRET`. Também registra as estratégias `LocalStrategy` e `JwtStrategy` e exporta o controlador e serviço.

## Serviço `AuthService`

Responsável por validar as credenciais e gerar o token.

- `validateUser(email, pass)`: busca o usuário por email, compara a senha com `bcrypt` e retorna o usuário sem a senha caso esteja correto.
- `login(user)`: gera o token JWT com `JwtService.sign`, incluindo `sub` (id do usuário) e `username` (email).

## Controlador `AuthController`

- `POST /auth/register`: cria um usuário chamando `UsersService.create` e retorna o usuário sem a senha.
- `POST /auth/login`: usa `LocalAuthGuard` que por sua vez utiliza `LocalStrategy` para validar email e senha. Se válidos, `AuthService.login` retorna o token.
- `POST /auth/profile`: protegido pelo `JwtAuthGuard`, retorna os dados do usuário contidos no token.

## Estratégias e Guards

- **LocalStrategy** (`local.strategy.ts`): define que o campo de usuário é `email`. Chama `AuthService.validateUser`. Lança `UnauthorizedException` caso inválido.
- **LocalAuthGuard** (`local-auth.guard.ts`): apenas estende `AuthGuard('local')` do Passport.
- **JwtStrategy** (`jwt.strategy.ts`): extrai o token do header `Authorization` e valida usando a chave `JWT_SECRET`. Retorna um objeto com `userId` e `email`.
- **JwtAuthGuard** (`jwt-auth.guard.ts`): estende `AuthGuard('jwt')` para proteger rotas que exigem token válido.

## Fluxo

1. Usuário registra via `/auth/register`.
2. Faz login em `/auth/login`, recebendo `access_token`.
3. Envia esse token no header `Authorization: Bearer <token>` para acessar rotas protegidas, como `/auth/profile` ou as rotas de usuários.

No frontend, `AuthService` armazena o token em `localStorage` e o `authInterceptor` adiciona automaticamente o header nas requisições.

