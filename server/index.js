const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { controllers } = require('./controllers/index.js');
const AuthService = require('./services/AuthService.js');
const {logger} = require("./middlewares");

const NODE_ENV = process.env.NODE_ENV || 'development';
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.get('/health', (req, res) => {
  res.statusCode(200);
})

app.use('/api', controllers);

app.use(async (req, res, next) => {

  // const idToken = req.cookies[CookieService.ID_TOKEN_COOKIE.name];
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
})

app.get('/profile', (req, res, next) => {
  try {
    const {user, name, picture} = res.locals;
    return res.json({user, name, picture});
  } catch (error) {
    console.error('Error sending profile page', error);
    return next()
  }
})

app.use(logger(NODE_ENV));


const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});