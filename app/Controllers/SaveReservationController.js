const SaveReservation = require('../Models/SaveReservation')

class SaveReservationController {

  async index(request, response) {
    const save = await SaveReservation.find()

    return response.json({ save })
  }

  async store(request, response) {
    const data = request.body

    const saveReservation = await SaveReservation.find()
    const indexSelected = saveReservation.findIndex(dataItem =>
      dataItem.hall === data.hall &&
      dataItem.time === data.time &&
      dataItem.date === data.date)

    if (indexSelected > -1) {
      const indexUserSelected = saveReservation.findIndex(dataItem =>
        dataItem.hall === data.hall &&
        dataItem.time === data.time &&
        dataItem.date === data.calendar &&
        dataItem.userId === data.userId)

      if (indexUserSelected > -1) {
        const reservation = await SaveReservation.findOne({
          hall: data.hall,
          time: data.time,
          date: data.date,
          userId: data.userId
        })
        reservation.delete()
      }
    } else {
      const newSave = new SaveReservation({
        hall: data.hall,
        time: data.time,
        date: data.date,
        userId: data.userId,
      })

      await newSave.save()
    }

    const save = await SaveReservation.find()

    return response.json({ save })
  }
}

module.exports = new SaveReservationController()
