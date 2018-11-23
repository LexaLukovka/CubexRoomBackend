const mongoose = require('mongoose')
const db = require('../../database/connect')
const Schema = mongoose.Schema

const HallSchema = new Schema({
  hall: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Hall', HallSchema)
