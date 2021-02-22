// const { auth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'There is no war in Ba Sing Se',
//   baseURL: 'http://localhost:3000',
//   clientID: 'K4vCyv0K91Sw7PxLoNSVTmj9e574eMdB',
//   issuerBaseURL: 'https://dev-osgtgiht.us.auth0.com'
// };

// const { requiresAuth } = require('express-openid-connect');

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// const { requiresAuth } = require('express-openid-connect');

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });
// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });