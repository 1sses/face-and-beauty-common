const { UserRepository } = require('../repository/user.repository')
const { PasswordService } = require('./password.service')
const { createUploadLink } = require('../helpers/auth/createUploadLink')

class UserService {
  static async changeName (id, name) {
    await UserRepository.changeName(id, name)
  }

  static async changeRole (id, role) {
    await UserRepository.updateRole(id, role)
  }

  static async changeAvatar (id, path) {
    await UserRepository.changeAvatarUrl(id, path)
  }

  static async changeEmail (id, email) {
    await UserRepository.changeEmail(id, email)
  }

  static async changePassword (id, password) {
    const hashPassword = PasswordService.getHash(password)
    await UserRepository.changePassword(id, hashPassword)
  }

  static async searchUserById (id) {
    return await UserRepository.searchUserById(id)
  }

  static async getPersonalData (id) {
    const data = await UserRepository.getUserDataById(id)
    if (data?.Avatar?.avatarUrl) data.Avatar.avatarUrl = createUploadLink(data.Avatar.avatarUrl)
    return { name: data?.Name?.name ?? '', /* status, */ avatarUrl: data?.Avatar?.avatarUrl ?? '', email: data.email }
  }

  static async getUserByEmail (email) {
    return await UserRepository.searchUserByEmail(email)
  }
}

module.exports = { UserService }
