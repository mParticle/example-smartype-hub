# mParticle Example Smartype Hub

A Smartype Hub is a collection of Github Actions that build a [Smartype](https://github.com/mParticle/smartype) Distribution Packages that can be imported into varioud independent projects. This will allow for a centralized repository of [mParticle Data Master](https://docs.mparticle.com/guides/data-master/) data points and version files.

## Smartype Packages

Please note that this project only supports Smartype NPM Packages via Github Packages.

## Create Your Own Hub

**Note:** This assumes you have created your Data Plan in the mParticle UI

_For more details, visit the [mParticle Data Plan Docs](https://docs.mparticle.com/guides/data-master/#data-plans)_

1. [Fork this repo](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) with a new name and `cd` into it locally on your computer.

2. Run `cp mp.config.example mp.config.json` to Copy and rename your config file.

3. Modify your Data Plan File:

```
{
  "planningConfig": {
    "dataPlanId": "YOUR-DATA-PLAN-ID", // Add your Data Plan ID
    "versionNumber": 1 // Change this to your latest Data Plan Version
  }
}
```

4. Create an `.npmrc` file in the root directory of your project with your github owner account and the github registry url. For example, if your company/owner name is `octocat`:

```
@octocat:registry=https://npm.pkg.github.com/
```

- _**Note:** This `.npmrc` file must also be shared across your organization so that your consumers can import the smartype package._

5. (optional) Modify the `description` field of the `templates/package.json` if you would like a custom package description

6. Commit your files and push to github

```
git add .
git commit -m "Initial Commit"
git push origin <your-repository-name>
```

7. Go to your repo on github.com and create the following [secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository):

- MP_WORKSPACE_ID
- MP_CLIENT_ID
- MP_CLIENT_SECRET

These values can be found in your [mParticle Workspace Settings](https://docs.mparticle.com/guides/platform-guide/workspaces/#managing-workspaces)

## Workflows

At present, the main workflow is a manual process that can be executed via the **Actions** tab in your Github Repo.

1. Go to Actions in your github repo

2. Look for **Sync Data Plans**

3. Select the dropdown **Run Workflow**

4. Select your desired branch and Click the **Run Workflow** button

The workflow will run in the following tasks in sequential order:

1. Checks your mPconfig for validity

2. Fetches your latest data plan

3. Generates an NPM Package.json file

4. Creates a Smartype Distribution based on your Data Plan

5. Publishes a Github NPM Package to your Smartype Hub's package repository

The resulting package name is based on your github owner account, the name of your repo, and your data plan id.

For example, if your github owner name is `octocat` and your Smartype Hub repo is called `my-smartype-project` and your Data Plan ID is `generic-data-plan`, your package will be:

```
@octocat/my-smartype-project-generic-data-plan
```

## Using a Smartype Hub Package

In any npm project,

1. Create/Copy the `.npmrc` file from your Smartype Hub repo into the root of your project

2. Run `npm install @<github-name>/<smartype-package-distribution>`

- For example, `npm install @octocat/my-smartype-project-generic-data-plan`

This will automatically update your `package.json` and add the latest version of your data plan to your project.

## Support

Questions? Give us a shout at <support@mparticle.com>

## License

This mParticle Web Kit is available under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0). See the LICENSE file for more info.
