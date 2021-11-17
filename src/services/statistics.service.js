const { AppointmentRepository } = require('../repository/appointment.repository')
const { UserRepository } = require('../repository/user.repository')

class StatisticsService {
  static async getStatistics () {
    const orders = await AppointmentRepository.getAll()
    const stats = {}
    for (const order of orders) {
      const date = order.time.split('#')[0].split('.')
      date.shift()
      const key = date.join('.')

      if (key in stats) stats[key]++
      else stats[key] = 1
    }
    const usersCount = (await UserRepository.getAll()).length
    return { usersCount, stats }
  }
}

module.exports = { StatisticsService }
