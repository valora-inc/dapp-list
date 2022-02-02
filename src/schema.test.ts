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
          id: '1',
          name: 'categories.exchanges',
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
          name: 'categories.exchanges',
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

  it('errors on missing name', () => {
    const testDappObject = {
      categories: [
        {
          id: '1',
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].name" is required',
    )
  })

  it('errors on missing backgroundColor', () => {
    const testDappObject = {
      categories: [
        {
          id: '1',
          name: 'categories.exchanges',
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
          id: '1',
          name: 'categories.exchanges',
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
          name: 'categories.exchanges',
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

  it('errors on invalid name type', () => {
    const testDappObject = {
      categories: [
        {
          id: '1',
          name: 1,
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "categories[0].name" must be a string',
    )
  })

  it('errors on invalid backgroundColor type', () => {
    const testDappObject = {
      categories: [
        {
          id: '1',
          name: 'categories.exchanges',
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
          id: '1',
          name: 'categories.exchanges',
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
          id: '1',
          name: 'categories.exchanges',
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
          id: '1',
          name: 'categories.exchanges',
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
          id: '1',
          name: 'categories.exchanges-something', // This key is missing in locales/base.json
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
      ],
      applications: [],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      "ValidationError: \"categories[0].name\" failed custom validation because Missing localization key 'categories.exchanges-something' in 'locales/base.json'",
    )
  })

  it('errors on duplicate category entry', () => {
    const testDappObject = {
      categories: [
        {
          id: '1',
          name: 'categories.exchanges',
          backgroundColor: '#DEF8EA',
          fontColor: '#1AB775',
        },
        {
          id: '1',
          name: 'categories.exchanges',
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
    id: '1',
    name: 'categories.exchanges',
    backgroundColor: '#DEF8EA',
    fontColor: '#1AB775',
  }
  it('errors on empty applications array', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
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
          name: 'Ubeswap',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
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
          name: 'Ubeswap',
          id: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].categoryId" is required',
    )
  })

  it('errors on missing description', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].description" is required',
    )
  })

  it('errors on missing logoUrl', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].logoUrl" is required',
    )
  })

  it('errors on missing url', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
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
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
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
          name: 'Ubeswap',
          id: 1,
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].id" must be a string',
    )
  })

  it('errors on invalid categoryId type', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: 1,
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].categoryId" must be a string',
    )
  })

  it('errors on invalid description type', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 1,
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].description" must be a string',
    )
  })

  it('errors on invalid logoUrl type', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl: 1,
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].logoUrl" must be a string',
    )
  })

  it('errors on invalid url type', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 1,
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].url" must be a string',
    )
  })

  it('errors on invalid logoUrl uri', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl: 'javascript:alert("Hello World")',
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].logoUrl" with value "javascript:alert("Hello World")" fails to match the required pattern: /^https:\\/\\/raw.githubusercontent.com\\/valora-inc\\/app-list\\/main\\/assets\\/[^/]+\\.png$/',
    )
  })

  it('errors on invalid url uri', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'javascript:alert("Hello World")',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].url" must be a valid uri with a scheme matching the celo|https pattern',
    )
  })

  it('errors on missing localized description', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap-something', // this key doesn't exist in locales/base.json
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      "ValidationError: \"applications[0].description\" failed custom validation because Missing localization key 'dapps.ubeswap-something' in 'locales/base.json'",
    )
  })

  it('errors on missing asset in the repo', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap-something.png', // This asset doesn't exist in the repo
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[0].logoUrl" failed custom validation because Missing asset at \'../assets/ubeswap-something.png\'',
    )
  })

  it('errors on duplicate application entry', () => {
    const testDappObject = {
      categories: [category],
      applications: [
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
        },
        {
          name: 'Ubeswap',
          id: '1',
          categoryId: '1',
          description: 'dapps.ubeswap',
          logoUrl:
            'https://raw.githubusercontent.com/valora-inc/app-list/main/assets/ubeswap.png',
          url: 'https://app.ubeswap.org/',
        },
      ],
    }
    expect(`${schema.validate(testDappObject).error}`).toBe(
      'ValidationError: "applications[1]" contains a duplicate value',
    )
  })
})
