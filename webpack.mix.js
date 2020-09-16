let mix = require('laravel-mix');

// ? ========== DEVELOPMENT SETTINGS ==========
if(!mix.inProduction()){
  mix.setPublicPath('public/build/')
     .js("./src/js/app.js", "js")
     .sass("./src/scss/app.scss", 'css')
     .sourceMaps(true, 'source-map')
     
  // ? This sets up hot module reloading 
  // ? host 0.0.0.0 enables enables nitro to pick up the devserver
  mix.webpackConfig({
      output: {
        publicPath: "http://0.0.0.0:8080/",
      },
      devServer:{
        host: '0.0.0.0',
        port: 8080,
        sockHost: '0.0.0.0',
        sockPort: 8080,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      },
    });

  // ! Optional - disable this chunk if you don't want to run at localhost:3000
  // ? This sets up browsersync to refresh the page when html/twig changes
  // ? Webpack Dev Server does not listen to html/twig changes because it doesn't process them
  mix.browserSync({
    // ? Defined in the .env file - sameas default site url
    proxy: process.env.DEFAULT_SITE_URL,
    watch: true,
    watchOptions: {
      ignoreInitial: true,
      ignored: '*.css'
    },
    files: ['./templates'],
    ignore: "/node_modules/"
  });
  
} else {
  // ? ========== PRODUCTION SETTINGS ==========
  // ⬇️ Keeps component files in the correct folder.
  mix.webpackConfig({
    output: {
      chunkFilename: "js/components/[name].js",
    }
  });
  mix.setPublicPath('public/assets/dist')
    .js('./src/js/app.js', 'js')
    .sass('./src/scss/app.scss', 'css')
    .options({
      postCss: [
        require('autoprefixer')({
          grid: true,
        }),
      ],
    })
    .version()
}

// ? Disables system notifications on build
mix.disableNotifications();


// * Helpful Links
// * ===============

// * Laravel Mix Documentation
// * https://laravel-mix.com/docs/5.0/installation

// * Webpack Dev Server Documentation
// * https://webpack.js.org/configuration/dev-server/

// * Browsersync Docs / Options
// * https://www.browsersync.io/docs/options