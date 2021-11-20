const { AppointmentService } = require('../services/appointment.service')
const { answers } = require('../constants/answers')
const { EmployeeService } = require('../services/employee.service')

class AppointmentController {
  static async appendAuto (ctx) {
    const { userId } = ctx.request
    const { serviceId, time } = ctx.request.body
    try {
      await AppointmentService.appendAuto(userId, serviceId, time)
      ctx.body = { message: answers.success.create.appointment }
    } catch (e) {
      ctx.body = { error: answers.error.unableAppendOrder }
    }
  }

  static async appendHard (ctx) {
    const { serviceId, time } = ctx.request.body
    try {
      await AppointmentService.appendHard(serviceId, time)
      ctx.body = { message: answers.success.create.appointment }
    } catch (e) {
      ctx.body = { error: answers.error.unableAppendOrder }
    }
  }

  static async current (ctx) {
    const currentAppointments = await AppointmentService.current()
    const barbers = (await EmployeeService.getEmployees()).filter(employee => employee.User.role === 'barber')
    ctx.body = { appointments: currentAppointments, employeeCount: barbers.length }
  }

  static async delete (ctx) {
    const { id } = ctx.request.body
    await AppointmentService.delete(id)
    ctx.body = { message: answers.success.delete.appointment }
  }

  static async getEmployeeOrders (ctx) {
    const { userId } = ctx.request
    const { employeeId, type } = ctx.request.body
    ctx.body = await AppointmentService.getEmployeeOrders(userId, employeeId, type)
  }

  static async getUserOrders (ctx) {
    const { userId } = ctx.request
    ctx.body = await AppointmentService.getUserOrders(userId)
  }

  static async getAll (ctx) {
    ctx.body = await AppointmentService.getAll()
  }
}

module.exports = { AppointmentController }
