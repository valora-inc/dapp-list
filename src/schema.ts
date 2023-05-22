import Joi, { CustomValidator } from 'joi'
import base from '../locales/base.json'
import i18next from 'i18next'
import fs from 'fs'
import path from 'path'

const humanIdPattern = /^[a-zA-Z0-9-]+$/
const colorCodePattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

i18next
  .init({
    resources: {
      base: {
        translation: base,
      },
    },
    lng: 'base',
  })
  .catch((reason: any) =>
    // eslint-disable-next-line no-console
    console.error('Config', 'Failed to init i18n', reason),
  )

const checkMatchingLocalization: CustomValidator = (value) => {
  const localizedValue = i18next.t(value)
  if (!localizedValue || localizedValue === value) {
    throw new Error(
      `Missing localization key '${value}' in 'locales/base.json'`,
    )
  }

  if (localizedValue[localizedValue.length - 1] === '.') {
    throw new Error(
      `Localization key '${value}' in 'locales/base.json' must not have a period at the end`,
    )
  }

  return value
}

const checkMatchingAsset: CustomValidator = (value) => {
  const filename = `${value}.png`
  const assetPath = path.join(__dirname, '../assets', filename)
  if (!fs.existsSync(assetPath)) {
    throw new Error(`Missing asset at '${path.relative(__dirname, assetPath)}'`)
  }

  return value
}

// Matches an existing category id in the categories array
const categoryRef = Joi.ref('/categories', {
  in: true,
  adjust: (nodes) => nodes.map((node: any) => node.id),
})

export const schema = Joi.object({
  categories: Joi.array()
    .items(
      Joi.object({
        id: Joi.string()
          .pattern(humanIdPattern)
          .custom((id, helpers) => {
            checkMatchingLocalization(`categories.${id}`, helpers)
            return id
          }, 'has a matching localized name')
          .required(),
        // TODO: Remove color contraints once we move all user to the new dapps version.
        backgroundColor: Joi.string().pattern(colorCodePattern).required(),
        fontColor: Joi.string().pattern(colorCodePattern).required(),
      }),
    )
    .min(1)
    .unique((category0, category1) => {
      const uniqueProperties = ['id', 'backgroundColor', 'fontColor']
      return uniqueProperties
        .map((property) => category0[property] === category1[property])
        .some((value) => value)
    })
    .required(),
  applications: Joi.array()
    .items(
      Joi.object({
        id: Joi.string()
          .pattern(humanIdPattern)
          .custom(checkMatchingAsset, 'has a matching asset')
          .custom((id, helpers) => {
            checkMatchingLocalization(`dapps.${id}`, helpers)
            return id
          }, 'has a matching localized description')
          .required(),
        name: Joi.string().required(),
        categoryId: Joi.valid(categoryRef).required(),
        categories: Joi.array().items(Joi.valid(categoryRef)).min(1).required(),
        url: Joi.string()
          .replace('{{address}}', '')
          .uri({
            scheme: ['celo', 'https'],
          })
          .required(),
        listOnAndroid: Joi.boolean().strict().required(),
        listOnIos: Joi.boolean().strict().required(),
      }),
    )
    .min(1)
    .unique((application0, application1) => {
      const uniqueProperties = ['id', 'name']
      return uniqueProperties
        .map((property) => application0[property] === application1[property])
        .some((value) => value)
    })
    .required(),
})
