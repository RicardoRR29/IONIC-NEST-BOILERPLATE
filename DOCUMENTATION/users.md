# Módulo de Usuários

O módulo de usuários é responsável por criar, listar, atualizar e remover usuários no banco de dados.

## Entidade `User`

Arquivo: `src/users/user.entity.ts`

- Define as colunas `id`, `name`, `email` e `password`.
- Possui colunas automáticas `createdAt` e `updatedAt`.
- O campo `email` é único.

## DTOs

- **create-user.dto.ts**: valida `name` (obrigatório), `email` (formato válido) e `password` (mínimo de 8 caracteres e pelo menos um símbolo).
- **update-user.dto.ts**: campos opcionais para atualizar `name` e `email`.

## Serviço `UsersService`

- Usa `@InjectRepository(User)` para acessar o repositório do TypeORM.
- `create(dto)`: cria a entidade, aplica `bcrypt.hash` na senha e salva.
- `findAll()`: retorna todos os usuários.
- `findOne(id)` e `findByEmail(email)`: buscam por id ou email.
- `update(id, dto)`: atualiza os campos e retorna o usuário atualizado.
- `remove(id)`: remove do banco.

## Controlador `UsersController`

Todas as rotas (exceto `POST /users` que cria usuário) usam `JwtAuthGuard` para exigir token.

- `GET /users`: lista todos.
- `GET /users/:id`: busca um usuário específico.
- `POST /users`: cria um usuário (pode ser usado por administradores ou cadastro aberto).
- `PUT /users/:id`: atualiza um usuário.
- `DELETE /users/:id`: remove o usuário.

## Integração com o Frontend

O `UserService` do frontend consome essas rotas para exibir a lista, criar, editar e excluir usuários. O `AuthService` adiciona o token nas requisições por meio do `authInterceptor`.

