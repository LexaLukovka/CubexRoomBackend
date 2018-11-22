const jwt = require('jsonwebtoken')
const config = require('../../config/database')
const { validate } = require('../Validators/Validator')
const LoginValidator = require('../Validators/LoginUser')
const RegisterValidator = require('../Validators/RegisterUser')
const User = require('../Models/User')

class AuthController {

  async login(request, response) {
    const [err, data] = await validate(request.body, LoginValidator)
    if (err) return response.status(401).json(err)

    const user = await User.findOne({ email: data.email })
    const token = jwt.sign(user, config.secret)

    return response.json({ token })
  }

  async register(request, response) {
    const [err, data] = await validate(request.body, RegisterValidator)
    if (err) return response.status(401).json(err)

    const newUser = new User({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    })

    const user = await newUser.save()

    const token = jwt.sign(user, config.secret)
    return response.json({ token })

  }
}

module.exports = new AuthController()
