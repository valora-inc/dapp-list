import Joi from 'joi'

const appList = require('./valora-dapp-list.json')
const rankingList = require('./valora-dapps-ranking.json')

const appIds = appList.applications.map((app: any) => app.id)
const dappsRankingSchema = Joi.object({
  dappsPopularityRanking: Joi.array()
    .items(Joi.string().valid(...appIds))
    .required(),
})

describe('valora-dapp-ranking.json', () => {
  it('complies with schema', () => {
    const validationResult = dappsRankingSchema.validate(rankingList)
    expect(validationResult.error).toBe(undefined)
  })
})
