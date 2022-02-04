# Dapp list

A curated list of Dapps featured in the Valora wallet.

Here's an example on what it looks like in action (note that it might become slightly outdated, but the general layout remains):

<p align="center">
  <img src="https://raw.githubusercontent.com/valora-inc/dapp-list/main/in-app-example.png" width=40%>
</p>

## The Dapp Bake Off

You can submit your Dapp to the [Valora Dapp Bake
Off](https://valoraapp.com/bakeoff) from February 1st 2022 to February
15th 2022 by:

1. following the directions in [Adding new items](#adding-new-items) to add your Dapp to the list;
1. creating a pull request and complete the task lists in the pull request template; and
1. responding to feedback in your pull request from the Valora team.

If you have questions about this process, please join `#bakeoff` on the [Valora Discord](https://valoraapp.co/discord).

## Adding new items

There are some fields that need to be translated into different languages, and this is done by Valora, so to add a new Dapp or category you need to follow the following steps:

- Open [`src/valora-dapp-list.json`](src/valora-dapp-list.json). You will see that it has two root objects (both arrays), `categories` and `applications`. The fields for each are described below.
- The process to add a new category or Dapp is analogous, we'll use adding a new Dapp as example. For Dapps, we need to add a new item to the `applications` array. Valora Inc will do translations, so you don't put an actual description there.
- To write the description, open the file [`locales/base.json`](locales/base.json). This json also has two root objects, `categories` and `dapps`. In our previous example, we'd add under `dapps` a new field called `ubeswap` and write the description there.
- After doing this you should open a PR and ask someone on the Valora team to review it so it can be merged. Once it's merged, the Valora Inc translations team will receive the new strings and translate them into all the supported languages.
- Once they do, Crowdin will automatially open a PR with all the translations. After the Valora team merges this Crowdin PR the new categories or Dapp will be visible in the Valora Wallet.

### Dapps

| Property     | Description                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ |
| `name`       | The name of the Dapp.                                                                      |
| `id`         | A unique identifier for the Dapp. The current pattern is to use a lower-kebab-case string. |
| `categoryId` | The category id under which the Dapp should show up.                                       |
| `url`        | The URL to open when the Dapp is selected. Can also be a deep link to open in-app.         |

The logo of the Dapp must be a 256 x 256 PNG added to the `assets` folder. It will be available after merging in a URL with this format: `https://raw.githubusercontent.com/valora-inc/dapp-list/main/assets/{id}.png`.

The English description of the Dapp should be added to [`locales/base.json`](locales/base.json) under the path `dapps.{id}`.

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
