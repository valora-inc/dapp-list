import data from './valora-dapp-list.json'
import request from 'supertest'

describe('Deployed URL check', () => {
  for (const application of data.applications) {
    it(
      `should return 200 for ${application.url}`,
      async () => {
        // Skip celo:// urls
        if (application.url.startsWith('celo://')) return
        // Allow one redirect
        const response = await request(application.url).get('').redirects(1)
        expect(response.status).toBe(200)
      },
      15 * 1000,
    )
  }
})
