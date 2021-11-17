const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ActivationToken extends Model {
    static associate ({
      User
    }) {
      ActivationToken.belongsTo(User, { onDelete: 'cascade', hooks: true })
    }
  }

  const attributes = {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  const options = {
    sequelize,
    modelName: 'ActivationToken'
  }
  ActivationToken.init(attributes, options)

  return ActivationToken
}
