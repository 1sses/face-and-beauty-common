const { Employee, User, Appointment } = require('./models')

class EmployeeRepository {
  static async add (userId, name, position, photo) {
    return await Employee.create({
      UserId: userId,
      name,
      position,
      photo
    })
  }

  static async updateEmployeeInfo (id, name, position, photo) {
    if (photo) await Employee.update({ name, position, photo }, { where: { id } })
    else await Employee.update({ name, position }, { where: { id } })
  }

  static async deleteEmployee (id) {
    return await Employee.destroy({ where: { id } })
  }

  static async getEmployeeById (id) {
    const result = await Employee.findOne({ where: { id }, include: User })
    return result.dataValues
  }

  static async getEmployees () {
    return await Employee.findAll({ include: [User, Appointment] })
  }
}

module.exports = { EmployeeRepository }
