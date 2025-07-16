# Estrutura atual do frontend

A aplicação front-end vive no diretório `frontend/` e utiliza Angular 20 com Ionic. Ela fornece telas de login, registro e uma área para gerenciar usuários autenticados. O token JWT é armazenado no `localStorage` e enviado por interceptadores em todas as requisições. Componentes compartilhados e serviços centrais garantem coesão e reutilização da UI.

```
C:./frontend/src
├── app
│   ├── auth
│   ├── core
│   │   ├── interceptors
│   │   └── services
│   ├── shared
│   │   ├── confirm-modal
│   │   ├── header
│   │   ├── sidebar
│   │   └── table
│   ├── users
│   │   ├── components
│   │   └── pages
│   ├── services
├── assets
│   └── icon
├── environments
├── theme
└── cypress
```

📁 app/
É o núcleo do Angular, onde ficam módulos como auth, users, core e shared. A organização por domínios facilita o lazy loading e a manutenção. Também contém o arquivo de rotas principal. Cada módulo possui seus próprios componentes e serviços. Essa divisão segue o padrão Angular moderno.

📁 app/auth/
Contém a página de autenticação usada para login e registro. Inclui o `AuthGuard` que protege rotas privadas. Centraliza regras de validação e uso do `AuthService`. O módulo é carregado de forma stand‑alone para agilidade. Mantém a lógica de login isolada do restante da aplicação.

📁 app/services/
Abriga serviços globais como `AuthService` e `UserService`. O `AuthService` cuida do login, registro e leitura do token do `localStorage`. O `UserService` faz chamadas HTTP para o backend. Estes serviços são injetados em componentes conforme necessário. Facilitam testes e reaproveitamento do código.

📁 app/core/
Define infraestrutura comum do projeto. Agrupa interceptadores e serviços de apoio que existem apenas uma vez. Utiliza o padrão singleton para configurações globais. Mantém a aplicação livre de duplicação de código transversal. É carregado na inicialização principal do app.

📁 app/core/interceptors/
Guarda interceptadores do `HttpClient`. Atualmente apenas o `authInterceptor` injeta o token em cada requisição autenticada. Os erros de rede são tratados diretamente nos componentes.

📁 app/core/services/
Contém serviços utilitários como `UiService` e `ErrorTranslatorService`. O `UiService` centraliza toasts e diálogos de confirmação. `ErrorTranslatorService` converte códigos em mensagens legíveis. Estes serviços são usados por todo o sistema. Tornam a experiência do usuário mais amigável.

📁 app/shared/
Reúne componentes visuais reutilizáveis. Inclui `Header`, `Sidebar`, `ConfirmModal` e a tabela genérica `Table`. Estes elementos reforçam consistência de design. Podem ser usados em qualquer módulo sem regras de negócio. Mantêm a UI coesa e expansível.

📁 app/shared/confirm-modal/
Implementa um modal reutilizável para confirmações. Recebe a mensagem e retorna uma `Promise` de resposta. Útil para exclusões ou ações críticas. Evita repetição de código de diálogo nos componentes. Melhora a interação com o usuário.

📁 app/shared/table/
Componente de tabela genérica para listar qualquer entidade. Aceita definição de colunas e ações de edição ou exclusão. Permite destacar a linha do usuário logado com badge. Substitui tabelas específicas e reduz código. Facilita manutenção das listagens.

📁 app/users/
Módulo responsável pelo gerenciamento de usuários. Carrega a lista a partir do backend e exibe na tabela genérica. Permite criar, editar e remover usuários via modal. Usa `AuthService` para identificar o usuário logado. Só é acessível após autenticação.

📁 app/users/components/
Armazena partes reutilizáveis da área de usuários. Inclui `AddUserModal`, `UserStats` e `UsersTable`. Cada componente trata de uma pequena responsabilidade. Pode ser usado em diferentes páginas sem duplicação. Reflete a filosofia de componentização do Angular.

📁 app/users/pages/
Reúne as páginas principais relacionadas a usuários. `users.page` organiza a listagem e as ações disponíveis. Integra serviços e componentes para exibir dados. Aplica o padrão de stand‑alone components do Angular. Carrega somente quando a rota `/users` é acessada.

📁 assets/
Armazena imagens, ícones e outros arquivos estáticos. Os ícones PWA ficam em `assets/icon`. Estes recursos são servidos diretamente pelo Angular. A organização facilita personalizar o layout. Não devem conter arquivos gerados dinamicamente.

📁 environments/
Define variáveis separadas para desenvolvimento e produção. O Angular substitui `environment.ts` pelo arquivo correto no build. Configura a URL da API e outras opções de runtime. Mantém a aplicação flexível para diferentes cenários. Evita hardcode de valores sensíveis.

📁 theme/
Contém `variables.scss` com cores e estilos globais do Ionic. Permite alterar temas de forma centralizada. Ajuda a manter consistência visual em todo o app. Pode ser expandido para suportar temas claro e escuro. É carregado automaticamente pelo Ionic.

📁 cypress/
Pasta de testes end‑to‑end escritos em Cypress. Há um exemplo simples que valida a tela de login. Os testes executam com `npm run e2e`. Útil para garantir o fluxo principal da aplicação. Mantém a confiança na integração com o backend.
