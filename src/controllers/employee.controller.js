const { EmployeeService } = require('../services/employee.service')
const { answers } = require('../constants/answers')
const { UserService } = require('../services/user.service')
const { createUploadLink } = require('../helpers/auth/createUploadLink')

class EmployeeController {
  static async adding (ctx) {
    const { name, position, email, role } = JSON.parse(ctx.request.body.data)
    const photo = ctx.file?.path
    const user = await UserService.getUserByEmail(email)
    if (user) {
      await UserService.changeRole(user.id, role)
      await EmployeeService.add(user.id, name, position, photo)
      ctx.body = { message: answers.success.create.employee }
    } else {
      ctx.body = { error: answers.error.nonExistentEmail }
    }
  }

  static async updateEmployeeInfo (ctx) {
    const { id, name, position, email, role } = JSON.parse(ctx.request.body.data)
    const photo = ctx.file?.path
    const user = await UserService.getUserByEmail(email)
    await UserService.changeRole(user.id, role)
    await EmployeeService.updateEmployeeInfo(id, name, position, photo)
    ctx.body = { message: answers.success.update.employee }
  }

  static async deleteEmployee (ctx) {
    const { id, email } = ctx.request.body
    await EmployeeService.deleteEmployee(id)
    const user = await UserService.getUserByEmail(email)
    await UserService.changeRole(user.id, 'user')
    ctx.body = { message: answers.success.delete.employee }
  }

  static async getEmployeeById (ctx) {
    const { id } = ctx.request.body
    const employee = await EmployeeService.getEmployeeById(id)
    ctx.body = {
      ...employee,
      photo: createUploadLink(employee.photo),
      email: employee.User.email,
      role: employee.User.role
    }
  }

  static async getEmployees (ctx) {
    ctx.body = await EmployeeService.getEmployees()
  }
}

module.exports = { EmployeeController }
