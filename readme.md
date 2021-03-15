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
