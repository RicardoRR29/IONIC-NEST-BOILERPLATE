C:.
├───application
│   ├───dto
│   └───use-cases
│       ├───auth
│       └───user
├───domain
│   ├───entities
│   ├───repositories
│   └───services
├───infrastructure
│   ├───database
│   │   └───postgres
│   ├───modules
│   └───services
└───interface
    └───http
        ├───controllers
        └───guards


Abaixo está a explicação da estrutura de pastas do projeto em Angular + Ionic, com ênfase em boas práticas de arquitetura em front-end moderno, aplicando componentização, injeção de dependência, modularidade e segurança.

Cada item da estrutura é explicado em exatas 5 linhas, conforme solicitado:

📁 app/
É a raiz da aplicação Angular, onde se organiza a lógica por domínios funcionais (auth, users, core, shared). Segue o princípio de feature modules e divisão por responsabilidades. Contém rotas, componentes, serviços e páginas organizados. Garante que cada parte do sistema seja modular e reutilizável. A separação por domínio facilita manutenção e escalabilidade.

📁 app/auth/
Módulo dedicado ao domínio de autenticação do sistema. Centraliza tudo que diz respeito a login, registro, guards de rota e serviços de autenticação. É um domínio crítico que exige segurança, isolamento e clareza. Permite que o módulo seja carregado separadamente, caso necessário. Garante que a lógica de autenticação fique separada do restante da aplicação.

📁 app/auth/guards/
Contém guards de rota Angular, como AuthGuard, que validam se o usuário está autenticado. São executados antes de acessar uma rota protegida. Ajudam a manter a integridade do fluxo de navegação. Isolam a lógica de permissão da lógica de interface. Trabalham em conjunto com o AuthService e o Router.

📁 app/auth/pages/
Agrupa as páginas relacionadas à autenticação, como Login e Registro. Cada subpasta representa uma rota completa, com HTML, CSS e lógica TypeScript. Segue o padrão do Angular + Ionic de modularidade baseada em rotas. Favorece lazy loading e encapsulamento de responsabilidades. A divisão por página ajuda na legibilidade e testes.

📁 app/auth/pages/login/
Página de login do usuário. Contém o componente responsável por exibir o formulário de login, validar campos e enviar a requisição. Se comunica com o AuthService para autenticar o usuário. Também trata erros e redirecionamentos. Seu objetivo é ser simples, seguro e intuitivo para entrada no sistema.

📁 app/auth/pages/register/
Página de cadastro de novo usuário. Exibe um formulário validado com campos obrigatórios e seguros. Ao submeter, chama o serviço de autenticação para registrar o usuário. Após o sucesso, redireciona ou informa. Trabalha em conjunto com o backend via HTTP. Implementa UX básica com feedback visual de erro e carregamento.

📁 app/auth/services/
Serviços de autenticação como AuthService, que centraliza login, logout, registro e armazenamento de token. Utiliza HttpClient para comunicação com a API. Pode usar BehaviorSubject para gerenciar o estado de autenticação. Serve como fonte de verdade para o estado do usuário logado. Evita duplicação de lógica entre componentes.

📁 app/core/
Contém recursos centrais e genéricos da aplicação, como interceptadores globais e serviços utilitários. É um módulo singleton, carregado uma única vez. Garante que lógica transversal esteja centralizada. Evita duplicação e facilita configuração global. Também pode incluir serviços como HttpErrorHandler, StorageService e TokenStorage.

📁 app/core/interceptors/
Contém os interceptadores HTTP, como AuthInterceptor, que injeta o token JWT nas requisições. Também pode haver interceptadores para tratamento global de erros. Atua como middleware para HttpClient. É essencial para segurança e rastreamento de erros. Centraliza a lógica de requisição sem precisar alterar cada serviço.

📁 app/core/services/
Serviços genéricos e reutilizáveis, como armazenamento local (TokenStorageService), gerenciamento de sessão, navegação etc. São injetáveis globalmente e podem ser usados em qualquer módulo. São fundamentais para aplicar lógica centralizada. Reduzem redundância e mantêm a aplicação limpa. Ficam disponíveis através da injeção de dependência Angular.

📁 app/shared/
Contém componentes reutilizáveis, pipes, diretivas ou interfaces que são usados por diversos domínios. É um módulo agnóstico de regras de negócio. Promove a reutilização de UI e lógica comum. Ajuda a manter consistência visual e funcional em toda a aplicação. Deve ser pequeno, coeso e desacoplado.

📁 app/users/
Domínio funcional para gerenciamento de usuários. Contém páginas, componentes e serviços que lidam com usuários cadastrados. Totalmente separado do módulo de autenticação. Permite listar, adicionar, editar e excluir usuários. Organizado para facilitar manutenção e expansão.

📁 app/users/components/
Componentes internos que representam partes reutilizáveis da UI relacionada a usuários. Cada subpasta representa um componente encapsulado com sua própria lógica. Componentes como modais, formulários e cards ficam aqui. Promove o padrão de componentização inteligente e coesa. Ajuda a criar interfaces responsivas e reaproveitáveis.

📁 app/users/components/add-user/
Componente dedicado ao cadastro de novos usuários. Contém o formulário, a validação e a comunicação com o serviço. Pode ser um modal ou página independente. O objetivo é encapsular toda a lógica do "Add User". Isola o comportamento de adição sem depender do restante da interface.

📁 app/users/components/edit-user-modal/
Componente de modal para edição de usuários existentes. Reaproveita a lógica de formulário, mas com dados pré-preenchidos. Usa serviços para buscar e atualizar dados no backend. É reutilizado pela listagem ou outras páginas. Mantém o código limpo separando o modal da página principal.

📁 app/users/pages/
Agrupa as páginas de usuários (ex: listagem, perfil, painel). Cada página representa uma rota da aplicação. Recebe dados do serviço e usa os componentes internos para exibir a UI. Segue o padrão Angular de lazy modules + routing. É onde a lógica de fluxo e interação com o usuário ocorre.

📁 app/users/services/
Serviços específicos para usuários, como UserService, que executa chamadas HTTP para o backend. Concentra toda a lógica de comunicação com a API relacionada a usuários. Separa completamente a lógica de rede da UI. Trabalha com observables para tratar dados reativos. Pode ser mockado em testes com facilidade.

📁 assets/
Contém recursos estáticos como imagens, ícones, fontes e outros arquivos usados na interface. É público e acessível diretamente via URL. Em projetos Ionic, pode conter splash screens ou ícones da aplicação. Organizar bem essa pasta ajuda na manutenção visual. Evite carregar arquivos dinâmicos aqui (use APIs para isso).

📁 assets/icon/
Armazena os ícones da aplicação, como o favicon, ícones PWA e logos. Utilizados automaticamente por configurações do Ionic ou index.html. Manter os ícones vetoriais aqui facilita a adaptação a diferentes resoluções. Pode incluir variações para temas escuros e claros. Essencial para personalizar a aparência do app.

📁 environments/
Contém arquivos de configuração separados para ambientes de desenvolvimento e produção. Exemplo: environment.ts (dev) e environment.prod.ts (produção). Define variáveis como API_URL, enableDebug, useMock. O Angular substitui esses arquivos automaticamente no build. Ajuda a tornar o projeto portável e configurável.

📁 theme/
Pasta usada em projetos Ionic para definir variáveis de estilo, cores, temas globais e personalizações do CSS. Geralmente contém variables.scss. Permite aplicar identidade visual ao aplicativo. É o ponto central de design e responsividade. Promove consistência visual e facilita a aplicação de temas claros/escuros.
