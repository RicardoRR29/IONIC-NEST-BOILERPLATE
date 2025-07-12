# SOLID

- **S** - *Single Responsibility*: cada classe possui uma responsabilidade clara. Ex.: casos de uso executam apenas uma ação.
- **O** - *Open/Closed*: classes são estendidas via interfaces e providers do NestJS, evitando alterações diretas.
- **L** - *Liskov Substitution*: interfaces de repositório permitem trocar implementações como `UserRepository` sem quebrar contratos.
- **I** - *Interface Segregation*: interfaces pequenas definem apenas o necessário, como `ICryptoService` ou `ITokenService`.
- **D** - *Dependency Inversion*: o domínio depende de abstrações, e as implementações concretas ficam na infraestrutura, injetadas pelo NestJS.
