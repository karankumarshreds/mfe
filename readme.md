# Important points to note

## Bootstrap vs Index.js

When you are using the same module inside of more than one projects, you would want to share it.

The way you do that is adding in `shared: ['<module_name>']` property inside the webpack config.

**NOTE**: This causes the import of the module inside the product project to be asynchronous which will give an error if loaded directly.

So what we do is, we create a **bootstrap** file where we keep all our `index.js` file's code and import bootstrap inside our index.js. _This way it tells webpack to load all the imports/modules before sharing them across the browser_.

Further explanation <a href="https://webpack.js.org/concepts/module-federation/">here</a>

## Deployment

1. We want to deploy each microfrontend independently (including the container)
2. Location of child app remoteEntry.js files must be known at build time. (just the location, we will use it at the runtime only)
3. Need CICD for each service

## Caching issue

If we upload the latest code, we might not see it reflecting on the browser because of caching (cloudfront)

We can get rid of this using something called **invalidations** that can be configured from the cloudfront section on AWS.

It helps us tell Cloudfront to use latest version of certain files as soon as they are updated.

### [OR]

There is another way to get around it and that is to have a unique name (hash/version) of the file so that CDN treats it as a new file.

**CAVEAT** : You can use this for all your JS files using a hash values for their names. BUT you cannot do the same for your `index.html` file unfortunately. So the only solution for your index.html to show changes asap is to using the `invalidation` method only.

### Step 1

<p align="center"><img src="https://github.com/karankumarshreds/mfe/blob/master/diagrams/invalidation1.png" width="750"/></p>

### Step 2

Then simply add in the name of the file you want to invalidate.

<p align="center"><img src="https://github.com/karankumarshreds/mfe/blob/master/diagrams/invalidation2.png" width="600"/></p>

### [OR]

You can **automate** this using your action workflow (command line using aws-cli):

```yaml
- name: S3 invalidation for index.hmtl
  # gives access to aws cli
  uses: ItsKarma/aws-cli@v1.70.0
  with:
    args: cloudfront create-invalidation --distribution-id ${{ secrets.AWS_DISTRIBUTION_ID }} --paths "container/latest/index.html"
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_DEFAULT_REGION: 'ap-south-1'
```

<hr />

npm i -D webpack-cli @webpack-cli/serve
