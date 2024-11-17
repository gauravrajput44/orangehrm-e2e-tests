import { LOGIN_SELECTORS } from '../support/selectors/login.selectors';

describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('/web/index.php/auth/login')
  })

  it('User can login successfully with valid credentials', () => {
    cy.fixture('userCredentials').then((userData) => {
      cy.login(userData.validUser.username, userData.validUser.password)

      cy.url().should('include', '/dashboard');
      cy.get(LOGIN_SELECTORS.validation.userDropdownName)
        .then($element => {
          expect($element, 'User dropdown should be visible').to.be.visible
        })
    })
  })

  it('User can see error message with invalid credentials', () => {
    cy.fixture('userCredentials').then((userData) => {
      cy.login(userData.invalidUser.username, userData.invalidUser.password)

      cy.get(LOGIN_SELECTORS.validation.errorAlert)
        .then($element => {
          expect($element, 'Invalid credential message should be visible').to.be.visible
          expect($element.text().trim(), 'Login error should show "Invalid credentials" message')
            .to.include('Invalid credentials')
        })
    })
  })

  it('User can logout successfully', () => {
    cy.fixture('userCredentials').then((userData) => {
      cy.login(userData.validUser.username, userData.validUser.password);
      cy.url().should('include', '/dashboard');

      cy.logout();

      cy.url().should('include', '/auth/login')
      cy.get(LOGIN_SELECTORS.loginForm)
        .then($form => {
          expect($form, 'Login form should be visible').to.be.visible
        });

      cy.get(LOGIN_SELECTORS.validation.userDropdownName)
        .should('not.exist')
        .then($element => {
          expect($element, 'User dropdown should not exist').to.not.exist
        })
    });
  });
});