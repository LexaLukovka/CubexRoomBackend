const express = require('express')
const router = express.Router()
const HallController = require('../app/Controllers/HallController')

router.get('/hall', HallController.index)

module.exports = router
