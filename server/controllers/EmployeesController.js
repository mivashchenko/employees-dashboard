const { PrismaClient } = require("../generated/prisma_client");
const express = require('express');

const prisma = new PrismaClient()

const EmployeesController = express.Router();

EmployeesController.get('/', async (req, res) => {
  try {
    const {
      name, email, departmentIds, sortBy = 'id', sortOrder = 'asc', page = 1, // Default to page 1 if not specified
      pageSize = 10, // Default to 10 items per page
    } = req.query;

    const departmentIdsArray = Array.isArray(departmentIds) ? departmentIds : departmentIds ? [...departmentIds.split(',')] : [];

    const where = {};
    if (name) where.name = {contains: name, mode: 'insensitive'}; // Case-insensitive search
    if (email) where.email = {contains: email, mode: 'insensitive'};
    if (departmentIdsArray.length > 0) {
      where.departmentId = {in: departmentIdsArray.map(id => parseInt(id, 10))}; // Convert string IDs to integers
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(pageSize, 10);

    const take = parseInt(pageSize, 10);

    const employees = await prisma.employee.findMany({
      where, include: {
        department: true,
      }, orderBy: {
        [sortBy]: sortOrder.toLowerCase() === 'desc' ? 'desc' : 'asc',
      }, skip, take,
    });


    const totalEmployees = await prisma.employee.count({where});

    res.json({
      data: employees,
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / pageSize),
      currentPage: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

EmployeesController.post('/', async (req, res) => {

  let newEmployee = req.body;

  const existingEmployee = await prisma.employee.findUnique({
    where: {email: newEmployee.email},
  });

  if (existingEmployee) {
    return res.status(400).json({message: "Email already exists"});
  }

  try {
    newEmployee = await prisma.employee.create({
      data: {
        name: newEmployee.name, email: newEmployee.email, departmentId: newEmployee.departmentId,
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Something went wrong'});
  }

  res.json(newEmployee);
});

EmployeesController.put('/:id', async (req, res) => {
  const {id} = req.params;
  let updatedEmployeeData = req.body;

  try {
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: Number(id),
      }, data: {
        name: updatedEmployeeData.name,
        email: updatedEmployeeData.email,
        departmentId: updatedEmployeeData.departmentId,
      },
    });

    res.json(updatedEmployee); // Send the updated employee back
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Something went wrong'});
  }
});

EmployeesController.delete('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    await prisma.employee.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({message: 'Employee deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Something went wrong'});
  }
});

module.exports = EmployeesController;