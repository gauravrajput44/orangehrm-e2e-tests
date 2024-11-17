export class BuzzFeedMocks {

  static mockGetBuzzFeed() {
    cy.intercept('GET', '**/web/index.php/api/v2/buzz/feed*', {
      fixture: 'getBuzzFeed'
    }).as('getBuzzFeed')
  }

  static mockGetLatestBuzzFeed() {
    cy.intercept('GET', '**/web/index.php/api/v2/buzz/feed*', {
      fixture: 'getLatestBuzzFeed'
    }).as('getLatestBuzzFeed')
  }

  static mockLikePost(options = {}) {
    const {
      statusCode = 200,
      response = { success: true }
    } = options
    cy.intercept('POST', '**/web/index.php/api/v2/buzz/shares/*/likes', {
      statusCode,
      body: response
    }).as('likePost')
  }

  static mockPostComment() {
    cy.intercept('POST', '**/web/index.php/api/v2/buzz/shares/*/comments', (req) => {
      // Send response
      req.reply({
        statusCode: 200,
        body: {
          success: true
        }
      })
    }).as('postComment')
  }

  static mockGetComment() {
    cy.intercept('GET', '**/web/index.php/api/v2/buzz/shares/*/comments*', {
      fixture: 'getComment'
    }).as('getComment')
  }

  static mockPostFeed() {
    cy.intercept('POST', '**/web/index.php/api/v2/buzz/posts', (req) => {

      // Send response
      req.reply({
        statusCode: 200,
        body: {
          success: true
        }
      })
    }).as('postFeed')
  }
}