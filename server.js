const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
// getting credential to connect to db
username = process.env.USER
console.log(username)
password = process.env.PASSWORD
connectionString = `mongodb+srv://${username}:${password}@cluster0.d0ygw.mongodb.net/tickets?retryWrites=true&w=majority`
console.log(connectionString);
// port # from .env
port = process.env.PORT;

// connection to mongoDB
MongoClient.connect(connectionString,{useUnifiedTopology: true}) .then(client => {

  const db = client.db('capstone');
  const quotesCollections = db.collection('ticket');
  console.log('connected to database');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


// Add all the CRUD here!

  // Get Method
  app.get('/', (req, res) =>{
      data = db.collection('tickets').find().toArray();
      data.then(result => res.send(result));
  })


  // localhost
  app.listen(port, function() {
    console.log(`listening on: http://localhost:${port}`)
  })
})
.catch(error => console.error(error))
 