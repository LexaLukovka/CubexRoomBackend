const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')

const HallController = require('./app/Controllers/HallController')

const authRoutes = require('./routes/auth')
const hallRoutes = require('./routes/hall')
const saveRoutes = require('./routes/saveReservation')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(fileUpload())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'))
app.use(passport.initialize())

app.use('/', authRoutes)
app.use('/', hallRoutes)
app.use('/', saveRoutes)


app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
});

(function() {HallController.store()}())


module.exports = app
