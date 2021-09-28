describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alex',
      username: 'alexcarchiar',
      password: 'P4$$w0rd',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
    cy.contains('Login')
  })

  describe('Login', function () {
    it('successful login', function () {
      cy.contains('log in').click()
      cy.contains('login').click()
      cy.get('#username').type('alexcarchiar')
      cy.get('#password').type('P4$$w0rd')
      cy.get('#login-button').click()
      cy.contains('Hello Alex')

    })

    it('wrong login', function () {
      cy.contains('log in').click()
      cy.contains('login').click()
      cy.get('#username').type('wrongUser')
      cy.get('#password').type('superSecret')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
      cy.get('html').should('not.contain', 'Hello Alex')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'alexcarchiar',
        password: 'P4$$w0rd',
      }).then((response) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#titleInput').type('aaaaaaa')
      cy.get('#authorInput').type('homer')
      cy.get('#urlInput').type('http://example.com')
      cy.get('#newBlogButton').click()

      cy.contains('aaaaa')
    })

    it('blogs can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#titleInput').type('aaaaaaa')
      cy.get('#authorInput').type('homer')
      cy.get('#urlInput').type('http://example.com')
      cy.get('#newBlogButton').click()

      cy.contains('aaaaa')
      cy.contains('View').click()
      cy.get('.Like').click()
      cy.get('#numLikes').contains('0')
      cy.get('.Like').click()
      cy.get('#numLikes').contains('1')
    })

    it('deleting blog', function () {
      cy.contains('create new blog').click()
      cy.get('#titleInput').type('aaaaaaa')
      cy.get('#authorInput').type('homer')
      cy.get('#urlInput').type('http://example.com')
      cy.get('#newBlogButton').click()
      cy.contains('View').click()
      cy.get('#remove').click()
      cy.on('windows:confirm', () => true)
    })

  })


})