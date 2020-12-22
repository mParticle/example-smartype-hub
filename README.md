# mParticle Example Smartype Hub

A Smartype Hub is a collection of Github Actions that build a [Smartype](https://github.com/mParticle/smartype) Distribution Packages that can be imported into varioud independent projects. This will allow for a centralized repository of [mParticle Data Master](https://docs.mparticle.com/guides/data-master/) data points and version files.

## Smartype Packages

Please note that this project only supports Smartype NPM Packages via Github Packages.

## Create Your Own Hub

**Note:** This assumes you have created your Data Plan in the mParticle UI

_For more details, visit the [mParticle Data Plan Docs](https://docs.mparticle.com/guides/data-master/#data-plans)_

1. Click the big green **Use This Template** above to create a new project based off this example project.

- _For more details: [Creating a repository from a template
  ](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)_

2. Modify `mp.config.json`:

```JSON
{
  "smartypeHubConfig": {
    "dataPlans": [
      // Add each data plan as a separate key/value pair
      // with your versions in an array
      {
        "dataPlanId": "YOUR-DATA-PLAN-ID",
        "versions": [1, 2, 3]
      },
      {
        "dataPlanId": "YOUR-OTHER-DATA-PLAN-ID",
        "versions": [1] // Should be an array, even if you have a single data plan
      }
      // Keep adding as many data plans as you'd like
    ],

    // This is the folder where data plans will be created
    // The folder must exist in your file system before you run the process
    "outputFolder": "dataplans"
  }
}

```

3. (optional) Modify the `description` field of the `templates/package.json` if you would like a custom package description

4. Commit your files and push to github

```
git add .
git commit -m "Initial Commit"
git push origin <your-repository-name>
```

5. Go to your repo on github.com and create the following [secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository):

- MP_WORKSPACE_ID
- MP_CLIENT_ID
- MP_CLIENT_SECRET

These values can be found in your [mParticle Workspace Settings](https://docs.mparticle.com/guides/platform-guide/workspaces/#managing-workspaces)

## Workflows

At present, the main workflow is a manual process that can be executed via the **Actions** tab in your Github Repo.

1. Go to Actions in your github repo

2. Look for **Generate Data Plans**

3. Select the dropdown **Run Workflow**

4. Select your desired branch and Click the **Run Workflow** button

The workflow will run in the following tasks:

1. Downloads the Smartype Jar file from Maven to be reused in each parallel operation

1. Loads your config to generate a [matrix](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) for the Github Action

1. Executes the following in parallel for each data plan version:

   1. Fetches your latest data plan from mParticle

   1. Creates a Smartype Distribution based on your Data Plan

   1. Generates an NPM Package.json file

   1. Publishes a Github NPM Package to your Smartype Hub's package repository

The resulting package name is based on your github owner account, the name of your repo, and your data plan id.

For example, if your github owner name is `octocat` and your Smartype Hub repo is called `my-smartype-project` and your Data Plan ID is `generic-data-plan`, your package will be:

```
@octocat/my-smartype-project-generic-data-plan
```

## Using a Smartype Hub Package

In any npm project,

1. Create an `.npmrc` file in the root directory of your project with your github owner account and the github registry url. For example, if your company/owner name is `octocat`:

```
@octocat:registry=https://npm.pkg.github.com/
```

2. Run `npm install @<github-name>/<smartype-package-distribution>`

- For example, `npm install @octocat/my-smartype-project-generic-data-plan`

This will automatically update your `package.json` and add the latest version of your data plan to your project.

## Support

Questions? Give us a shout at <support@mparticle.com>

## License

This mParticle Web Kit is available under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0). See the LICENSE file for more info.
