import schema from './schema'
const appList = require('./valora-dapp-list.json')

describe('valora-dapp-list.json', () => {
  it('complies with schema', () => {
    const validationResult = schema.validate(appList)
    expect(validationResult.error).toBe(undefined)
  })
})
