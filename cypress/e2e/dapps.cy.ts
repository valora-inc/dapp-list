/// <reference types="cypress" />

import data from '../../src/valora-dapp-list.json'

const ignoreList = [
  'gooddollar', // Blocks Microsoft services via Cloudflare
  'swftpro', // Blocks Microsoft services via Cloudflare
  'llamaswap', // Fails with 403 on first load
  'layer3', // Blocks Microsoft services via Cloudflare
  'stake-dao', // Fails with 403 on load
  'sarafu', // Blocks Microsoft services via Vercel
  'hedgey', // Blocks Microsoft services via Vercel
]

describe('Dapp Up Check', () => {
  for (const application of data.applications) {
    if (application.url.startsWith('celo://')) continue
    if (ignoreList.includes(application.id)) continue

    const dappUrl = application.url.replace(
      '{{address}}',
      // Test address we also use for https://github.com/valora-inc/hooks
      '0x2b8441ef13333ffa955c9ea5ab5b3692da95260d',
    )

    it(
      `should return 200 for ${dappUrl}`,
      { retries: 3, responseTimeout: 60000 },
      () => {
        cy.request(dappUrl).then((response) => {
          expect(response.status).to.eq(200)
        })
      },
    )
  }
})
