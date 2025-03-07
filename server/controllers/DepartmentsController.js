const { PrismaClient } = require("../generated/prisma_client");
const express = require('express');

const prisma = new PrismaClient()

const DepartmentsController = express.Router();

DepartmentsController.get('/', async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json({ data: departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

DepartmentsController.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const newDepartment = await prisma.department.create({
      data: { name },
    });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

DepartmentsController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedDepartment = await prisma.department.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(updatedDepartment);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

DepartmentsController.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.department.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = DepartmentsController;