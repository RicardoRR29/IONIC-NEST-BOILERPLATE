describe('Auth flow', () => {
  it('should show login page', () => {
    cy.visit('/login');
    cy.contains('Login');
  });
});
