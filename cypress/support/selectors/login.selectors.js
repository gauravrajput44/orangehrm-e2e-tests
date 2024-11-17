export const LOGIN_SELECTORS = {
  inputs: {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    submit: 'button[type="submit"]'
  },
  userDropdown: {
    tab: '.oxd-userdropdown-tab',
    logoutLink: ':nth-child(4) > .oxd-userdropdown-link'
  },
  validation: {
    errorAlert: '.oxd-alert-content',
    userDropdownName: '.oxd-userdropdown-name'
  },
  loginForm: '.orangehrm-login-form'
}