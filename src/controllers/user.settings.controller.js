const { UserService } = require('../services/user.service')
const { answers } = require('../constants/answers')
const { PasswordService } = require('../services/password.service')

class UserSettingsController {
  static async changeName (ctx) {
    const { name } = ctx.request.body
    const { userId } = ctx.request
    await UserService.changeName(userId, name)
    ctx.body = { message: answers.success.change.name }
  }

  // static async changeStatus (ctx) {
  //   const { status } = ctx.request.body
  //   const { userId } = ctx.request
  //   await UserService.changeStatus(userId, status)
  //   ctx.body = { message: answers.success.change.status }
  // }

  static async changeAvatar (ctx) {
    const { userId } = ctx.request
    const imagePath = ctx.file?.path
    await UserService.changeAvatar(userId, imagePath)
    ctx.body = { message: answers.success.change.avatar }
  }

  static async changeEmail (ctx) {
    const { email } = ctx.request.body
    const { userId } = ctx.request
    await UserService.changeEmail(userId, email)
    ctx.body = { message: answers.success.change.email }
  }

  static async changePassword (ctx) {
    const { oldPassword, newPassword } = ctx.request.body
    const { userId } = ctx.request
    const user = await UserService.searchUserById(userId)
    if (PasswordService.compare(oldPassword, user.password)) {
      await UserService.changePassword(userId, newPassword)
      ctx.body = { message: answers.success.change.password }
    } else throw new Error('Неправильный пароль!')
  }

  static async getPersonalData (ctx) {
    const { userId } = ctx.request
    ctx.body = await UserService.getPersonalData(userId)
  }
}

module.exports = { UserSettingsController }
