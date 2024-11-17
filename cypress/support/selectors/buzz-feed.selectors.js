export const BUZZ_SELECTORS = {
    buzzLink: '.oxd-main-menu-item',
    feedPost: {
        feedInputField: 'textarea.oxd-buzz-post-input',
        submitButton: 'button.oxd-button.oxd-button--medium.oxd-button--main',
        postContent: '.orangehrm-buzz-post-body-text',
    },
    commentOnPostButton: 'button.oxd-icon-button i.bi-chat-text-fill',
    inputCommentField: '[placeholder="Write your comment..."]',
    postedComment: '.orangehrm-post-comment-area .orangehrm-post-comment-text',
    feed: {
        container: '.oxd-grid-item--gutters',
        actions: {
            container: '.orangehrm-buzz-post-actions',
            likeButton: '#heart-svg'
        },
        stats: {
            likes: '.orangehrm-buzz-stats-row:first-child .orangehrm-buzz-stats-active',
            comment: '.orangehrm-buzz-stats-row:last-child .orangehrm-buzz-stats-active:nth-child(1)',
            share: '.orangehrm-buzz-stats-row:last-child .orangehrm-buzz-stats-active:nth-child(2)'
        }
    },
};
