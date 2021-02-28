const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv');
const path = require('path');
require('dotenv').config();
dotenv.config();
const { auth, requiresAuth } = require('express-openid-connect');
app.use('/static', express.static('public'))
const ejs = require('ejs');
app.set('view engine', 'ejs')
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID, 
    secret: process.env.SECRET,
  })
);

// app.use(express.static('public'))

// if this file is hosted (Heroku), use the port number they provide, otherwise use port 8080 (will default here for local hosting)
port = process.env.PORT || 3000;
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// move routing to an external file to keep things organized
const tickets = require('./tickets-router.js');
const { env } = require('process');
app.use('/tickets', tickets)
// create a webserver so we can listen for requests
app.get('/',(req, res)=>{
  if(req.oidc.isAuthenticated()){
    let status = `<a href="/profile">${req.oidc.user.name}</a>`
    res.render("index.ejs", {loginStatus:status});
  }
  else{
    let status = `<a href="/login"><span class="glyphicon glyphicon-log-in"></span> login</a>`
    res.render("index.ejs", {loginStatus: status});
  }
})

app.get('/static/dashboard.html', requiresAuth(),(req, res)=>{
  let status = `<a href="/profile">${req.oidc.user.name}</a>`
  res.render("dashboard.ejs", {loginStatus:status});
})



app.get('/static/confirmation.html', requiresAuth(),(req, res)=>{
  res.render("confirmation.ejs")
})

app.get('/static/ticketForm.html', requiresAuth(),(req, res)=>{

  res.render("ticketForm.ejs")
})
app.get('/static/updateTicket.html', requiresAuth(),(req, res)=>{

  res.render("updateTicket.ejs")
})

app.get('/profile', requiresAuth(),(req, res)=>{
  res.render("profile.ejs", {user: req.oidc.user, pic: req.oidc.user.picture})
})
// localhost
app.listen(port, function () {
  console.log(`listening on: http://localhost:${port}`)
})

