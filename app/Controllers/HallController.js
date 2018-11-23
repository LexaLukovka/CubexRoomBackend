const Hall = require('../Models/Hall')

class HallController {

  async index(request, response) {
    const halls = await Hall.find()

    return response.json({ halls })
  }

  async store() {
    const halls = [
      { hall: 'до 5', color: 'green' },
      { hall: 'до 10', color: 'red' },
      { hall: 'до 20', color: 'blue' },
      { hall: 'до 50', color: 'purple' }
    ]

    const hallBd = await Hall.find()

    hallBd.length === 0 &&
    halls.map(async object => {
      const newSave = new Hall({
        hall: object.hall,
        color: object.color
      })
      await newSave.save()
    })

    hallBd.length === 0 && console.log('Hall created')

    return
  }
}

module.exports = new HallController()
