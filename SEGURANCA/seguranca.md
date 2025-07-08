# Conceitos de Segurança Aplicados

A aplicação já utiliza diversas práticas e bibliotecas de segurança, especialmente no backend NestJS.

## Autenticação e Autorização

- **JWT** com `@nestjs/jwt`, `passport-jwt` e `passport-local` para autenticar usuários.
- **Guards** (`LocalAuthGuard` e `JwtAuthGuard`) controlam o acesso às rotas.
- **Routes de usuários protegidas** exigem token válido antes de executar operações.

## Proteção de Senhas

- **bcryptjs** para gerar hash das senhas antes de salvar no banco.
- Políticas de senha no DTO (`MinLength` e `Matches`) exigem pelo menos 8 caracteres e caractere especial.

## Validação e Sanitização de Dados

- Uso global do `ValidationPipe` com a opção `whitelist: true` para descartar campos não permitidos nos DTOs.
- DTOs definidos com `class-validator` garantem formatos corretos de email e outros campos.

## Variáveis de Ambiente

- Módulo `ConfigModule` lê configurações do `.env`, evitando hard-code de segredos como `JWT_SECRET`.
- `docker-compose` fornece valores por variáveis, facilitando separar ambientes.

## Segurança de Comunicação

- `enableCors` define a origem permitida (`CORS_ORIGIN`) para o frontend.
- Em produção os Dockerfiles permitem servir o frontend via Nginx e backend Node.

## Bibliotecas Utilizadas

- `@nestjs/jwt`, `passport`, `passport-local`, `passport-jwt`
- `bcryptjs` para hashing de senhas
- `class-validator` e `class-transformer` para validação
- `TypeORM` para acesso seguro ao banco

Esses recursos garantem autenticação básica e proteção contra entradas inválidas, servindo como base segura para evoluções futuras.
