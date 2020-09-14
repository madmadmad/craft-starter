# Craft Nitro + Laravel Mix

Laravel Mix is a frontend build tool that utilizes Webpack under the hood to process and bundle CSS and JavaScript (and more, if you want). Laravel Mix is in no way coupled to Craft Nitro, but this setup is configured specifically to work with Nitro. 

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

3. (Optional) Browserync proxies the development site, delivering it through `localhost:3000` and listens for any changes to our templates. Upon change, the browser refreshes. Browserync can listen for CSS/JS changes as well, but does not inject JS the same way WDS can. Another benefit of Browserync is that it exposes your local site to other devices on the network, allowing you to view the site on your phone or a coworkers computer. As you'd guess, the view is synced, so as one device scrolls, the other device follows.

#### Production

1. JavaScript and CSS are minified and versioned to allow for easy caching and cache-busting. No more v-bumps. CSS is autoprefixed at this stage. 
2. Vendor folders are extracted 