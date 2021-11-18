class CookieService {
  static setToken (ctx, value) {
    ctx.cookies.set('jwt', value,
      { httpOnly: false, expires: new Date(Date.now() + 30 * 24 * 3600 * 1000) })
  }

  static getToken (ctx) {
    return ctx.cookies.get('jwt')
  }

  static clearToken (ctx) {
    ctx.cookies.set('jwt', '')
  }
}

module.exports = { CookieService }
