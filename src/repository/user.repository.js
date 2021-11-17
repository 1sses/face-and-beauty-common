const { roles } = require('../constants/roles')
const { User } = require('./models')
const { Name } = require('./models')
const { Avatar } = require('./models')
// const { use } = require('bcrypt/promises')

class UserRepository {
  static async register (email, password, role = roles.USER) {
    return await User.create({
      email,
      password,
      role
    })
  }

  static async updateRole (id, role) {
    await User.update({ role }, { where: { id } })
  }

  static async isAvailableEmail (email) {
    const result = await User.findOne({ where: { email } })
    return !result
  }

  static async searchUserByEmail (email) {
    const result = await User.findOne({ where: { email } })
    return result?.dataValues
  }

  static async searchUserById (id) {
    const result = await User.findOne({ where: { id } })
    return result?.dataValues
  }

  static async activateUser (link) {
    const user = await User.findOne({ where: { activationLink: link } })
    if (user) {
      user.isActivated = true
      user.activationLink = null
      await user.save()
    }
  }

  static async getUserRoleById (userId) {
    const user = await User.findOne({ where: { id: userId } })
    return user?.dataValues?.role
  }

  static async changeAvatarUrl (userId, path) {
    const user = await User.findOne({ where: { id: userId }, include: Avatar })
    await user.setAvatar(await Avatar.create({ avatarUrl: path }))
    await Avatar.destroy({ where: { UserId: null } })
  }

  static async changeName (userId, name) {
    const user = await User.findOne({ where: { id: userId }, include: Name })
    await user.setName(await Name.create({ name }))
    await Name.destroy({ where: { UserId: null } })
  }

  static async changeEmail (userId, email) {
    await User.update({ email }, { where: { id: userId } })
  }

  static async changePassword (userId, password) {
    await User.update({ password }, { where: { id: userId } })
  }

  static async changeRole (userId, role) {
    await User.update({ role }, { where: { id: userId } })
  }

  static async getUserDataById (id) {
    const result = await User.findOne({ where: { id }, include: [Name, Avatar] })
    return result?.dataValues
  }

  static async getAll () {
    return await User.findAll()
  }
}

module.exports = {
  UserRepository
}
