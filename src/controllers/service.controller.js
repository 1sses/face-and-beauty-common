const { ServiceService } = require('../services/service.service')
const { answers } = require('../constants/answers')

class ServiceController {
  static async appendService (ctx) {
    const { group, category, type, price } = ctx.request.body
    await ServiceService.appendService(group, category, type, price)
    ctx.body = { message: answers.success.create.service }
  }

  static async getCategoriesByGroup (ctx) {
    const { group } = ctx.request.body
    ctx.body = await ServiceService.getCategoriesByGroup(group)
  }

  static async getAllGrouped (ctx) {
    ctx.body = await ServiceService.getAllGrouped()
  }

  static async getAll (ctx) {
    ctx.body = await ServiceService.getAll()
  }

  static async updateService (ctx) {
    const { id, group, category, type, price } = ctx.request.body
    await ServiceService.updateService(id, group, category, type, price)
    ctx.body = { message: answers.success.update.service }
  }

  static async deleteService (ctx) {
    const { id } = ctx.request.body
    await ServiceService.deleteService(id)
    ctx.body = { message: answers.success.delete.service }
  }
}

module.exports = { ServiceController: ServiceController }
