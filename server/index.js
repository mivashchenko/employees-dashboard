const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {logger} = require("./middlewares");
const {authMiddleware} = require("./middlewares");
const AuthController = require("./controllers/AuthController");
const EmployeesController = require("./controllers/EmployeesController");
const DepartmentsController = require("./controllers/DepartmentsController");

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

app.use('/api/auth', AuthController);

app.use(authMiddleware)

app.use('/api/employees', EmployeesController);
app.use('/api/departments', DepartmentsController);

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