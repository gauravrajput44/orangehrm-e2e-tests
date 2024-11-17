import { BUZZ_SELECTORS } from '../support/selectors/buzz-feed.selectors'
import { BuzzFeedMocks } from '../support/mocks/buzz-feeds.mocks'
import { verifyFailureToastMessage } from '../support/helpers/expect.helpers'

describe('Buzz Feed Page Tests', () => {
    beforeEach(() => {
        cy.fixture('userCredentials').then((userData) => {
            cy.login(userData.validUser.username, userData.validUser.password)
        })
        BuzzFeedMocks.mockGetBuzzFeed()
        cy.navigateToBuzz()
        cy.wait('@getBuzzFeed')
    })


    it('User can see count for like, share and comment, like count is creased when liking a feed', () => {
        BuzzFeedMocks.mockLikePost();
        cy.getLikesCount().then(likesCount => {
            expect(likesCount, 'Feed should have exactly 1 like').to.equal(1)
        })

        cy.getShareCount().then(shareCount => {
            expect(shareCount, 'Feed should have exactly 1 share').to.equal(1)
        })

        cy.getCommentCount().then(commentCount => {
            expect(commentCount, 'Feed should have exactly 1 comment').to.equal(1)
        })

        // Get first post's current like count
        cy.getLikesCount().then(initialLikes => {

            // Click like and verify API response
            cy.get(BUZZ_SELECTORS.feed.actions.likeButton)
                .first()
                .click()

            cy.wait('@likePost', { timeout: 10000 })
                .its('response.body')
                .should('exist')

            // Verify updated count
            cy.getLikesCount().then(updatedLikes => {
                expect(updatedLikes, 'Like count is not increased!').to.equal(initialLikes + 1)
            })
        })
    })

    it('User can see error message on the page when POST request for the LIKE gets failed', () => {
        BuzzFeedMocks.mockLikePost({
            statusCode: 500,
            response: { error: 'Internal server error' }
        })

        cy.get(BUZZ_SELECTORS.feed.actions.likeButton)
            .first()
            .click()
        cy.wait('@likePost')

        verifyFailureToastMessage({})
    })

    it('User can post a comment on a feed', () => {
        const testComment = 'Hello1234356'
        BuzzFeedMocks.mockPostComment()
        BuzzFeedMocks.mockGetComment()
        cy.postCommentOnAFeed(testComment)

        // Wait for API response and verify request payload
        cy.wait('@postComment').then((interception) => {
            expect(interception.request.body).to.deep.equal({
                text: testComment,
            })
            expect(interception.response.statusCode).to.equal(200)
        })

        cy.wait('@getComment')

        cy.getComment().then(postText => {
            expect(postText).to.equal(testComment, 'Latest post should contain the posted comment')
        })
    })

    it('User can post a feed', () => {
        const feedMessage = 'Amazing thing'
        BuzzFeedMocks.mockPostFeed()
        BuzzFeedMocks.mockGetLatestBuzzFeed()

        cy.postFeed(feedMessage)

        // Wait for API response and verify request payload
        cy.wait('@postFeed').then((interception) => {
            expect(interception.request.body).to.deep.equal({
                text: feedMessage,
                type: 'text'
            })
            expect(interception.response.statusCode).to.equal(200)
        })

        cy.wait('@getLatestBuzzFeed')

        // Verify the new post content
        cy.getLatestFeed().then(postText => {
            expect(postText).to.equal(feedMessage, 'Latest feed should contain the posted text')
        })
    })
})

