const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    static associate ({
      User
    }) {
      Avatar.belongsTo(User, { onDelete: 'cascade', hooks: true })
    }
  }

  const attributes = {
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  const options = {
    sequelize,
    modelName: 'Avatar'
  }
  Avatar.init(attributes, options)

  return Avatar
}
