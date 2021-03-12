# Craft Nitro + Laravel Mix

Laravel Mix is a frontend build tool that utilizes Webpack under the hood to process and bundle CSS and JavaScript (and more, if you want). Laravel Mix is in no way coupled to Craft Nitro, but this setup is configured specifically to work with Nitro. 

## Sections
- [Laravel Mix](#laravel-mix)


## Quickstart

#### Composer
`composer install`

#### NPM
`npm install` or `yarn`

#### Nitro
`nitro add`

    Host: `<example>.test`
    Root: `public`

`nitro db add`


#### .env

Make sure your .env file is up to date with your local database name and credentials.

#### Craft App ID & Security Key Generation
`./craft setup/app-id && ./craft setup/security-key`

### Fire it Up

`npm run dev` or `yarn dev`

# [Laravel Mix](#laravel-mix)

## Technologies Utilized

- Laravel Mix (Webpack)
- Webpack Dev Server (for Hot Module Reloading)
- Twigpack (Craft CMS plugin)

## Folder Structure and What to Look For

### Input Files

`src/*`

Files to be edited are in the `src` directory of the project root. 

### Output Files

- Development

  Development files get saved to `public/build` See "Development Caveats" below for more details.
  
- Production

  Production bundles are saved to `public/assets/dist/`


#### Why 2 Outputs?

Having two separate build processes allows for more efficient handling of files. It doesn't make sense to autoprefix the CSS in development just as it doesn't make sense to have hot module reloading in production.

#### Development Caveats

The output of the Development build process is unique because of its utilization of Webpack Dev Server. Unlike Grunt or Gulp, Webpack Dev Server actually spins up its own Node server to listen for and process file changes. *Everything lives in memory.* This keeps things really fast but it also means that files are not actually written anywhere.

#### Hot Module Reloading

Hot Module Reloading, part of Webpack Dev Server, listens for changes to files, finds the diff of those changes, and injects that diff into the page, without refreshing the page. This applies to _both_ CSS and JavaScript. 


## How Does It Work?

This Laravel Mix configuration has two modes, as hinted at above:
  1. Development
  2. Production

In both instances, Mix outputs a `manifest.json` file, which is a complete listing of all files that have been created by the build process. This is where **Twigpack** comes in. Twigpack references the `manfiest,json` to know where to find the specific files. Instead of putting an absolute path to a CSS or JS file in the templates, we use a Twigpack tag indicating what filename we want to look for. e.g. `{{ craft.twigpack.includeJsModule("/js/app.js") }}`. 

#### Development

1. The Development configuration process our JavaScript from `./src/js/app.js` and also handles our SCSS in `./src/scss/app.scss`. Source maps are built for each for a better development and debugging experience. 

2. A Webpack Dev Server (WDS) is initialized and works behind the scenes to provide Hot Module Reloading - file diff injection mentioned earlier. **Note:** since WDS does not touch our template files, it cannot inject or reload pages upon template changes. 

3. (Optional) Browserync proxies the development site, delivering it through `localhost:3000` and listens for any changes to our templates. Upon change, the browser refreshes. Browsersync can listen for CSS/JS changes as well, but does not inject JS the same way WDS can. Another benefit of Browserync is that it exposes your local site to other devices on the network, allowing you to view the site on your phone or a coworkers computer. As you'd guess, the view is synced, so as one device scrolls, the other device follows.

#### Production

1. JavaScript and CSS are minified and versioned to allow for easy caching and cache-busting. No more v-bumps. CSS is autoprefixed at this stage. 

#### `Concurrently`

`Concurrently` is a package used in this build setup to compile development and production builds at the same time. This means you don't have to swap between npm scripts or remember to run a production build before committing. 

## JavaScript and NPM

Instead of downloading JavaScript libraries and including them manually into the project folder or including them from a CDN in a `<script>` tag, libraries should now be installed via NPM and imported in the appropraite src JS file. (e.g. `app.js` if it's a global library or within a component js file if it's specific to a page or section of the site.)

Most modern JS libraries include instruction for installing via NPM/Yarn. 

## Code Splitting

Our previous setup involved putting all of our vendor libraries into a vendor folder and compiling everything into a single JS file. This lead to large file sizes and the loading of libraries onto pages that did not require them. 

This setup comes with Babel's dynamic-import plugin that allows us to conditionally import a JS file. 

Here's an example: 

```js
// src/js/app.js

if (document.getElementById("slider-example")) {
  import(/* webpackChunkName: "SliderExample" */"./components/sliderExample").then(initSliderExample => {
    initSliderExample();
  });
}

// src/js/components/sliderExample.js

import Swiper from 'swiper';


const initSliderExample = () => {
  console.log('Hello from the slider example!');
  const swiper = new Swiper(...);
}

export default initSliderExample();

```

In this example, in `app.js` we're first checking if an element with the provided selector exists on the page and if so, loads the provided file `components/sliderExample.js`.

In `components/sliderExample.js` we import any necessary libraries and then setup a function where all of the logic will go. Finally, the function is exported. 

A few things to note here: 
- This utilizes Promises under the hood, so browsers that do not support Promises natively (IE, etc) need to be polyfilled. 
- The magic comment `webpackChunkName:` allows us to name this import, which is what the filename will be for the chunk. You can name these whatever you want. 

### Dynamic Imports and `Mix.extract()`

Laravel Mix provides an `extract()` method which automatically separates the custom JavaScript from the vendor files (anything that gets imported). This is a nice feature as it allows for better caching, but it doesn't work so well with the dynamic-import approach mentioned previously. This is because the `mix.extract()` method will automatically pull out any imported vendor files, whether they're behind a conditional or not. This means we don't get any of the performance benefits from dynamically including imports.

### Asset Versioning

With the `version()` method (found in the production config settings), a hash ID is appended to the bundled file in the manifest. Any time a file changes the file hash gets updated. Think of it like an automatic version bump.

## Twigpack

The Craft plugin Twigpack is used to pull in the asset bundles by referencing the mix-manifest.json file that Mix outputs. This makes it convenient to switch between environments by not having to worry about the correct path or location of assets.

See it in action in `templates/_includes/global/head.twig` or view the [documentation](https://nystudio107.com/docs/twigpack).
