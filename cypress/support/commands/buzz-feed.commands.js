import { BUZZ_SELECTORS } from '../selectors/buzz-feed.selectors';

Cypress.Commands.add('navigateToBuzz', () => {
    cy.get(BUZZ_SELECTORS.buzzLink)
        .contains('Buzz')
        .click();

    cy.get(BUZZ_SELECTORS.feed.container).should('be.visible');
});

Cypress.Commands.add('getLikesCount', () => {
    return getCount(BUZZ_SELECTORS.feed.stats.likes);
});

Cypress.Commands.add('getCommentCount', () => {
    return getCount(BUZZ_SELECTORS.feed.stats.comment);
});

Cypress.Commands.add('getShareCount', () => {
    return getCount(BUZZ_SELECTORS.feed.stats.share);
});

const extractNumber = (text) => parseInt(text.match(/\d+/)[0]);

const getCount = (selector) => {
    return cy.get(selector)
        .first()
        .invoke('text')
        .then(extractNumber);
};

Cypress.Commands.add('postFeed', (comment) => {
    cy.get(BUZZ_SELECTORS.feedPost.feedInputField).as('textarea').click()
    cy.get('@textarea')
        .clear()
        .type(comment);

    cy.get(BUZZ_SELECTORS.feedPost.submitButton).click();
});

Cypress.Commands.add('getLatestFeed', () => {
    return cy.get(BUZZ_SELECTORS.feedPost.postContent)
        .first()
        .invoke('text')
        .then(text => text.trim());
});

Cypress.Commands.add('postCommentOnAFeed', (comment) => {
    cy.get(BUZZ_SELECTORS.commentOnPostButton).as('btn').click()
    cy.get(BUZZ_SELECTORS.inputCommentField).as('textarea').click()
    cy.get('@textarea')
        .type(`${comment}{enter}`)
});

Cypress.Commands.add('getComment', () => {
    return cy.get(BUZZ_SELECTORS.postedComment)
        .first()
        .invoke('text')
        .then(text => text.trim());
});
