import { User } from '../../src/app/users/services/user.service';

const token = 'a.eyJzdWIiOjEsImV4cCI6MTg5MzQ1NjAwMH0=.c';
const base = 'http://localhost:3000';
const initialUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

const visitWithToken = (url: string) =>
  cy.visit(url, {
    onBeforeLoad: (win) => {
      win.localStorage.setItem('token', token);
    },
  });

describe('User management', () => {
  it('redirects logged-in user from /login to /users', () => {
    cy.intercept('GET', `${base}/users`, initialUsers).as('users');
    visitWithToken('/login');
    cy.wait('@users');
    cy.url().should('include', '/users');
    cy.contains('Gerenciamento de Usuários');
  });

  it('searches for a user', () => {
    cy.intercept('GET', `${base}/users`, initialUsers).as('users');
    visitWithToken('/users');
    cy.wait('@users');

    cy.get('ion-searchbar input').type('bob');
    cy.get('table').should('contain', 'bob@example.com');
    cy.get('table').should('not.contain', 'alice@example.com');
  });
});
