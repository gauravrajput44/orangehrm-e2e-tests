import { LOGIN_SELECTORS } from '../selectors/login.selectors'

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/web/index.php/auth/login');
  cy.get(LOGIN_SELECTORS.inputs.username).type(username);
  cy.get(LOGIN_SELECTORS.inputs.password).type(password);
  cy.get(LOGIN_SELECTORS.inputs.submit).click();
});

Cypress.Commands.add('logout', () => {
  cy.get(LOGIN_SELECTORS.userDropdown.tab).click();
  cy.get(LOGIN_SELECTORS.userDropdown.logoutLink).click();
});
