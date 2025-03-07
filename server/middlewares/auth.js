const AuthService = require("./../services/AuthService");
const authMiddleware = async (req, res, next) => {

  const idToken = req.cookies['token'];

  if (!idToken) {
    console.log('No idToken');
    return res.status(401).json({error: 'Unauthorized'});
  }

  try {
    const authService = new AuthService();
    const userData = await authService.getUserData(idToken);
    res.locals.user = userData;
    console.log('User data:', userData);
    return next();
  } catch (error) {
    console.log('ID token invalid:', error);
    return res.sendStatus(401);
  }
}

module.exports = authMiddleware