const express = require('express')
const router = express.Router()
const SaveReservationController = require('../app/Controllers/SaveReservationController')

router.get('/save', SaveReservationController.index)
router.post('/save', SaveReservationController.store)

module.exports = router
