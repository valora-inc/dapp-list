[valora-dapp-list.json]: https://github.com/valora-inc/dapp-list/blob/main/src/valora-dapp-list.json
[base.json]: https://github.com/valora-inc/dapp-list/blob/main/locales/base.json

# Adding new dapps

For a detailed video walkthrough of adding dapps to the Valora dapps list, check out this [video](https://youtu.be/t6qX85P02IQ?t=221). This video is highly recommended for non-technical users as it shows how to properly fork the repository and make changes without any local development environment. For text instructions, continue reading below.

## Required Changes

There are some fields that need to be translated into different languages, and this is done by Valora, so to add a new Dapp or category you need to follow the following steps:

- Open [valora-dapp-list.json]. You will see that it has two root objects (both arrays), `categories` and `applications`. The fields for each are described below.
- The process to add a new category or Dapp is analogous, we'll use adding a new Dapp as example. For Dapps, we need to add a new item to the `applications` array. Valora Inc will do translations, so you don't put an actual description there.
- To write the description, open the file [base.json]. This json also has two root objects, `categories` and `dapps`. In our previous example, we'd add under `dapps` a new field called `ubeswap` and write the description there.
- After doing this you should open a PR and ask someone on the Valora team to review it so it can be merged. Once it's merged, the Valora Inc translations team will receive the new strings and translate them into all the supported languages.
- Once they do, Crowdin will automatically open a PR with all the translations. After the Valora team merges this Crowdin PR the new categories or Dapp will be visible in the Valora Wallet.

## Dapps

| Property        | Description                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`          | The name of the Dapp.                                                                                                                                                   |
| `id`            | A unique identifier for the Dapp. The current pattern is to use a lower-kebab-case string.                                                                              |
| `categoryId`    | The category id under which the Dapp should show up. This will be deprecated soon, it will be replaced by `categories`.                                                 |
| `categories`    | An array of category ids under which the Dapp should show up.                                                                                                           |
| `url`           | The URL to open when the Dapp is selected. Can also be a deep link to open in-app.                                                                                      |
| `listOnAndroid` | Whether to list the Dapp on Android devices. Your Dapp must be compliant with the [Play Store Content Policy](https://play.google.com/about/developer-content-policy/). |
| `listOnIos`     | Whether to list the Dapp on iOS devices. Your Dapp must be compliant with the [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/).  |

The logo of the Dapp must be a 256 x 256 PNG added to the `assets` folder. It will be available after merging in a URL with this format: `https://raw.githubusercontent.com/valora-inc/dapp-list/main/assets/{id}.png`.

The English description of the Dapp should be added to [base.json] under the path `dapps.{id}`.

Please make sure that the description follows these guidelines:

- Dapp descriptions must be 50 characters or less and describe what the user can do with the dapp. Dapp descriptions should not have a period at the end, but should adhere to American english spelling and punctuation otherwise.
  Example: Swap tokens through a decentralized exchange
- Should not include a period at the end of the description.

### Templating

Valora has basic support for replacing the following template
parameters in a Dapps URL:

| Parameter     | Description            |
| ------------- | ---------------------- |
| `{{address}}` | Valora Account Address |

For example:

```
https://celotracker.com/?address={{address}}
```

## Categories

| Property          | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `id`              | A unique identifier for the Dapp. The current pattern is to use a lower-kebab-case string. |
| `backgroundColor` | The color for the background of the category in-app.                                       |
| `fontColor`       | The color for the font color of the category in-app.                                       |

The English description of the category should be added to [base.json] under the path `categories.{id}`.

## FAQs

### What might prevent my Dapp from being listed on iOS?

The [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
are constantly evolving and we encourage all Dapp builders to follow
those changes.

There are a few common Dapp features that the App Store Review
Guidelines currently prohibit (_N.B._, this is not an exhaustive list):

- Purchasing NFTs without [In App Purchase](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase)). This
  convention is targeted at collectible use cases for NFTs (instead of
  other uses cases like using NFTs to represent liquidity pool
  positions).
- Gambling with assets that might be construed as ["real money"](https://developer.apple.com/app-store/review/guidelines/#gaming-gambling-and-lotteries) without
  a conventional gambling license.
