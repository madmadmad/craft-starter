# Craft Starter
Setup for Forge.

## I. Installation
Replace all instances of `projectname` with the name you want to use for your project folder.

### Terminal

```
cd Documents/Sites
composer create-project madhouse/craft-starter projectname
cd projectname
npm install
git init
git add .
git commit -m 'project created'
```

### Github
Create a blank repo in github.

### Terminal
```
git remote add origin https://github.com/madmadmad/projectname.git
git push -u origin master
```

### Forge
At this point, you'll need to provision a server from Forge. Once the server is provisioned:
1. Create a database for your craft install to use. Write down the credentials.
2. On the network tab, create a MYSQL exception on port 3306 for the IP `24.52.113.58`

More Forge instructions available (here)[https://github.com/madmadmad/craft-starter/wiki/Forge-Server-Setup].

### Terminal
Return to terminal. You should be in the project folder.
```
./craft setup
```
This will install craft via command line. Use your server IP, database credentials, and the defaults to complete. 

### Forge
Create a new site on your server. In the site screen:

1. Click Git repository
2. Enter the path to the repo you created on github earlier. Make sure install composer dependencies is checked.
3. Install
4. Select Files > Edit Environment File
5. Copy the contents of the .env file in your local project. Update the environment and DB_SERVER (localhost).
6. Enable Quick Deploy, and then Deploy Now

### Domains
You'll need to set up your dev domain in homestead and in Hover.

More Homestead instructions available (here)[https://github.com/madmadmad/craft-starter/wiki/Using-Homestead].

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
