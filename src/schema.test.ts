import { schema } from './schema'
import fs from 'fs'
import i18next from 'i18next'
const appList = require('./valora-dapp-list.json')

beforeEach(() => {
  jest.restoreAllMocks()
})

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
    const testDappObject = {
      categories: [],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories" must contain at least 1 items',
    )
  })

  it('errors on empty applications array', () => {
    const testDappObject = {
      categories: [
        {
          id: 'exchanges',
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications" must contain at least 1 items',
    )
  })
})

describe('invalid categories entries', () => {
  it('errors on missing id', () => {
    const testDappObject = {
      categories: [
        {
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].id" is required',
    )
  })

  it('errors on missing backgroundColor', () => {
    const testDappObject = {
      categories: [
        {
          id: 'exchanges',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].backgroundColor" is required',
    )
  })

  it('errors on missing fontColor', () => {
    const testDappObject = {
      categories: [
        {
          id: 'exchanges',
          backgroundColor: '#DEF8EA',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].fontColor" is required',
    )
  })

  it('errors on invalid id type', () => {
    const testDappObject = {
      categories: [
        {
          id: 1,
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].id" must be a string',
    )
  })

  it('errors on invalid backgroundColor type', () => {
    const testDappObject = {
      categories: [
        {
          id: 'exchanges',
          backgroundColor: 1,
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].backgroundColor" must be a string',
    )
  })

  it('errors on invalid fontColor type', () => {
    const testDappObject = {
      categories: [
        {
          id: 'exchanges',
          backgroundColor: '#DEF8EA',
          fontColor: 1,
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].fontColor" must be a string',
    )
  })

  it('errors on invalid backgroundColor pattern', () => {
    const testDappObject = {
      categories: [
        {
          id: 'exchanges',
          backgroundColor: 'black',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].backgroundColor" with value "black" fails to match the required pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/',
    )
  })

  it('errors on invalid fontColor pattern', () => {
    const testDappObject = {
      categories: [
        {
          id: 'exchanges',
          backgroundColor: '#DEF8EA',
          fontColor: 'white',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].fontColor" with value "white" fails to match the required pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/',
    )
  })

  it('errors on missing localized name', () => {
    const testDappObject = {
      categories: [
        {
          id: 'exchanges-something', // The matching key is missing in locales/base.json
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      "ValidationError: \"categories[0].id\" failed custom validation because Missing localization key 'categories.exchanges-something' in 'locales/base.json'",
    )
  })

  it('errors on period at the end of the localized name', () => {
    jest.spyOn(i18next, 't').mockReturnValueOnce('Social Impact.')
    const testDappObject = {
      categories: [
        {
          id: 'exchanges',
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      "ValidationError: \"categories[0].id\" failed custom validation because Localization key 'categories.exchanges' in 'locales/base.json' must not have a period at the end",
    )
  })

  it('errors on duplicate category entry', () => {
    const testDappObject = {
      categories: [
        {
          id: 'exchanges',
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
        {
          id: 'exchanges',
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[1]" contains a duplicate value',
    )
  })
})

describe('invalid applications entries', () => {
  const category = {
    id: 'social-impact',
    backgroundColor: '#DEF8EA',
    fontColor: '#1AB775',
  }
  it('errors on missing name', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          id: 'gooddollar',
          categoryId: 'social-impact',
          url: 'https://gooddapp.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].name" is required',
    )
  })

  it('errors on missing id', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          categoryId: 'social-impact',
          categories: ['social-impact', 'earn', 'finance-tools', 'spend'],
          url: 'https://gooddapp.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].id" is required',
    )
  })

  it('errors on missing categoryId', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          url: 'https://gooddapp.org/',
          categories: ['social-impact', 'earn', 'finance-tools', 'spend'],
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].categoryId" is required',
    )
  })

  it('errors on missing categories', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          url: 'https://gooddapp.org/',
          categoryId: 'social-impact',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].categories" is required',
    )
  })

  it('errors on missing url', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          categoryId: 'social-impact',
          categories: ['social-impact'],
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].url" is required',
    )
  })

  it('errors on invalid name type', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 1,
          id: 'gooddollar',
          categoryId: 'exchanges',
          url: 'https://gooddapp.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].name" must be a string',
    )
  })

  it('errors on invalid id type', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 1,
          categoryId: 'social-impact',
          url: 'https://gooddapp.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].id" must be a string',
    )
  })

  it('errors on invalid categoryId reference', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          categoryId: 'social-something', // This category id doesn't exist in the categories array
          categories: ['social-impact', 'earn', 'finance-tools', 'spend'],
          url: 'https://gooddapp.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].categoryId" must be [ref:root:categories]',
    )
  })

  it('errors on invalid categories reference', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          categoryId: 'social-impact',
          categories: ['social-something', 'earn', 'finance-tools', 'spend'], // This category id doesn't exist in the categories array
          url: 'https://gooddapp.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].categories[0]" must be [ref:root:categories]',
    )
  })

  it('errors on invalid url type', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          categoryId: 'social-impact',
          categories: ['social-impact'],
          url: 1,
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].url" must be a string',
    )
  })

  it('errors on invalid url uri', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          categoryId: 'social-impact',
          categories: ['social-impact'],
          url: 'javascript:alert("Hello World")',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].url" must be a valid uri with a scheme matching the celo|https pattern',
    )
  })

  it('errors on missing localized description', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true)

    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar-something', // the matching key doesn't exist in locales/base.json
          categoryId: 'social-impact',
          url: 'https://gooddapp.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      "ValidationError: \"applications[0].id\" failed custom validation because Missing localization key 'dapps.gooddollar-something' in 'locales/base.json'",
    )
  })

  it('errors on missing asset in the repo', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar-something', // the matching asset doesn't exist in the repo
          categoryId: 'social-impact',
          url: 'https://gooddapp.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].id" failed custom validation because Missing asset at \'../assets/gooddollar-something.png\'',
    )
  })

  it('errors on period at the end of the localized name', () => {
    jest
      .spyOn(i18next, 't')
      .mockReturnValueOnce(
        'Swap any tokens, enter a pool, or farm your crypto.',
      )
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          categoryId: 'social-impact',
          url: 'https://gooddapp.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      "ValidationError: \"categories[0].id\" failed custom validation because Localization key 'categories.social-impact' in 'locales/base.json' must not have a period at the end",
    )
  })

  it('errors on duplicate application entry', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          categoryId: 'social-impact',
          categories: ['social-impact'],
          url: 'https://gooddapp.org/',
          listOnAndroid: true,
          listOnIos: true,
        },
        {
          name: 'GoodDollar',
          id: 'gooddollar',
          categoryId: 'social-impact',
          categories: ['social-impact'],
          url: 'https://gooddapp.org/',
          listOnAndroid: true,
          listOnIos: true,
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[1]" contains a duplicate value',
    )
  })
})
