O projeto backend já está em funcionamento e segue a arquitetura em camadas do NestJS.
A estrutura principal localiza-se em `src/` e está organizada conforme abaixo:

src
├── application
│   ├── dto
│   └── use-cases
│       ├── auth
│       └── user
├── domain
│   ├── entities
│   ├── repositories
│   └── services
├── infrastructure
│   ├── database
│   │   └── postgres
│   ├── modules
│   └── services
├── interface
│   └── http
│       ├── controllers
│       ├── guards
│       └── interceptors
└── shared
    └── exceptions


📁 application/
Esta pasta representa a camada de aplicação, onde residem os casos de uso da aplicação (application services). Ela é responsável por orquestrar a lógica entre o domínio e a infraestrutura. Ela conhece o domínio, mas não depende da infraestrutura. Essa camada é o coração da lógica de negócio aplicada. Tudo aqui pode ser testado sem nenhuma dependência externa.

📁 application/dto/
Contém todos os Data Transfer Objects (DTOs) usados para entrada e saída de dados. São utilizados para validar, transformar e tipar os dados recebidos ou retornados. Usam class-validator e class-transformer para garantir a segurança dos dados. Estão ligados à interface (input/output) mas usados por controllers e use cases. Segregam a estrutura dos dados das entidades reais do sistema.

📁 application/use-cases/
É o núcleo da lógica de negócio aplicada. Aqui estão os casos de uso que implementam as ações específicas que o sistema realiza, como login, cadastro, edição. Cada caso de uso é uma classe que executa uma única ação, respeitando o princípio da responsabilidade única (SRP). Essa camada é testável e isolada da tecnologia (não conhece nada do NestJS, TypeORM, etc). Depende apenas de interfaces definidas no domínio.

📁 application/use-cases/auth/
Casos de uso relacionados à autenticação do usuário, como LoginUseCase, LogoutUseCase ou ValidateTokenUseCase. Aqui são manipuladas ações que envolvem autenticação e geração/validação de tokens. Eles não sabem como o token é gerado, apenas usam a interface do serviço de token. São ideais para testes unitários. Aplicam a lógica de login de forma clara e separada.

📁 application/use-cases/user/
Casos de uso relacionados à gestão de usuários como criar, editar, listar ou deletar. Cada operação fica em um arquivo separado, promovendo organização e facilidade de manutenção. Utilizam o repositório de usuários como dependência, através da interface. Facilitam a expansão futura com novos comportamentos. Não têm lógica de acesso à rede ou banco, apenas coordenam as ações.

📁 domain/
É a camada mais pura do sistema, contendo as regras de negócio fundamentais. Nada aqui conhece framework, biblioteca ou banco de dados. Contém as entidades, contratos (interfaces) e regras de negócio. Tudo que está aqui é reutilizável em qualquer ambiente. Representa o core do sistema e segue o modelo DDD (Domain Driven Design).

📁 domain/entities/
Contém as entidades de negócio, como a classe User. Cada entidade representa um conceito central do domínio com suas propriedades e regras. São objetos ricos, podendo conter validações internas (ex: email válido, senha mínima). São a base da lógica de negócio. Essas entidades são utilizadas em toda a aplicação e não dependem de infraestrutura.

📁 domain/repositories/
Contém interfaces de repositório, como IUserRepository. Define os métodos que qualquer implementação (ex: TypeORM, Prisma) deverá seguir para persistência. A separação por interface permite injeção de dependência e troca de implementação facilmente. Serve para abstrair o banco de dados da aplicação. É essencial para seguir o princípio DIP (Inversão de Dependência).

📁 domain/services/
Define interfaces de serviços de domínio, como ICryptoService ou ITokenService. Usados para abstrair tecnologias como Bcrypt, JWT, etc. Isso permite que a aplicação use criptografia e geração de token sem depender da implementação real. Melhora a testabilidade e a modularidade. Foca em lógica reutilizável, sem saber como é executada.

📁 infrastructure/
Implementa as dependências reais do sistema (banco, criptografia, jwt, serviços externos). Essa camada implementa as interfaces definidas no domínio e é onde entram bibliotecas e frameworks. Nenhum código aqui contém regra de negócio. Tudo é configurável e injetável. Pode ser trocada ou atualizada sem afetar as camadas superiores.

📁 infrastructure/database/
Agrupa todas as implementações relacionadas à persistência de dados. Geralmente dividido por tecnologia (ex: postgres, sqlite, mongo). A ideia é deixar claro qual banco está sendo usado. Contém implementações que conversam com ORM ou banco direto. Tudo aqui implementa a interface de repositório definida no domínio.

📁 infrastructure/database/postgres/
Contém os arquivos que implementam os repositórios usando PostgreSQL com TypeORM. Exemplo: UserOrmRepository. Esses arquivos seguem a interface IUserRepository e fazem o CRUD real no banco. Permite manter a lógica desacoplada do banco. Pode ser trocado por outro banco futuramente com pouco impacto.

📁 infrastructure/modules/
Módulos do NestJS que agrupam providers, controllers e serviços relacionados a um domínio. Aqui são declaradas as dependências e onde ocorrem as injeções reais. Cada módulo organiza uma área do sistema (ex: UsersModule, AuthModule). Ajuda a manter a aplicação modular e coesa. Permite reuso e encapsulamento de funcionalidades.

📁 infrastructure/services/
Implementações concretas de serviços como CryptoService (Bcrypt) e TokenService (JWT). Cada classe implementa uma interface da pasta domain/services. Essas implementações podem ser trocadas facilmente por outras libs. Tornam possível a criptografia e autenticação sem acoplar o domínio a bibliotecas externas. Garantem coesão e responsabilidade única.

📁 interface/
É a camada de entrada e saída do sistema. Tudo que trata requisições HTTP ou outras formas de input/output fica aqui. Utiliza os controladores do NestJS, DTOs, guards, interceptors, pipes. Depende da aplicação, mas não contém regra de negócio. Apenas orquestra a comunicação entre o mundo externo e os use cases.

📁 interface/http/
Subpasta voltada ao protocolo HTTP. Aqui ficam os controllers, guards, interceptors e qualquer lógica ligada à API REST. Também pode ter filtros e pipes globais. Serve de ponte entre as rotas externas e os use cases internos. Não deve conter nenhuma lógica de negócio.

📁 interface/http/controllers/
Contém os controllers NestJS que definem os endpoints da API. Cada método de um controller recebe uma requisição, valida o DTO, e repassa para um use case. Os controllers não contêm lógica de negócio, apenas fazem o input/output. São os únicos arquivos que lidam com @Body, @Query, @Param, @Post, etc. Tornam a API organizada e fácil de entender.

📁 interface/http/guards/
Guards do NestJS responsáveis por proteger rotas (ex: JwtAuthGuard). Eles verificam se o usuário tem permissão ou token válido para acessar determinado recurso. São essenciais para autenticação e autorização. Implementam CanActivate e funcionam como middlewares inteligentes. Mantêm a segurança desacoplada do controller.
