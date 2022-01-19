# Dapp list

A curated list of Dapps featured in the Valora wallet.

Here's an example on what it looks like in action (note that it might become slightly outdated, but the general layout remains):

<img src="https://raw.githubusercontent.com/valora-inc/app-list/main/assets/in-app-example.png" width=40%>

## Adding new items

There are some fields that need to be translated into different languages, and this is done by Valora, so to add a new Dapp or category you need to follow the following steps:

- Open `src/valora-dapp-list.json`. You will see that it has two root objects (both arrays), `categories` and `applications`. The fields for each are described below.
- The process to add a new category or Dapp is analogous, we'll use adding a new Dapp as example. For Dapps, we need to add a new item to the `aplpications` array. Their description is translated, so we don't put the actual description there, we just put a translation key, for example `dapps.ubeswap`.
- To write the description, open the file `locales/base.json`. This json also has two root objects, `categories` and `dapps`. In our previous example, we'd add under `dapps` a new field called `ubeswap` and write the description there.
- After doing this you should open a PR and ask someone on Valora to review it so it can be merged. Once it's merged, the Valora translations team will receive the new strings and translate them into all the supported languages. 
- Once they do, a new automatic PR is opened by Crowdin which has all the files with the translations. After merging this Crowdin PR the new categories or Dapp should be visible in the app.

### Categories

The fields for categories are:

- id: A unique identifier for the category. The current pattern is to use numbers, but any unique string will do.
- name: The name of the category. It should be translated, so don't put the actual name here, just a translation key like `categories.games`.
- backgroundColor: The color for the background of the category in-app.
- fontColor: The color for the font color of the category in-app.

### Dapps

The fields for Dapps are:

- name: The name of the Dapp
- id: A unique identifier for the Dapp. The current pattern is to use numbers, but any unique string will do.
- categoryId: The category id under which the Dapp should show up.
- description: The description of the Dapp. It should be translated, so don't put the actual description here, just a translation key like `dapps.ubeswap`.
- logoUrl: The URL of the logo. The logo image should be uploaded in the `assets` folder and it will be available after merging in a URL with this format: `https://raw.githubusercontent.com/valora-inc/app-list/main/assets/{imageName}.png`
- url: The URL to open when the Dapp is selected. Can also be a deep link to open in-app.

## Development

```
yarn
yarn validate
```

## Discussion

Join `#dapp-dev` on [Valora Discord](https://valoraapp.co/discord).
