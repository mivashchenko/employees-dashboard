const { google } = require('googleapis');

class AuthService {
  static CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  static CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  static REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
  static SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

  constructor() {
    console.log(AuthService.REDIRECT_URI, 'AuthService.REDIRECT_URI')

    this.oAuth2Client = new google.auth.OAuth2(
      AuthService.CLIENT_ID,
      AuthService.CLIENT_SECRET,
      AuthService.REDIRECT_URI
    );
  }

  generateAuthUrl() {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: AuthService.SCOPES,
      include_granted_scopes: true,
      prompt: 'consent'
    });
  }

  async handleOAuthRedirect(authCode) {

    const {tokens} = await this.oAuth2Client.getToken(authCode);
    return {
      idToken: tokens.id_token,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    };
  }

  async getNewIdToken(refreshToken) {
    this.oAuth2Client.setCredentials({refresh_token: refreshToken});
    const tokens = await this.oAuth2Client.refreshAccessToken();

    return tokens.credentials.id_token;
  }

  async getUserData(idToken) {
    const data = await this.oAuth2Client.verifyIdToken({
      idToken
    });

    return data.getPayload();
  }
}

module.exports = AuthService