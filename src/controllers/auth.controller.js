const { answers } = require('../constants/answers')
const { AuthService } = require('../services/auth.service')
const { CookieService } = require('../services/cookie.service')
const { ActivationService } = require('../services/activation.service')
const { auth } = require('../constants/auth')

class AuthController {
  static async validation (ctx) {
    const id = ctx.request.userId
    const role = await AuthService.getRole(id)
    ctx.body = { role }
  }

  static async registration (ctx) {
    const { email, password } = ctx.request.body
    await AuthService.register(email, password)
    ctx.body = { message: answers.success.registration }
  }

  static async updateRole (ctx) { // unsafe, rewrite
    const key = ctx.params.link
    const id = ctx.request.userId

    if (key === auth.SECRET_BARBER) {
      await AuthService.updateRole(id, 'barber')
      ctx.body = { message: answers.success.newRole + 'barber' }
    } else if (key === auth.SECRET_ADMIN) {
      await AuthService.updateRole(id, 'admin')
      ctx.body = { message: answers.success.newRole + 'admin' }
    } else ctx.body = { message: answers.error.accessDenied }
  }

  static async login (ctx) {
    const { email, password } = ctx.request.body
    const [token, role] = await AuthService.login(email, password)
    CookieService.setToken(ctx, token)
    ctx.body = { message: answers.success.login, role }
  }

  static async activation (ctx) {
    const activationToken = ctx.params.link
    await ActivationService.activateUser(activationToken)
    ctx.body = { message: answers.success.activation }
  }

  static async logout (ctx) {
    CookieService.clearToken(ctx)
    ctx.body = { message: answers.success.logout }
  }

  static async isAvailableEmail (ctx) {
    const { email } = ctx.request.body
    ctx.body = await AuthService.isAvailableEmail(email)
  }
  // async refresh (ctx) { }
}

module.exports = { AuthController }
