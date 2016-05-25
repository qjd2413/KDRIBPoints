# KDRIB Points
Points site for the Iota Beta chapter of Kappa Delta Rho

## Setup
1. Download [Node](https://nodejs.org/en/) and [Bower](http://bower.io/) (sorry)
2. Clone repository
3. Run `npm install` and `bower install` to install dependencies
4. Create a [Google API](https://console.developers.google.com/apis/library) project
5. Create new credentials [here](https://console.developers.google.com/apis/credentials) with authorized redirect uri `http://localhost:3000/oauth/google_callback`, take note of client id and secret.
6. Enable Google+ API
7. Rename `config/template_google_config.js` to `config/google_config.js`
8. Replace information in `google_config.js` with your own information obtained in step 5
9. Run `gulp` to start the server
