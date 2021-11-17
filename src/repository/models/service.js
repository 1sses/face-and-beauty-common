const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate ({
      Appointment
    }) {
      Service.hasOne(Appointment)
    }
  }

  const attributes = {
    group: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  const options = {
    sequelize,
    modelName: 'Service'
  }
  Service.init(attributes, options)

  return Service
}
