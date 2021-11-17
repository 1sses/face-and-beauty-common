const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate ({
      Avatar, Name, ActivationToken, Employee, Appointment
    }) {
      User.hasOne(Avatar)
      User.hasOne(Name)
      User.hasOne(ActivationToken)
      User.hasOne(Employee)
      User.hasMany(Appointment)
    }
  }

  const attributes = {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  }
  const options = {
    sequelize,
    modelName: 'User'
  }
  User.init(attributes, options)

  return User
}
