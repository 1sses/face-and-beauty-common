const { UserRepository } = require('../repository/user.repository')
const { ActivationService } = require('./activation.service')
const { PasswordService } = require('./password.service')
const { TokenService } = require('./token.service')
const { answers } = require('../constants/answers')
// const { MailService } = require('./mail.service')

class AuthService {
  static async register (email, password) {
    const emailCheck = await UserRepository.isAvailableEmail(email)
    if (emailCheck) {
      const passwordHash = PasswordService.getHash(password)
      const user = await UserRepository.register(email, passwordHash)
      // const activationId =
      await ActivationService.addUser(user.id)
      // await MailService.sendActivationLink(email, activationId)
    } else {
      throw Error(answers.error.unavailableEmail)
    }
  }

  static async getRole (id) {
    return await UserRepository.getUserRoleById(id)
  }

  static async updateRole (id, role) {
    await UserRepository.updateRole(id, role)
  }

  static async login (email, password) {
    const user = await UserRepository.searchUserByEmail(email)
    const allowedAccess = user && PasswordService.compare(password, user.password)
    if (allowedAccess) {
      return [TokenService.generate(user.id), user.role]
    } else {
      throw Error(answers.error.incorrectCredentials)
    }
  }

  static async activate (link) {
    await UserRepository.activateUser(link) // TODO переделать
  }

  static async isAvailableEmail (email = '') {
    return await UserRepository.isAvailableEmail(email)
  }
}

module.exports = { AuthService }
