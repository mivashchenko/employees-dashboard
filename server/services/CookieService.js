 class CookieService {
  static REFRESH_TOKEN_COOKIE = {
    name: 'REFRESH_TOKEN_COOKIE',
    cookie: {
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      secure: false,
      // sameSite: 'lax',
      path: '/api/auth/refresh',
      maxAge: 5 * 365 * 24 * 60 * 60 * 1000
    }
  }

  static REFRESH_TOKEN_COOKIE_LOGOUT = {
    name: 'REFRESH_TOKEN_COOKIE_LOGOUT',
    cookie: {
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      secure: false,
      // sameSite: 'lax',
      path: '/api/auth/logout',
      maxAge: 5 * 365 * 24 * 60 * 60 * 1000
    }
  }

  static ID_TOKEN_COOKIE = {
    name: 'ID_TOKEN_COOKIE',
    cookie: {
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      secure: false,
      // sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 1000
    }
  }
}

module.exports = CookieService