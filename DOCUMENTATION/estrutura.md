# Estrutura de Pastas

Esta aplicação é dividida em duas partes principais: **backend** (NestJS) e **frontend** (Ionic/Angular). Abaixo segue uma visão geral das pastas e arquivos mais importantes.

```
IONIC-NEST-BOILERPLATE/
├── backend/          # API NestJS
├── frontend/         # Aplicação Ionic
├── docker-compose.yml
└── README.md
```

## Arquivos na raiz

- **README.md** – instruções rápidas do projeto.
- **docker-compose.yml** – orquestra banco de dados, backend e frontend.
- **backend/** – código do servidor.
- **frontend/** – aplicação cliente em Ionic.

## Backend

Estrutura principal do diretório `backend`:

```
backend/
├── Dockerfile                     # Imagem Docker do servidor
├── docker-compose.yml             # Ambiente isolado de banco + servidor
├── package.json / package-lock.json
├── tsconfig*.json                 # Configuração TypeScript
├── nest-cli.json                  # Configurações do Nest
├── src/                           # Código fonte
└── test/                          # Testes e2e
```

### `src/`

- **main.ts** – ponto de entrada que cria a aplicação, configura validação global e Swagger.
- **app.module.ts** – módulo raiz que importa outros módulos (Users, Auth) e configura TypeORM.
- **app.controller.ts / app.service.ts** – exemplo simples de rota `/` respondendo "Hello World".

#### Auth (`src/auth`)

- **auth.module.ts** – registra `JwtModule`, estratégias e controlador.
- **auth.controller.ts** – rotas `/auth/register`, `/auth/login` e `/auth/profile`.
- **auth.service.ts** – valida usuários e gera tokens JWT.
- **local.strategy.ts / local-auth.guard.ts** – estratégia e guarda para login com email e senha.
- **jwt.strategy.ts / jwt-auth.guard.ts** – estratégia e guarda para autenticação via JWT.
- **dto/login.dto.ts** – DTO para dados de login.

#### Users (`src/users`)

- **user.entity.ts** – entidade TypeORM que representa usuários.
- **users.module.ts** – módulo que expõe `UsersService` e `UsersController`.
- **users.service.ts** – lógica de CRUD com bcrypt para senhas.
- **users.controller.ts** – rotas `/users` protegidas por JWT.
- **dto/create-user.dto.ts** – validação para criação de usuário.
- **dto/update-user.dto.ts** – validação para atualização.

### `test/`

Contém testes e2e com `supertest` cobrindo autenticação e rotas de usuários.

## Frontend

Diretório `frontend` segue a estrutura padrão de um projeto Ionic/Angular.

```
frontend/
├── Dockerfile                  # Geração de imagem para servir a aplicação
├── angular.json                # Configurações Angular
├── package.json / package-lock.json
├── src/
│   ├── app/                    # Componentes e páginas
│   ├── assets/
│   ├── environments/           # Configurações de ambiente
│   └── theme/
└── ...
```

### Páginas e serviços principais

- **app.component.*** – componente raiz da aplicação Ionic.
- **home/** – página inicial de exemplo.
- **login/** – tela de login que usa `AuthService`.
- **register/** – tela de registro de usuário.
- **users/** – lista de usuários autenticados.
- **edit-user/** – edição de usuário existente.
- **services/** – contém `AuthService`, `UserService`, `auth.guard.ts` e `auth.interceptor.ts`.
- **environments/** – define `apiUrl` apontando para o backend.

Cada serviço e página é descrito em mais detalhes nos arquivos de documentação específicos.

