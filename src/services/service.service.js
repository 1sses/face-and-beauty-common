const { ServiceRepository } = require('../repository/service.repository')

class ServiceService {
  static async appendService (group, category, type, price) {
    await ServiceRepository.appendService(group, category, type, price)
  }

  static async getCategoriesByGroup (group) {
    const services = await ServiceRepository.getServicesByGroup(group)
    const result = new Set(services.map(service => service.category))
    return Array.from(result)
  }

  static async getAll () {
    return await ServiceRepository.getAll()
  }

  static async getAllGrouped () {
    const groups = ['Женский зал', 'Мужской зал', 'Детский зал', 'Окрашивание', 'Косметический зал', 'Маникюрный зал', 'Зал бровей']
    const data = []
    const services = await ServiceRepository.getAll()
    for (const group of groups) {
      const result = []
      const groupServices = services.filter(service => service.group === group)
      const categories = Array.from(new Set(groupServices.map(service => service.category)))
      categories.forEach(category => {
        result.push({
          name: category,
          types: groupServices
            .filter(service => service.category === category)
            .map(service => ({
              id: service.id,
              type: service.type,
              price: service.price
            }))
        })
      })
      data.push(result)
    }
    return data
  }

  static async updateService (id, group, category, type, price) {
    await ServiceRepository.updateService(id, group, category, type, price)
  }

  static async deleteService (id) {
    await ServiceRepository.deleteService(id)
  }
}

module.exports = { ServiceService: ServiceService }
