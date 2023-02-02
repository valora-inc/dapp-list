import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import valoraDappList from './valora-dapp-list.json'
const sizeOfImage = promisify(require('image-size'))

const ASSETS_DIRECTORY = './assets'
const REQUIRED_ASSET_HEIGHT = 256
const REQUIRED_ASSET_WIDTH = 256
const REQUIRED_ASSET_TYPE = 'png'

describe('assets', () => {
  const assetPaths = fs
    .readdirSync(ASSETS_DIRECTORY)
    .map((assetFilename) => path.join(ASSETS_DIRECTORY, assetFilename))

  it.each(assetPaths)('%s is the required size', async (assetPath) => {
    const { height, width } = await sizeOfImage(assetPath)
    expect(height).toBe(REQUIRED_ASSET_HEIGHT)
    expect(width).toBe(REQUIRED_ASSET_WIDTH)
  })

  it.each(assetPaths)('%s is the required type', async (assetPath) => {
    const { type: assetType } = await sizeOfImage(assetPath)
    expect(assetType).toBe(REQUIRED_ASSET_TYPE)
  })

  it.each(assetPaths)(
    '%s has an associated application entry',
    async (assetPath) => {
      const id = path.basename(assetPath, '.png')
      const application = valoraDappList.applications.find(
        (application) => application.id === id,
      )
      expect(application).toBeTruthy()
    },
  )
})
