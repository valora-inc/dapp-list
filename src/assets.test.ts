import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
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

  it.each(assetPaths)('%s are the required type', async (assetPath) => {
    const { type: assetType } = await sizeOfImage(assetPath)
    expect(assetType).toBe(REQUIRED_ASSET_TYPE)
  })
})
