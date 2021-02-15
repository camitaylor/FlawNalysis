const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
// getting credential to connect to db
username = process.env.USERNAME
password = process.env.PASSWORD
connectionString = `mongodb+srv://${username}:${password}@cluster0.d0ygw.mongodb.net/tickets?retryWrites=true&w=majority`
// port # from .env
port = process.env.PORT;

// connection to mongoDB
MongoClient.connect(connectionString,{useUnifiedTopology: true}) .then(client => {

  const db = client.db('capstone');
  const ticketsCollections = db.collection('tickets');
  console.log('connected to database');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


// Add all the CRUD here!

  // Get Method
  app.get('/', (req, res) =>{
      data = db.collection('tickets').find().toArray();
      data.then(result => res.send(result));
  }) 


  // Post Method

app.post('/tickets', (req, res) => {
  data = db.collection('tickets').insertOne(req.body);
  data.then(result => res.redirect('/'));
})

//Put Method
/*app.put('/tickets', (req, res) => {
    ticketsCollection.findOneAndUpdate(
        {id: ''},
        {
            $set: {
                problem: req.body.problem,
                status: req.body.status
            }
        },
        {
            upsert: true
        }
    )
      .then(result => {
        res.json('No ticket to update')
       })
      .catch(error => console.error(error))
})  

//Delete Method
app.delete('/tickets', (req, res) => {
    ticketsCollection.deleteOne(
      { problem: req.body.problem }
    )
      .then(result => {
        if (result.deletedCount === 0) {
            return res.json('No ticket to delete')
          }
          res.json(`Ticket deleted`)
        })
        .catch(error => console.error(error))
}) */


  // localhost
  app.listen(port, function() {
    console.log(`listening on: http://localhost:${port}`)
  })
})
.catch(error => console.error(error))
