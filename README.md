# Craft Starter
Setup for Forge.

## I. Installation
Replace all instances of `projectname` with the name you want to use for your project folder.

```
cd Documents/Sites
composer create-project madhouse/craft-starter projectname
cd projectname
npm install
git init
git add .
git commit -m 'project created'
```

Next, you can install craft via command line, or in the browser. You'll need a Forge server & database created before installation, see those instructions below.

```
craft install
```


## II. Versioning
There is a twig variable in the `_layout.html` file. Updating that variable will version bump all css and js.

## III. CSS

This setup uses [PurifyCSS](https://github.com/purifycss/grunt-purifycss) to remove unused CSS from the compiled file. Read more about the [CSS setup](https://github.com/madmadmad/craft-starter/wiki/CSS) for the project.

## IV. Javascript

This setup uses [loadjs](https://github.com/muicss/loadjs) to asynchronously load in js dependencies and trigger init functions. Read more about the [CSS setup](https://github.com/madmadmad/craft-starter/wiki/CSS) for the project.

## V. Email

This setup includes [MJML](https://mjml.io/) for creating html emails. More documentation coming soon.

## VI. Live Reload

Live reload is turned on by default and set to watch the main style and javascript files, as well as any .html files in the templates folder.

## VII. Server Setup

This setup is configured to work with Forge deployment. Read more about [setting up a new server](https://github.com/madmadmad/craft-starter/wiki/Forge-Server-Setup) through Forge.
