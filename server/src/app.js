const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const url = 'mongodb://localhost:27017/';

app.post('/', function (req, res) {
    res.send(req.body);
    MongoClient.connect(url, function(err, client) {
      var db = client.db('Markdown');
      if (err) throw err;
      console.log("Switched to "+db.databaseName+" database");
      db.collection("documents").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("Document inserted");
          client.close();
      });
    });
});

app.get('/', function (req, res) {
  res.send('Hello World, you got /');
});

app.listen(process.env.PORT || 8081)