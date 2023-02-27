import base from '../locales/base.json'
import valoraDappList from './valora-dapp-list.json'

describe('locales', () => {
  const applicationIds = Object.keys(base.dapps).concat(
    Object.keys(base.dappsExperiment),
  )

  it.each(applicationIds)(
    '%s has an associated application entry',
    async (applicationId) => {
      const application = valoraDappList.applications.find(
        (application) => application.id === applicationId,
      )
      expect(application).toBeTruthy()
    },
  )
})
