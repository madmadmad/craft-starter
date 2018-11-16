# Craft Starter
Setup for Forge.

## I. Installation
Replace all instances of `projectname` with the name you want to use for your project folder.

```
cd Documents/Sites
composer create-project madmadmad/craft-starter projectname
cd projectname
craft install
npm install
git init
git add .
git commit -m 'project created'
```

You can now add this project folder to tower! See below for instructions on deploying to forge.

## II. Versioning
There is a twig variable in the `_layout.html` file. Updating that variable will version bump all css and js.

## III. CSS

This setup uses PurifyCSS to remove unused CSS from the compiled file. This means **selectors not in a template or js file will be removed.** This can be problematic for developing content blocks in which classes are set by CMS properties. As a fix, there is a file called `_purifykeep.html` in the templates folder which can be used as a list of selectors that should not be purged.

### 1. SCSS Folder Structure

There are a two main folders for scss files, components and globals. This is somewhat arbitrary, mainly for organization. The important thing to note here is that **new files added to a folder are not compiled automatically.** To add a new component file, I will create the file, then import it on the list of all components. This gives you control over compile order.

```
scss/
  components/
    _component.scss  // an individual component, perhaps a specific block
    ...
    components.scss  // the list of all components to compile

  globals/
    _grid.scss  // all my global grid styles, etc.
    ...
    globals.scss  // the list of all components to compile

  main.scss  // compiles globals, then components, then some other random stuff
```

After all the scss is processed and compiled, grunt adds in all the third-party css files.

### 2. CPCSS
There is a second css file generated for control panel css. It compiles only the `main.scss` file in the control-panel directory.

### 3. CSS Lib

The following third-party style sheets are included in a lib directory for convenience. The files in css/lib must be moved to the third-party folder for use.

* [Animate](https://daneden.github.io/animate.css/)
* [Font Awesome](http://fontawesome.io/)

## IV. Javascript

This setup uses [loadjs](https://github.com/muicss/loadjs) to asynchronously load in js dependencies and trigger init functions. The loadjs script is included in the [head](https://github.com/madmadmad/parksmart/blob/master/templates/includes/global/head.html), and is available right away. The loadjs function is defined in the [scripts](https://github.com/madmadmad/parksmart/blob/master/templates/includes/global/scripts.html) include.

```
loadjs('/js/main.js?v=1.0', function() {
    initMain();

    if ($('#map').length) {
      loadjs(['https://maps.googleapis.com/maps/api/js?key=XXX', '/js/map.js?v=1.0'], function() {
        initMap();
      });
    }
  });
```

1. The loadjs function loads in the main js file, then triggers a callback function
2. The callback function calls `initMain()`, defined in [/public/js/main/init.js](https://github.com/madmadmad/parksmart/blob/master/public/js/main/init.js)
3. The callback function checks to see if a `#map` element exists on the page
4. If it does, a second loadjs function loads in the Google map api and the map js file, then triggers a callback function
5. The callback function calls `initMap()`, defined in [/public/js/map/init.js](https://github.com/madmadmad/parksmart/blob/master/public/js/map/init.js)

### 1. Grunt

Grunt compiles js files in bundles, so that we can separate out unique functionality like the map, from general functionality like nav and scroll animations. The folder structure looks like this:

```
js/
  main/
    dependencies/
      jquery.js
      wow.js
      ...
    init.js
  map/
    dependencies/
      ...
    init.js
```

And the grunt file looks like this:

```
uglify: {
  options: {
    mangle: false,
    beautify: false
  },
  scripts: {
    files: {
      'public/js/main.js': ['public/js/main/dependencies/*.js', 'public/js/main/init.js'],
      'public/js/map.js': ['public/js/map/dependencies/*.js', 'public/js/map/init.js']
    }
  }
},
```

### 2. JS Lib

The following third-party plugins are included in a lib directory for convenience. To add them to a bundle, you'll need to move them to a dependencies folder. Try to avoid dumping everything in the main bundle unless it will be loaded on every page.

* [imagesLoaded](http://imagesloaded.desandro.com/)
* [Isotope](http://isotope.metafizzy.co/)
* [FitVids](http://fitvidsjs.com/)
* [jQuery Flex Vertical Center](https://github.com/PaulSpr/jQuery-Flex-Vertical-Center)
* [matchHeight](http://brm.io/jquery-match-height/)
* [Sticky](http://stickyjs.com/)
* [Modernizr](https://modernizr.com/)
* [Owl Carousel](http://owlcarousel2.github.io/OwlCarousel2/)
* [Packery](http://isotope.metafizzy.co/layout-modes/packery.html)
* [Skippr](http://austenpayan.github.io/skippr/)
* [Tether (required by some Bootstrap components)](http://github.hubspot.com/tether/)
* [Transition (required by Zoom)](https://raw.githubusercontent.com/twbs/bootstrap/master/js/transition.js)
* [Wow](http://mynameismatthieu.com/WOW/)
* [Zoom](https://github.com/fat/zoom.js/tree/master)

## V. Email

This setup includes MJML for creating html emails.

## VI. Live Reload

Live reload is turned on by default and set to watch the main style and javascript files, as well as any .php files in the public folder. This will not watch template files in the craft folder.

## VII. Server Setup

### 1. Server Provisioning

1. Open [Forge](https://forge.laravel.com)
2. Create a new Linode server
3. Give it a name
4. Select a size
    - $5/mo for dev servers or CMS-less sites
    - $10/mo for basic Craft sites
    - $20/mo+ for heavy sites
5. Leave database name blank and install MariaDB
6. Create server (will take 10 minutes or so)

### 2. Repo Setup

1. Create a new private repo on the [madmadmad github account](https://github.com/madmadmad) with a readme.md
2. Copy the repo URL
3. Open Tower and clone the repo you just created into your Documents/Sites folder
4. Download a zip of the Forge blank project
5. Move those files into the new repo you cloned
6. Commit and push to github

### 3. App Deployment

1. Return to [Forge](https://forge.laravel.com)
2. Navigate to your provisioned server
3. Under active sites, select the default
4. At the bottom of the page, click the X to delete the default
5. Create a new site with your development url
6. Choose github as your source
7. Enter the repo path `madmadmad/yourproject` and set the branch to master
8. If desired, you can turn quick deploy on to deploy the site automatically on push
9. Point the DNS to the IP of your new server; yourproject.madmadmad.net dev domains can be created in [Hover](https://www.hover.com/control_panel/domains).

### 4. Database Creation

1. From the server admin panel on Forge, select the MySQL tab
2. Add a database with a custom username and password

#### a. Remote access

1. From the server admin panel on Forge, select the Network tab
2. Add a new firewall rule called `MYSQL` on port `3306` with your IP address

#### b. Database admin

1. Open Sequel Pro
2. Select the SSH option
3. Enter your connection credentials.
    - MySQL Host: `127.0.0.1`
    - Username: set above
    - Password: set above
    - SSH Host: server IP
    - SSH User: `forge`
    - SSH Password: root password emailed to you at time of server provisioning

**Note:** You do not have to enable remote access to connect to the database via Sequel Pro.

### 5. Paths, permissions and users

1. The server file path for forge is always
` /home/forge/your.site.url/public`

2. The server user is always `forge`

3. Public folder permissions set to `755`
