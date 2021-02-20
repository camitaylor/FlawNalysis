const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("bson-objectid");
// const ticket = require('../models/ticket');
require('dotenv').config();
// getting credential to connect to db
username = process.env.USER
password = process.env.PASSWORD
connectionString = `mongodb+srv://${username}:${password}@cluster0.d0ygw.mongodb.net/tickets?retryWrites=true&w=majority`
// port # from .env


// connection to mongoDB
MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(client => {

  const db = client.db('capstone');
  const ticketsCollections = db.collection('tickets');
  console.log('connected to database');

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));


  // Add all the CRUD here!

  // Get Methods
  router.get('/', (req, res) => {
    data = db.collection('tickets').find().toArray();
    data.then(result => res.send(result))
      .catch(error => console.error(error));
  })
  router.get('/:id', (req, res) => {
    id = req.params.id
    o_id = ObjectID(`${id}`)
    data = db.collection('tickets').findOne({ _id: o_id });
    data.then(result => res.send(result))
      .catch(error => console.error(error));
  })
  // Post Method

  router.post('/', (req, res) => {
    data = db.collection('tickets').insertOne(req.body);
    data.then(result => res.redirect(301, '/'))
      .catch(error => console.error(error));
  })

  //Put Method

  router.put('/:id', (req, res) => {
    data = db.collection('tickets').findOneAndUpdate(
      { id: req.body.id },
      {
        $set: {
          assignedTo: req.body.assignedTo,
          ticketDetails: req.body.ticketDetails
        }
      },
      {
        upsert: true
      }
    )
    data.then(result => {
      res.json('Ticket updated')
    })
      .catch(error => console.error(error))
  })

  //Delete Method
  router.delete('/:id', (req, res) => {
    id = req.params.id
    o_id = ObjectID(`${id}`)
    console.log(o_id)
    db.collection('tickets').deleteOne({ _id: o_id })
    .then(result => {
        if (result.deletedCount === 0) {
          return res.json('ticket not found')
        }
        res.json(`deleted`)
      })
      .catch(error => console.error(error))
  })
})
  .catch(error => console.error(error))

module.exports = router