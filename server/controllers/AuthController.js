const express = require('express');
const AuthService = require('../services/AuthService.js');

const AuthController = express.Router();

AuthController.get('/login/google', (req, res) => {
  const authService = new AuthService()
  const authUrl = authService.generateAuthUrl();

  console.log('Redirecting to:', authUrl);

  return res.send(authUrl);
})

AuthController.post('/google/code', async (req, res, next) => {

  try {
    const authService = new AuthService();
    const {refreshToken, idToken} = await authService.handleOAuthRedirect(req.body.code)

    res.json({
      message: 'Authorized',
      idToken,
      refreshToken
    })


  } catch (error) {
    console.error(error);
    return next(error)
  }
})

AuthController.post('/refresh', async (req, res) => {
  const refreshToken = req.body?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Unauthorized: Refresh token missing' });
  }

  try {
    const authService = new AuthService();
    const newIdToken = await authService.getNewIdToken(refreshToken);

    return res.status(200).json({ idToken: newIdToken });
  } catch (error) {
    console.error('Invalid refresh token:', error);

    return res.status(401).json({ error: 'Unauthorized: Invalid refresh token' });
  }
});

module.exports = AuthController;