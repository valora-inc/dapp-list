const fs = require('fs')
const i18next = require('i18next')

const localizedFiles = fs.readdirSync('locales')
const resources = localizedFiles.reduce((acc, file) => {
  const lng = file.substring(0, file.length - '.json'.length)
  return {
    ...acc,
    [lng]: { translation: require(`../locales/${lng}.json`) },
  }
}, {})

i18next
  .init({
    resources,
    load: 'all',
    fallbackLng: {
      default: ['en'],
    },
  })
  .catch((reason) => console.error('Config', 'Failed to init i18n', reason))

function t(key, lng) {
  return i18next.t(key, { lng })
}

async function generateTranslatedFiles() {
  const dAppDirectory = JSON.parse(
    fs.readFileSync('src/valora-dapp-list.json', 'utf8'),
  )
  for (const file of localizedFiles) {
    const lng = file.substring(0, file.length - '.json'.length)
    const localizedDirectory = { ...dAppDirectory }
    localizedDirectory.categories = localizedDirectory.categories.map(
      (category) => ({
        ...category,
        name: t(category.name, lng),
      }),
    )
    localizedDirectory.applications = localizedDirectory.applications.map(
      (application) => ({
        ...application,
        name: t(application.name, lng),
        description: t(application.description, lng),
      }),
    )
    fs.writeFileSync(
      `translations/valora-dapp-list-${file}`,
      JSON.stringify(localizedDirectory, undefined, 2),
    )
  }
}

generateTranslatedFiles()
  .then(() => console.log('Finished'))
  .catch(console.error)
