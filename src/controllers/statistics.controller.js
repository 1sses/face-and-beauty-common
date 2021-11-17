const { StatisticsService } = require('../services/statistics.service')

class StatisticsController {
  static async getStatistics (ctx) {
    ctx.body = await StatisticsService.getStatistics()
  }
}

module.exports = { StatisticsController }
