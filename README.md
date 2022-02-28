# Dapp list

A curated list of Dapps featured in the Valora wallet.

Here's an example on what it looks like in action (note that it might become slightly outdated, but the general layout remains):

<p align="center">
  <img src="https://raw.githubusercontent.com/valora-inc/dapp-list/main/in-app-example.png" width=40%>
</p>

## The Dapp Bake Off

Submissions for the Dapp Bake Off are closed.

If you made a submission, you have until February 28th 2022 5:00 PM
PST (UTC−8) to address feedback from the Valora team.

## Adding new items

There are some fields that need to be translated into different languages, and this is done by Valora, so to add a new Dapp or category you need to follow the following steps:

- Open [`src/valora-dapp-list.json`](src/valora-dapp-list.json). You will see that it has two root objects (both arrays), `categories` and `applications`. The fields for each are described below.
- The process to add a new category or Dapp is analogous, we'll use adding a new Dapp as example. For Dapps, we need to add a new item to the `applications` array. Valora Inc will do translations, so you don't put an actual description there.
- To write the description, open the file [`locales/base.json`](locales/base.json). This json also has two root objects, `categories` and `dapps`. In our previous example, we'd add under `dapps` a new field called `ubeswap` and write the description there.
- After doing this you should open a PR and ask someone on the Valora team to review it so it can be merged. Once it's merged, the Valora Inc translations team will receive the new strings and translate them into all the supported languages.
- Once they do, Crowdin will automatially open a PR with all the translations. After the Valora team merges this Crowdin PR the new categories or Dapp will be visible in the Valora Wallet.

We encourage (and in many cases will require) basic documentation so users will understand what your dapp does and how to get started. We have summarized [Best Practices for User Documentation](./user-documentation-best-practices.md) to help dapps author a basic documentation that we think will be effective.

### Dapps

| Property     | Description                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ |
| `name`       | The name of the Dapp.                                                                      |
| `id`         | A unique identifier for the Dapp. The current pattern is to use a lower-kebab-case string. |
| `categoryId` | The category id under which the Dapp should show up.                                       |
| `url`        | The URL to open when the Dapp is selected. Can also be a deep link to open in-app.         |

The logo of the Dapp must be a 256 x 256 PNG added to the `assets` folder. It will be available after merging in a URL with this format: `https://raw.githubusercontent.com/valora-inc/dapp-list/main/assets/{id}.png`.

The English description of the Dapp should be added to [`locales/base.json`](locales/base.json) under the path `dapps.{id}`.

Please make sure that the description follows these guidelines:

- Dapp descriptions must be 50 characters or less and describe what the user can do with the dapp. Dapp descriptions should not have a period at the end, but should adhere to American english spelling and punctuation otherwise.
  Example: Swap tokens through a decentralized exchange
- Should not include a period at the end of the description.

#### Templating

Valora has basic support for replacing the following template
parameters in a Dapps URL:

| Parameter     | Description            |
| ------------- | ---------------------- |
| `{{address}}` | Valora Account Address |

For example:

```
https://celotracker.com/?address={{address}}
```

### Categories

| Property          | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `id`              | A unique identifier for the Dapp. The current pattern is to use a lower-kebab-case string. |
| `backgroundColor` | The color for the background of the category in-app.                                       |
| `fontColor`       | The color for the font color of the category in-app.                                       |

The English description of the category should be added to [`locales/base.json`](locales/base.json) under the path `categories.{id}`.

## Development

```
yarn
yarn validate
```

## Discussion

Join `#dapp-dev` on [Valora Discord](https://valoraapp.co/discord).
