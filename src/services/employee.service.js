const { EmployeeRepository } = require('../repository/employee.repository')
const { createUploadLink } = require('../helpers/auth/createUploadLink')

class EmployeeService {
  static async add (userId, name, position, photo) {
    await EmployeeRepository.add(userId, name, position, photo)
  }

  static async updateEmployeeInfo (id, name, position, photo) {
    await EmployeeRepository.updateEmployeeInfo(id, name, position, photo)
  }

  static async deleteEmployee (id) {
    await EmployeeRepository.deleteEmployee(id)
  }

  static async getEmployeeById (id) {
    return await EmployeeRepository.getEmployeeById(id)
  }

  static async getEmployees () {
    const employees = await EmployeeRepository.getEmployees()
    employees.forEach(employee => {
      employee.photo = createUploadLink(employee.photo)
    })
    return employees
  }
}

module.exports = { EmployeeService }
