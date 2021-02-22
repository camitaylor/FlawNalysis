const express = require('express');
const app = express(); //create application from express
const mongoose = require('mongoose'); //get mongoose from modules
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const userInViews = require('./lib/middleware/userInViews');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


// getting credential to connect to db
username = process.env.USERNAME
password = process.env.PASSWORD
connectionString = `mongodb+srv://${username}:${password}@cluster0.d0ygw.mongodb.net/tickets?retryWrites=true&w=majority`
// port # from .env
port = process.env.PORT;

//add model Ticket
const Ticket = require('./models/ticket')


// connection to mongoDB
MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(client => {

  const db = client.db('capstone');
  const ticketsCollection = db.collection('tickets');
  console.log('connected to database');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(userInViews());
  app.use('/', authRouter);
  app.use('/', indexRouter);
  app.use('/', usersRouter);


  // Add all the CRUD here!

  // Get Methods
  app.get('/', (req, res) => {
    data = ticketsCollection.find().toArray();
    data.then(result => res.send(result))
      .catch(error => console.error(error));
  })

  app.get('/:id', (req, res) => {
    data = ticketsCollection.findOne(
      { id: req.body.id }
    );
    data.then(result => res.send(result))
      .catch(error => console.error(error));
  })

  // Post Method

  app.post('/', (req, res) => {
    data = ticketsCollection.insertOne(req.body);
    data.then(result => res.redirect('/'))
      .catch(error => console.error(error));
  })

  //Put Method

  app.put('/:id', (req, res) => {
    if (req.body.ticketDetails) {
      data = ticketsCollection.findOneAndUpdate(
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
    } else {
      data = ticketsCollection.findOneAndUpdate(
        { id: req.body.id },
        {
          $set: {
            assignedTo: req.body.assignedTo,
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
    }
  })

  //Delete Method
  app.delete('/:id', (req, res) => {
    data = ticketsCollection.deleteOne(
      {
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        requestedDate: req.body.requestedDate,
        assignedTo: req.body.assignedTo,
        ticketDetails: req.body.ticketDetails
      }
    )
    data.then(result => {
      if (result.deletedCount === 0) {
        return res.json('No ticket to delete')
      }
      res.json(`Ticket deleted`)
    })
      .catch(error => console.error(error))
  })


  // localhost
  app.listen(port, function () {
    console.log(`listening on: http://localhost:${port}`)
  })
})
  .catch(error => console.error(error))
