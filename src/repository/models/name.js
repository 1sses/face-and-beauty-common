const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Name extends Model {
    static associate ({
      User
    }) {
      Name.belongsTo(User, { onDelete: 'cascade', hooks: true })
    }
  }

  const attributes = {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  const options = {
    sequelize,
    modelName: 'Name'
  }
  Name.init(attributes, options)

  return Name
}
