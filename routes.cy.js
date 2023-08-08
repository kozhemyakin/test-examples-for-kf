const publicPages = [
  '/',
  '/about',
  '/accept-terms',
  '/affiliate-program',
  //  '...and so on'
]

const workspacesPages = [
  '/',
  '/billing',
  '/billing/billing-information',
  '/integrations',
  //  '...and so on'
]

const workspacesPagesForFreeUser = [
  '/',
  '/billing',
  '/billing/billing-information',
  '/invoices',
  //  '...and so on'
]

const wPages = [
  '/w/',
  '/w/shared',
  '/w/templates/',
  '/w/templates/banking-finance-and-insurance',
  //  '...and so on'
]

const sharedProjects = [
  '/w/rnOvc/p/v1ja7',
  '/w/rnOvc/p/UfJE5',
  '/w/rnOvc/p/Ivfrk',
  '/w/rnOvc/p/e7ifR',
  //  '...and so on'
]

describe('(Logged User) Available pages should have 200 response status code', () => {
  it('should have 200 response status code for new registered users', () => {
    cy.signup()

    cy.location('pathname').then(path => {
      const wsId = path.substring(path.length - 5)

      workspacesPagesForFreeUser.forEach(page => {
        cy.request({
          url: `workspace/${wsId}${page}`,
          failOnStatusCode: false,
        }).then(response => {
          expect(response.status).to.eq(200)
        })
      })

      wPages.forEach(page => {
        cy.request({
          url: page,
          failOnStatusCode: false,
        }).then(response => {
          expect(response.status).to.eq(200)
        })
      })
    })
  })

  it('should have 200 response status code for old registered user', () => {
    cy.login({ email: 'email', password: 'password' })
  })
})

describe('(Guest) Available pages should have 200 response status code', () => {
  it('should have 200 response status code on public pages', () => {
    publicPages.forEach(page => {
      cy.request({
        url: page,
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.eq(200)
      })
    })
  })

  it('should have 200 response status code on public shared projects', () => {
    sharedProjects.forEach(page => {
      if (page === '/w/rnOvc/p/v1ja7' || page === '/w/rnOvc/p/UfJE5') { // projects protected by password
        cy.visit(page)
        cy.request({
          url: page,
          failOnStatusCode: false,
        }).then(response => {
          expect(response.status).to.eq(200)
        })

        cy.get('input[type="password"]').type('123456')
        cy.get('button > span').contains('Get access').click()
        cy.get('span.artifact-header-filter--active').should('contain', 'All (6)')
      } else {
        cy.request({
          url: page,
          failOnStatusCode: false,
        }).then(response => {
          expect(response.status).to.eq(200)
        })
      }
    })
  })
})
