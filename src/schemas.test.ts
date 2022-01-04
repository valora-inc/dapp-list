import schema from './schema'
const appList = require('./valora-app-list.json')

describe('valora-app-list.json', () => {
  it('complies with schema', () => {
    const validationResult = schema.validate(appList)
    expect(validationResult.error).toBe(undefined)
  })
})
