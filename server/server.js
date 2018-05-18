const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const config = require('./config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())

const db = {};
mongoose.connect('mongodb://localhost:27017/connected', function() { /* dummy function */ })
    .then(() => {
      console.log('Connected to database');
    })
    .catch(err => { // mongoose connection error will be handled here
        console.error('Coudld not connect to database');
        process.exit(1);
    });

routes(app)

//clear db
const News = require('./models/News')
async function rmv () {
  await News.remove()
}
// rmv()


app.listen(config.port, () => {
  console.log('Server started on port ' + config.port);
});