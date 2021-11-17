const { Service } = require('./models')

class ServiceRepository {
  static async appendService (group, category, type, price) {
    return await Service.create({
      group,
      category,
      type,
      price
    })
  }

  static async getServicesByGroup (group) {
    return await Service.findAll({ where: { group } })
  }

  static async getAll () {
    return await Service.findAll()
  }

  static async updateService (id, group, category, type, price) {
    return await Service.update({ group, category, type, price }, { where: { id } })
  }

  static async deleteService (id) {
    return await Service.destroy({ where: { id } })
  }
}

module.exports = { ServiceRepository: ServiceRepository }
