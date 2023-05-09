/// <reference types="cypress" />

import data from '../../src/valora-dapp-list.json'

const ignoreList = [
  'gooddollar', // Blocks Microsoft services via Cloudflare
  'swftpro', // Blocks Microsoft services via Cloudflare  
]

describe('Dapp Up Check', () => {
  for (const application of data.applications) {
    if (application.url.startsWith('celo://')) continue
    if (ignoreList.includes(application.id)) continue
    it(
      `should return 200 for ${application.url}`,
      { retries: 3, responseTimeout: 60000 },
      () => {
        cy.request(application.url).then((response) => {
          expect(response.status).to.eq(200)
        })
      },
    )
  }
})
