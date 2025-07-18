# Clean Architecture

A Clean Architecture propõe a divisão da aplicação em camadas independentes, cada uma com responsabilidades bem definidas. Essa organização facilita a manutenção e a evolução do código, pois detalhes externos (frameworks, bancos de dados, interfaces) ficam isolados das regras de negócio.

Principais benefícios:

- **Independência de tecnologia:** troca de banco de dados ou framework sem impactar o domínio.
- **Alta testabilidade:** as regras de negócio podem ser testadas sem depender de infraestrutura.
- **Baixo acoplamento:** comunicação entre camadas ocorre por contratos (interfaces), reduzindo dependências diretas.

## Estrutura de pastas sem Clean Architecture

Um projeto sem esse conceito geralmente centraliza lógica e dependências em poucos diretórios:

```
src/
  controllers/
  services/
  models/
  database/
  app.module.ts
  main.ts
```

Nessa abordagem, regras de negócio, acesso a dados e detalhes de framework costumam se misturar.

## Estrutura seguindo Clean Architecture

Aplicando o conceito, as pastas são separadas por responsabilidade:

```
src/
  domain/
    entities/
    repositories/
    services/
  application/
    dto/
    use-cases/
  interface/
    http/
  infrastructure/
    database/
    services/
  main.ts
```

Com essa divisão, o domínio não depende da infraestrutura e a comunicação entre camadas ocorre apenas por interfaces.

## Estrutura deste projeto

O backend deste repositório segue a Clean Architecture com alguns diretórios adicionais de suporte:

```
backend/
  src/
    application/
      dto/
      use-cases/
    domain/
      entities/
      repositories/
      services/
    infrastructure/
      database/
      modules/
      services/
    interface/
      http/
    shared/
      exceptions/
    app.module.ts
    app.service.ts
    main.ts
```

Essa organização mantém as regras de negócio desacopladas de frameworks e bancos de dados, facilitando testes e mudanças futuras.
