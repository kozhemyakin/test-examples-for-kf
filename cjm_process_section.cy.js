describe('CJM Process section', () => {
  before(() => {
    cy.signup()
  })

  it('should add processes to cells', () => {
    // Add project
    cy.addProject()

    // Add CJM
    cy.addCjm()

    // Add linear process to 1st cell, non-linear process to 2nd cell, Ongoing process to 3rd cell, Bi-directional process to 4th cell

    for (let i = 2; i < 6; i += 1) {
      cy.get(`div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(${i}) > svg.sticker-bg__icon.blank`)
        .should('exist')
    }

    for (let i = 2; i < 6; i += 1) {
      cy.get(`div#app div[data-section-id="section3"] div.matrix-item:nth-child(${i}) div.fr-view`)
        .click({ force: true })

      cy.get(`div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(${i}) button.sticker-settings`)
        .click({ force: true })

      cy.get(`div#app div.process-menu div.process-menu__item:nth-child(${i}) > div > div.process-menu__image`)
        .click({ force: true })
    }

    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(2) > svg.sticker-bg__icon.linear')
      .should('exist')
    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(3) > svg.sticker-bg__icon.non-linear')
      .should('exist')
    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(4) > svg.sticker-bg__icon.ongoing')
      .should('exist')
    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(5) > svg.sticker-bg__icon.bidirectional')
      .should('exist')

  // Check every process can be changed to Blank
    for (let i = 2; i < 6; i += 1) {
      cy.get(`div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(${i}) > svg.sticker-bg__icon.blank`)
        .should('not.exist')
    }

    for (let i = 2; i < 6; i += 1) {
      cy.get(`div#app div[data-section-id="section3"] div.matrix-item:nth-child(${i}) div.fr-view`)
        .click({ force: true })

      cy.get(`div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(${i}) button.sticker-settings`)
        .click({ force: true })

      cy.get('div#app div.process-menu div.process-menu__item:nth-child(1) > div > div.process-menu__image')
        .click({ force: true })
    }

  // Delete cell with icons and click Undo button
    cy.scrollTo('left')
      .wait(500)

    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(2) > svg.sticker-bg__icon.blank')
      .should('exist')

    cy.get('div#app div[data-section-id="section3"] div.matrix-item:nth-child(2) div.fr-view')
      .click({ force: true })

    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(2) button.sticker-delete')
      .click({ force: true })
      .wait(500)

    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(2) > svg.sticker-bg__icon.blank')
      .should('not.exist')

    cy.get('div#app [data-cy="toplink_undo"]')
      .click()
      .wait(500)

    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div:nth-child(2) > svg.sticker-bg__icon.blank')
      .should('exist')

  // Delete section and click Undo button
    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div.section-header__title div.section-title-edit')
      .should('contain', 'Process')
      .click()

    cy.get('div#app div[data-section-id="section3"] [title="Remove section"]')
      .click({ force: true })

    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div.section-header__title div.section-title-edit')
      .should('not.exist')

    cy.get('div#app [data-cy="toplink_undo"]')
      .click({ force: true })

    cy.get('div#app div[data-section-id="section3"] div.cjm-row.cjm-row--first > div.section-header__title div.section-title-edit')
      .should('contain', 'Process')
  })
})
