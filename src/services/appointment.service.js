const { AppointmentRepository } = require('../repository/appointment.repository')
const { EmployeeRepository } = require('../repository/employee.repository')

class AppointmentService {
  static toMs (x) {
    const date = x.split('#')[0].split('.')
    const time = x.split('#')[1].split(':')
    return new Date(+date[2], +date[1] - 1, +date[0], +time[0] + 3, +time[1])
  }

  static async appendAuto (userId, serviceId, time) {
    const barbers = (await EmployeeRepository.getEmployees())
      .filter(employee => employee.User.role === 'barber')
      .filter(employee => !employee.Appointments.find(order => order.time === time)) // фильтрация по свободности, вроде работает
    const rand = Math.floor(Math.random() * barbers.length)
    const employeeId = barbers.map(barber => barber.id)[rand]
    await AppointmentRepository.appendAuto(userId, serviceId, employeeId, time)
  }

  static async appendHard (serviceId, time) {
    const barbers = (await EmployeeRepository.getEmployees())
      .filter(employee => employee.User.role === 'barber')
      .filter(employee => !employee.Appointments.find(order => order.time === time)) // фильтрация по свободности, вроде работает
    const rand = Math.floor(Math.random() * barbers.length)
    const employeeId = barbers.map(barber => barber.id)[rand]
    await AppointmentRepository.appendHard(serviceId, employeeId, time)
  }

  static async current () {
    const allAppointments = await AppointmentRepository.getAll()
    const now = new Date()
    return await allAppointments.filter(order => this.toMs(order.time) >= now)
  }

  static async delete (id) {
    await AppointmentRepository.delete(id)
  }

  static async getAll () {
    return await AppointmentRepository.getAll()
  }

  static async getEmployeeOrders (userId, employeeId, type) {
    const now = new Date()
    if (type === 'barber') {
      return (await AppointmentRepository.getEmployeeOrders(userId))
        .filter(order => this.toMs(order.time) >= now)
    } else {
      return (await AppointmentRepository.getEmployeeOrders(employeeId))
        .filter(order => this.toMs(order.time) >= now)
    }
  }

  static async getUserOrders (userId) {
    const now = new Date()
    return (await AppointmentRepository.getUserOrders(userId))
      .filter(order => this.toMs(order.time) >= now)
  }
}

module.exports = { AppointmentService }
