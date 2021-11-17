const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate () { }
  }

  const attributes = {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  const options = {
    sequelize,
    modelName: 'Message'
  }
  Message.init(attributes, options)

  return Message
}
