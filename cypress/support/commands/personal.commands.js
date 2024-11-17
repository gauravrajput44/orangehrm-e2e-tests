import { PERSONAL_SELECTORS } from '../selectors/personal.selectors'

Cypress.Commands.add('navigateToMyInfo', () => {
  cy.get(PERSONAL_SELECTORS.myInfo).click();
  cy.get(PERSONAL_SELECTORS.form).should('be.visible')
})

Cypress.Commands.add('updateFirstNameAndLastNameDetails', (firstName, lastName) => {
  cy.get(PERSONAL_SELECTORS.inputs.firstName).clear().type(firstName)
  cy.get(PERSONAL_SELECTORS.inputs.lastName).clear().type(lastName)

  cy.get(PERSONAL_SELECTORS.inputs.save).click()
})