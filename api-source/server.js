const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//add model Ticket
const Ticket = require('../models/ticket')
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const strategy = new Auth0Strategy(
  {
    domain: 'dev-osgtgiht.us.auth0.com',
    clientID: 'K4vCyv0K91Sw7PxLoNSVTmj9e574eMdB',
    clientSecret: 'Q7KRrDoCRO-eSTItS64cgE-Do6yKpkDhkSMK81FjjavahhPVMiVr-UUAO3zd3yG_',
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },



// const strategy = new Auth0Strategy(
//   {
//     domain: process.env.AUTH0_DOMAIN,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     clientSecret: process.env.AUTH0_CLIENT_SECRET,
//     callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
//   },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

    const config = {
        authRequired: false,
        auth0Logout: true,
        secret: 'Q7KRrDoCRO-eSTItS64cgE-Do6yKpkDhkSMK81FjjavahhPVMiVr-UUAO3zd3yG_',
        baseURL: 'http://localhost:3000',
        clientID: 'K4vCyv0K91Sw7PxLoNSVTmj9e574eMdB',
        issuerBaseURL: 'https://dev-osgtgiht.us.auth0.com'
      };
      const sess = {
          secret: 'Q7KRrDoCRO-eSTItS64cgE-Do6yKpkDhkSMK81FjjavahhPVMiVr-UUAO3zd3yG_',
          cookie: {},
          resave: false,
          saveUninitialized: true
        };

    
     
        passport.serializeUser(function (user, done) {
            done(null, user);
          });
          
          passport.deserializeUser(function (user, done) {
            done(null, user);
          });

app.use(express.static('public'))
require('dotenv').config();
// if this file is hosted (Heroku), use the port number they provide, otherwise use port 8080 (will default here for local hosting)
port = process.env.PORT || 8080;
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// move routing to an external file to keep things organized
const tickets = require('./tickets-router.js')
app.use('/tickets', tickets)
    // create a webserver so we can listen for requests

// localhost
app.listen(port, function() {
    console.log(`listening on: http://localhost:${port}`)
})




  if (app.get('env') === 'production') {
    // Use secure cookies in production (requires SSL/TLS)
    sess.cookie.secure = true;

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.use(session(sess));
passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());
  }