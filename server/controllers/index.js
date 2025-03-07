const express = require('express');
const AuthController  = require('./AuthController.js');
const EmployeesController  = require('./EmployeesController.js');
const DepartmentsController  = require('./DepartmentsController.js');


const controllers = express.Router()

controllers.use('/auth', AuthController);
controllers.use('/employees', EmployeesController);
controllers.use('/departments', DepartmentsController);

module.exports = {
  controllers,
};