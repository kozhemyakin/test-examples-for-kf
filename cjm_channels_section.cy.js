describe('CJM Channels section', () => {
  before(() => {
    cy.signup()
  })

  it('should add channels to section', () => {
    // Add project
    cy.addProject()

    // Add CJM
    cy.addCjm()

    // Add Channels
    cy.get('div#app div:nth-child(7) div.lockable-inner.sticker')
    .should('not.exist')

    cy.get('[data-cy="add_section_btn"]')
      .click()

    cy.get('div#app div.v-dialog__content > div:nth-child(1) > div.add-section-item__descr-title')
      .click()

    cy.get('div#app div.v-dialog__content > button > span')
      .should('contain', 'Add')
      .click()

    cy.get('div#app div.section-wrap:nth-child(7) div.section-title-edit__wrap > div')
      .should('contain', 'Channels')

    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(2) div.fr-view')
      .click({ force: true })

    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(2) button.sticker-settings')
      .click()

    function addChannelsFromOneGroup(channelsQty) {
      for (let i = 1; i < channelsQty; i += 1) {
        cy.get(`div#app div.channels__group:nth-child(2) div.channels__group-item:nth-child(${i})`)
          .click({ force: true })
      }
    }

    addChannelsFromOneGroup(8)

    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(4) div.fr-view > p')
      .wait(1000)
      .click({ force: true })

    function checkActiveChannelsInCell(qty) {
      for (let i = 1; i < qty; i += 1) {
        cy.get(`div#app div:nth-child(7) div.sticker-bg.sticker-bg--row > div:nth-child(${i})`)
          .should('exist')
      }
    }

    checkActiveChannelsInCell(8)

    // Check Blank icon works
    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(2) div.fr-view > p')
      .click({ force: true })

    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(2) button.sticker-settings')
      .click({ force: true })

    function checkActiveChannelsInPopup(qty) {
      for (let i = 1; i < qty; i += 1) {
        cy.get(`div#app div.channels__group:nth-child(2) div.channels__group-item--actived:nth-child(${i})`)
          .should('exist')
      }
    }

    checkActiveChannelsInPopup(8)

    // Click at Blank icon
    cy.get('div#app div.channels__group:nth-child(1) div.channels-popup-channels__group-item:nth-child(1)')
      .click({ force: true })

    function checkInactiveChannelsInPopup(qty) {
      for (let i = 1; i < qty; i += 1) {
        cy.get(`div#app div.channels__group:nth-child(2) div.channels__group-item--actived:nth-child(${i})`)
          .should('not.exist')
      }
    }

    checkInactiveChannelsInPopup(8)

    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(4) div.fr-view')
      .click({ force: true })

    cy.get('div#app div:nth-child(7) div.sticker-bg.sticker-bg--row > div:nth-child(1)')
      .should('not.exist')

    // Check Icons are present in every category
    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(2) div.fr-view')
      .click({ force: true })

    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(2) button.sticker-settings')
      .click()

    function addOneChannelFromManyGroups(groupQty) {
      for (let i = 1; i <= groupQty; i += 1) {
        cy.get(`div#app div.channels__group:nth-child(${i}) div.channels-popup-channels__group-item:nth-child(1)`)
          .click({ force: true })
      }
    }

    addOneChannelFromManyGroups(9)

    // Close popup
    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(2) div.fr-view')
      .click({ force: true })

    // Search channels
    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(2) button.sticker-settings')
      .click({ force: true })

    cy.get('div#app div.channels-popup--without-search div.channels-popup__tabs')
      .should('not.exist')

    // Close popup
    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(4) div.fr-view')
      .click({ force: true })

    // Delete cell with icons and click Undo button
    cy.get('div#app div:nth-child(7) div.sticker-bg.sticker-bg--row')
      .should('exist')

    cy.get('div#app div.section-wrap:nth-child(7) div.matrix-item:nth-child(2) div.fr-view')
      .click({ force: true })

    cy.get('div#app [data-section-id]:nth-child(7) div.matrix-item:nth-child(2) button.sticker-delete')
      .click()

    cy.get('div#app div:nth-child(7) div.sticker-bg.sticker-bg--row')
      .should('not.exist')
      .wait(10000)

    cy.get('div#app [data-cy="toplink_undo"]')
      .click()

    cy.get('div#app div:nth-child(7) div.sticker-bg.sticker-bg--row')
      .should('exist')

    // Delete section and click Undo button
    cy.get('div#app [data-section-id]:nth-child(7) div.section-title-edit__wrap > div')
      .click()

    cy.get('div#app [data-section-id]:nth-child(7) [title="Remove section"]')
      .click()

    cy.get('div#app [data-section-id]:nth-child(7) div.section-title-edit__wrap > div')
      .should('not.exist')

    cy.get('div#app [data-cy="toplink_undo"]')
      .click()

    cy.get('div#app [data-section-id]:nth-child(7) div.section-title-edit__wrap > div')
      .should('exist')
  })
})
