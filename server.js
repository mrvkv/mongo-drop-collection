const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.delete('/collection', async (req, res) => {
  mongoose.connect('mongodb://localhost:27017/' + req.body.db, {useNewUrlParser: true })
  .then(async () => {
    try {
      let response = await mongoose.connection.db.dropCollection(req.body.collection);
      res.json(response);
    } catch(err) {
      console.log(err);
      res.json(err.message.toString());
    }
  }).catch((err) => {
    console.log(err);
    res.json(err.message.toString());
  })
});

app.listen(8000, () => console.log('server is listening at 8000...'));

module.exports = app;
