const { TokenService } = require('../services/token.service')
const { CookieService } = require('../services/cookie.service')

async function tokenValidationMiddleware (ctx, next) {
  const token = CookieService.getToken(ctx)
  if (token) {
    const { userId } = TokenService.parse(token)
    ctx.request.userId = userId
    await next()
  } else {
    ctx.body = { error: 'Invalid token' }
  }
}

module.exports = { tokenValidation: tokenValidationMiddleware }
