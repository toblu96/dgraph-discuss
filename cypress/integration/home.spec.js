describe('The Home Page', () => {
    it('should visit the Blog Post page', () => {
        cy.visit('/')
        cy.get('h2 > div').contains('Blog Posts')
    })

    it('should contain at least one blog post', () => {
        cy.get('#blog-post-list-entry')
    })
})