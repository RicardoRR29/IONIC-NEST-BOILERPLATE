import { User } from '../../src/app/users/services/user.service';

const token = 'a.eyJzdWIiOjEsImV4cCI6MTg5MzQ1NjAwMH0=.c';
const base = 'http://localhost:3000';
const initialUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

describe('User management', () => {
  beforeEach(() => {
    cy.window().then(w => w.localStorage.setItem('token', token));
  });

  it('redirects logged-in user from /login to /users', () => {
    cy.intercept('GET', `${base}/users`, initialUsers).as('users');
    cy.visit('/login');
    cy.wait('@users');
    cy.url().should('include', '/users');
    cy.contains('Gerenciamento de Usuários');
  });

  it('creates a user', () => {
    const newUser: User = { id: 3, name: 'Charlie', email: 'charlie@example.com' };
    cy.intercept('GET', `${base}/users`, initialUsers).as('users');
    cy.intercept('POST', `${base}/users`, newUser).as('createUser');
    cy.intercept('GET', `${base}/users`, [...initialUsers, newUser]).as('usersAfter');

    cy.visit('/users');
    cy.wait('@users');

    cy.contains('Novo Usuário').click();
    cy.get('ion-input[formcontrolname="name"] input', { includeShadowDom: true }).type(newUser.name);
    cy.get('ion-input[formcontrolname="email"] input', { includeShadowDom: true }).type(newUser.email);
    cy.get('ion-input[formcontrolname="password"] input', { includeShadowDom: true }).type('secret123');
    cy.contains('Salvar').click();

    cy.wait('@createUser');
    cy.wait('@usersAfter');
    cy.contains('table tr', newUser.email);
  });

  it('edits a user', () => {
    const updated: User = { id: 1, name: 'Alice Updated', email: 'alice@new.com' };
    cy.intercept('GET', `${base}/users`, initialUsers).as('users');
    cy.intercept('PUT', `${base}/users/1`, updated).as('updateUser');
    cy.intercept('GET', `${base}/users`, [updated, initialUsers[1]]).as('usersAfter');

    cy.visit('/users');
    cy.wait('@users');

    cy.get('ion-icon[name="create-outline"]').first().click({ force: true });
    cy.get('ion-input[formcontrolname="name"] input', { includeShadowDom: true }).clear().type(updated.name);
    cy.get('ion-input[formcontrolname="email"] input', { includeShadowDom: true }).clear().type(updated.email);
    cy.contains('Salvar').click();

    cy.wait('@updateUser');
    cy.wait('@usersAfter');
    cy.contains('table tr', updated.email);
  });

  it('deletes a user', () => {
    cy.intercept('GET', `${base}/users`, initialUsers).as('users');
    cy.intercept('DELETE', `${base}/users/2`, {}).as('deleteUser');
    cy.intercept('GET', `${base}/users`, [initialUsers[0]]).as('usersAfter');

    cy.visit('/users');
    cy.wait('@users');

    cy.get('ion-icon[name="trash-outline"]').eq(1).click({ force: true });
    cy.contains('Confirmar').click();

    cy.wait('@deleteUser');
    cy.wait('@usersAfter');
    cy.get('table').should('not.contain', 'bob@example.com');
  });

  it('searches for a user', () => {
    cy.intercept('GET', `${base}/users`, initialUsers).as('users');
    cy.visit('/users');
    cy.wait('@users');

    cy.get('ion-searchbar input').type('bob');
    cy.get('table').should('contain', 'bob@example.com');
    cy.get('table').should('not.contain', 'alice@example.com');
  });

  it('logs out and blocks access to /users', () => {
    cy.intercept('GET', `${base}/users`, initialUsers).as('users');
    cy.visit('/users');
    cy.wait('@users');

    cy.get('ion-icon[name="log-out-outline"]').click({ force: true });
    cy.url().should('include', '/login');

    cy.visit('/users');
    cy.url().should('include', '/login');
  });
});
