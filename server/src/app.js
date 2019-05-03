const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const objectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const url = 'mongodb://localhost:27017/Markdown';

app.post('/save', function (req, res) {
  const doc = {
    name: req.body.name,
    content: req.body.content
  };
  res.send(req.body);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('documents').insertOne(doc, function(err, result) {
      assert.equal(null, err);
      console.log('Item ' + doc.name + ' inserted');
      db.close();
    });
  });
});

app.get('/', function (req, res) {
  res.send('Hello World, you got /');
});

app.get('/display', function (req, res) {
  const docArray = [];
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    const cursor = db.collection('documents').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      docArray.push(doc);
    }, function() {
      db.close();
      res.send(docArray);
    });
  });
});

app.post('/del', function (req, res) {
  const id = req.body.id
  res.send(req.body.id);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('documents').deleteOne({"_id": objectId(id) }, function(err, result) {
      assert.equal(null, err);
      console.log('Item ' + id + ' deleted');
      db.close();
    });
  });
});

app.post('/edit', function (req, res) {
  const doc = {
    name: req.body.name,
    content: req.body.content
  };
  const id = req.body.id
  res.send(req.body.id);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('documents').updateOne({"_id": objectId(id) }, {$set: doc}, function(err, result) {
      assert.equal(null, err);
      console.log('Item ' + id + ' edited');
      db.close();
    });
  });
});

app.listen(process.env.PORT || 8081)