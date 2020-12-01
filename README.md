# Smartype Hubs

Smartype Hubs allow you to import and continously sync your mParticle Data Plans into Github using Github Actions, and quickly generate custom SDKs using [Smartype](https://github.com/mParticle/smartype). The generated SDKs can then be imported into your sites and apps via NPM!

## Smartype Packages

Please note that Smartype Hubs currently only support NPM Packages via Github Packages.

## Getting Started

### Prerequisites

- Create one or more Data Plans in your mParticle workspace and note their data plan IDs. For more details, [visit the mParticle Data Plan docs](https://docs.mparticle.com/guides/data-master/#data-plans).
- [Generate an API key and secret](https://docs.mparticle.com/developers/credential-management/) for your workspace with access to the Data Planning API

### 1. Create your Hub

Click the **Use this template** button above to create your Hub based off of this repository template.

### 2. Configure your Data Plans

Edit the [mp.config.json](mp.config.json) file in the root directory of your Hub:

- Choose which Data Plan IDs and versions you would like to sync to your Hub, and add each as a separate item to the `dataPlans` array.
- Then commit your updated [mp.config.json](mp.config.json) to the `master` branch of your Hub.

```JSON
{
  "smartypeHubConfig": {
    "dataPlans": [
      {
        "dataPlanId": "example_data_plan",
        "versions": [1, 2, 3]
      },
      {
        "dataPlanId": "another_example_data_plan",
        "versions": [1]
      }
    ],

    // This is the directory where data plans will be created
    // The directory must exist in your file system before you run the process
    "dataplanOutputDirectory": "dataplans"
  }
}

```

### 3. Configure your credentials

[Add the following encrypted secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) to your Hub:

- `MP_WORKSPACE_ID`: The integer [ID of the workspace](https://docs.mparticle.com/guides/platform-guide/workspaces/#managing-workspaces) that contains your Data Plan(s)
- `MP_CLIENT_ID`: A client ID with access to the Data Planning API
- `MP_CLIENT_SECRET`: A matching client secret with access to the Data Planning API

### 4. Initialize your Hub

Smartype Hubs use Github Actions to sync your Data Plans and generate your Smartype SDKs. At present, the main Github Actions "workflow" uses a manual trigger that can be executed via the **Actions** tab in your Hub.

1. Navigate to the Github Actions tab of your Hub
2. Look for **Generate Data Plans**
3. Select the dropdown **Run Workflow**
4. Select your desired branch and Click the **Run Workflow** button 🚀

The workflow will then do the following:

- Fetch your latest data plan(s) from mParticle
- Create Smartype SDKs based on each Data Plan ID and version that you configured in your `mp.config.json` file
- Publish your Smartype SDKs as NPM packages to your Hub's [Github package repository](https://docs.github.com/en/free-pro-team@latest/packages/guides/configuring-npm-for-use-with-github-packages)

The resulting package name is based on your Github owner account, the name of your Hub, and a Data Plan ID. For example, if your Github owner name is `octocat` and your Smartype Hub repo is called `my-smartype-hub` and your Data Plan ID is `example_data_plan`, your package will be:

```
@octocat/my-smartype-hub-example_data_plan
```

## Importing a Smartype Hub Package

With your packages generated, you can now import them into any other project.

1. Create an `.npmrc` file in the root directory of your project with your github owner account and the github registry url. For example, if your company/owner name is `octocat`:

   ```
   @octocat:registry=https://npm.pkg.github.com/
   ```

2. Run `npm install @<github-name>/<smartype-package-distribution>`

- For example, `npm install @octocat/my-smartype-project-generic-data-plan`

This will automatically update your `package.json` and add the latest version of your data plan to your project. Note that if you made your Smartype Hub private, you will need to make sure you [configure authentication](https://docs.github.com/en/free-pro-team@latest/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages).

## Support

Questions? Give us a shout at <support@mparticle.com>

## License

Smartype Hubs are available under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0). See the LICENSE file for more info.
