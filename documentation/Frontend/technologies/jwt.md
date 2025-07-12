# JWT

Após o login, o token JWT gerado pelo backend é salvo no `localStorage` e enviado em cada requisição por meio de um interceptor HTTP. Assim as APIs protegidas reconhecem o usuário autenticado.
