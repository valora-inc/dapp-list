import Joi, { CustomValidator } from 'joi'
import base from '../locales/base.json'
import i18next from 'i18next'
import fs from 'fs'
import { URL } from 'url'
import path from 'path'

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
    console.error('Config', 'Failed to init i18n', reason),
  )

const checkMatchingLocalization: CustomValidator = (value) => {
  const localizedValue = i18next.t(value)
  if (!localizedValue || localizedValue === value) {
    throw new Error(
      `Missing localization key '${value}' in 'locales/base.json'`,
    )
  }

  return value
}

const checkMatchingAsset: CustomValidator = (value) => {
  const url = new URL(value)
  const filename = path.basename(url.pathname)
  const assetPath = path.join(__dirname, '../assets', filename)
  if (!fs.existsSync(assetPath)) {
    throw new Error(`Missing asset at '${path.relative(__dirname, assetPath)}'`)
  }

  return value
}

export const schema = Joi.object({
  categories: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string()
          // Matches categories.something
          .pattern(/^categories\.([a-zA-Z0-9-]+)$/)
          .custom(checkMatchingLocalization, 'has a matching localization')
          .required(),
        backgroundColor: Joi.string().pattern(colorCodePattern).required(),
        fontColor: Joi.string().pattern(colorCodePattern).required(),
      }),
    )
    .min(1)
    .unique((category0, category1) => {
      const uniqueProperties = ['id', 'name', 'backgroundColor', 'fontColor']
      return uniqueProperties
        .map((property) => category0[property] === category1[property])
        .some((value) => value)
    })
    .required(),
  applications: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        categoryId: Joi.string().required(),
        description: Joi.string()
          // Matches dapps.something
          .pattern(/^dapps\.([a-zA-Z0-9-]+)$/)
          .custom(checkMatchingLocalization, 'has a matching localization')
          .required(),
        logoUrl: Joi.string()
          // For now only allow assets within this repo
          .pattern(
            /^https:\/\/raw.githubusercontent.com\/valora-inc\/app-list\/main\/assets\/[^/]+\.png$/,
          )
          .uri()
          .custom(checkMatchingAsset, 'has a matching asset')
          .required(),
        url: Joi.string()
          .replace('{{address}}', '')
          .uri({
            scheme: ['celo', 'https'],
          })
          .required(),
      }),
    )
    .min(1)
    .unique((application0, application1) => {
      const uniqueProperties = ['id', 'name', 'description']
      return uniqueProperties
        .map((property) => application0[property] === application1[property])
        .some((value) => value)
    })
    .required(),
})
