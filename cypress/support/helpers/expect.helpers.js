
import { TOAST_MESSAGE_SELECTORS } from '../selectors/toast-message.selectors'

export const verifyFailureToastMessage = ({ type = 'error', title = 'Error', message = 'Unexpected Error' }) => {
    cy.get(TOAST_MESSAGE_SELECTORS.error.container)
    .should('exist')
    .should('be.visible', { force: true })
    .should('have.css', 'opacity', '1')

    cy.get(TOAST_MESSAGE_SELECTORS.error.title, { timeout: 10000 }).should('be.visible').then($title => {
        expect($title, `${type} title should be visible`).to.be.visible
        expect($title.text(), `${type} title message should contain "${title}"`).to.include(title)
    });

    cy.get(TOAST_MESSAGE_SELECTORS.error.message).should('be.visible').then($message => {
        expect($message, `${type} message should be visible`, { timeout: 10000 }).to.be.visible
        expect($message.text(), `${type} message should contain "${message}"`).to.include(message)
    });
};