const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3030',
    clientID: 'rQZ4iV2xurrivWgI3XcSQ0rQZXLOBKa0',
    issuerBaseURL: 'https://dev-xjkn9jyv.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// requiresAuth checks for valid user session and redirects to login if not valid
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
