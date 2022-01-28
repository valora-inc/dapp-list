import { schema } from './schema'
const appList = require('./valora-dapp-list.json')

describe('valora-dapp-list.json', () => {
  it('complies with schema', () => {
    const validationResult = schema.validate(appList)
    expect(validationResult.error).toBe(undefined)
  })
})

describe('invalid dapp list arrays', () => {
  it('errors on object', () => {
    expect(`${schema.validate({}).error}`).toBe(
      'ValidationError: "categories" is required',
    )
  })

  it('errors on empty categories array', () => {
    const testSchema = {
      categories: [],
      applications: [],
    }
    expect(`${schema.validate(testSchema).error}`).toBe(
      'ValidationError: "categories" must contain at least 1 items',
    )
  })

  it('errors on empty applications array', () => {
    const testSchema = {
      categories: [
        {
          id: '1',
          name: 'categories.exchanges',
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testSchema).error}`).toBe(
      'ValidationError: "applications" must contain at least 1 items',
    )
  })
})

describe('invalid categories entries', () => {
  it.todo('errors on missing id')
  it.todo('errors on missing name')
  it.todo('errors on missing background color')
  it.todo('errors on missing fontColor')
  it.todo('errors on invalid id type')
  it.todo('errors on invalid name type')
  it.todo('errors on invalid backgroundColor type')
  it.todo('errors on invalid fontColor type')
  it.todo('errors on invalid backgroundColor pattern')
  it.todo('errors on invalid fontColor pattern')
  it.todo('errors on duplicate category entry')
})

describe('invalid applications entries', () => {
  it.todo('errors on missing name')
  it.todo('errors on missing id')
  it.todo('errors on missing categoryId')
  it.todo('errors on missing description')
  it.todo('errors on missing logoUrl')
  it.todo('errors on missing url')
  it.todo('errors on invalid name type')
  it.todo('errors on invalid id type')
  it.todo('errors on invalid categoryId type')
  it.todo('errors on invalid description type')
  it.todo('errors on invalid logoUrl type')
  it.todo('errors on invalid url type')
  it.todo('errors on invalid logoUrl pattern')
  it.todo('errors on invalid url pattern')
  it.todo('errors on duplicate application entry')
})
