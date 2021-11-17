const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate ({
      User, Employee, Service
    }) {
      Appointment.belongsTo(User, { onDelete: 'cascade', hooks: true })
      Appointment.belongsTo(Employee, { onDelete: 'cascade', hooks: true })
      Appointment.belongsTo(Service, { onDelete: 'cascade', hooks: true })
    }
  }

  const attributes = {
    time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  const options = {
    sequelize,
    modelName: 'Appointment'
  }
  Appointment.init(attributes, options)

  return Appointment
}
