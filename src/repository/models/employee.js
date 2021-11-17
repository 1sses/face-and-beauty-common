const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate ({
      User, Appointment
    }) {
      Employee.belongsTo(User, { onDelete: 'cascade', hooks: true })
      Employee.hasMany(Appointment)
    }
  }

  const attributes = {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'barber'
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  const options = {
    sequelize,
    modelName: 'Employee'
  }
  Employee.init(attributes, options)

  return Employee
}
