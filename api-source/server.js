const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();



app.use(express.static('public'))
require('dotenv').config();
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

// localhost
app.listen(port, function () {
  console.log(`listening on: http://localhost:${port}`)
})

