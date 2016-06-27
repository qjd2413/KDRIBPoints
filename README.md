[![Stories in Ready](https://badge.waffle.io/qjd2413/KDRIBPoints.png?label=ready&title=Ready)](https://waffle.io/qjd2413/KDRIBPoints)
# KDRIB Points
Points site for the Iota Beta chapter of Kappa Delta Rho

## Setup
1. Download [Node](https://nodejs.org/en/) and [Bower](http://bower.io/) (sorry)
2. Clone repository
3. Run `npm install` and `bower install` to install dependencies
4. Install gulp globally-- run `npm install -g gulp`
5. Create a [Google API](https://console.developers.google.com/apis/library) project
  - Select dropdown in top right, choose "Create New Project"
6. Click "Credentials" on the left, and create new OAuthClientID with authorized redirect uri `http://localhost:3000/oauth/google_callback`, take note of client id and secret.
7. Enable Google+ API (go to Overviews, and under the social section click "Google+", then enable)
8. Rename `config/template_google_config.js` to `config/google_config.js`
9. Replace information in `google_config.js` with your own information obtained in step 5
10. Run `gulp` to start the server

### Troubleshooting
Error | Solution
------|---------
`'gulp' is not recognized as an internal or external command, operable program or batch file.` | [StackOverflow's Answer](http://stackoverflow.com/questions/24027551/gulp-command-not-found-error-after-installing-gulp)

## File structure
```
KDRIBPoints
├── .bowerrc
├── .gitignore
├── .jshintrc
├── README.md
├── app
│   └── routers
│       └── oauth.js
├── bower.json
├── config
│   ├── config.js
│   ├── google_config.js
│   ├── mysql_config.js
│   ├── template_google_config.js
│   └── template_mysql_config.js
├── database
│   ├── setup_database.js
│   └── start_database.js
├── docs
│   ├── git_standards.md
│   ├── mysql_installer.md
│   └── points-requirements.md
├── gulpfile.js
├── index.js
├── models
│   └── brother.js
├── package.json
└── public
    ├── app
    │   └── app.module.js
    ├── css
    │   └── style.css
    └── index.html
```
