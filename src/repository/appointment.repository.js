const { Appointment, Employee, Service } = require('./models')

class AppointmentRepository {
  static async appendAuto (userId, serviceId, employeeId, time) {
    const employee = await Employee.findOne({ where: { id: employeeId }, include: Appointment })
    await employee.addAppointment(await Appointment.create({
      time,
      UserId: userId,
      ServiceId: serviceId
    }))
  }

  static async appendHard (serviceId, employeeId, time) {
    const employee = await Employee.findOne({ where: { id: employeeId }, include: Appointment })
    await employee.addAppointment(await Appointment.create({
      time,
      UserId: 0,
      ServiceId: serviceId
    }))
  }

  static async delete (id) {
    return await Appointment.destroy({ where: { id } })
  }

  static async getAll () {
    return await Appointment.findAll()
  }

  static async getEmployeeOrders (id) {
    return await Appointment.findAll({ where: { EmployeeId: id }, include: [Service] })
  }

  static async getUserOrders (userId) {
    return await Appointment.findAll({ where: { UserId: userId }, include: Service })
  }
}

module.exports = { AppointmentRepository }
