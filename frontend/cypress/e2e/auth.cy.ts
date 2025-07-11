describe('Auth flow', () => {
  it('should show login page', () => {
    cy.visit('/login');
    cy.contains('Login');
  });

  it('should navigate to register page from link', () => {
    cy.visit('/login');
    cy.contains('Cadastre-se aqui').click();
    cy.url().should('include', '/register');
    cy.contains('Cadastro');
  });

  it('should toggle back to login from register', () => {
    cy.visit('/register');
    cy.contains('Voltar ao login').click();
    cy.url().should('include', '/login');
    cy.contains('Login');
  });

  it.skip('should login and redirect to users page', () => {
    cy.intercept('POST', 'http://localhost:3000/auth/login', {
      access_token: 'dummy.token',
    }).as('login');
    cy.intercept('GET', 'http://localhost:3000/users', []).as('users');

    cy.visit('/login');
    cy.get('ion-input[formcontrolname="email"] input', { includeShadowDom: true })
      .type('test@example.com');
    cy.get('ion-input[formcontrolname="password"] input', { includeShadowDom: true })
      .type('secret');
    cy.contains('Entrar').click();

    cy.wait('@login');
    cy.wait('@users');
    cy.url().should('include', '/users');
    cy.contains('Gerenciamento de Usuários');
  });
});
