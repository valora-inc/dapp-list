/// <reference types="cypress" />


import data from '../../src/valora-dapp-list.json'

describe('Dapp Up Check', () => {
  for(const application of data.applications) {
    it(`should return 200 for ${application.url}`, async () => {
      if (application.url.startsWith('celo://')) return
      cy.request(application.url).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  } 
})
