const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  posterId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('News', postSchema)