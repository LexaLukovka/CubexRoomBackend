const mongoose = require('mongoose')
const db = require('../../database/connect')
const Schema = mongoose.Schema

const SaveReservationSchema = new Schema({
  hall: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('SaveReservation', SaveReservationSchema)
