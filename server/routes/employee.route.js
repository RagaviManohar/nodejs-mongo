const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');

router.get('/employees', employeeController.getEmployeesList);

router.post('/employees', employeeController.createEmployee);
router.post('/employees/withValidation', employeeController.createEmployeeWithValidation);

router.put('/employees/:email', employeeController.editEmployee);
// router.put('/employees', employeeController.editMultipleEmployees);

module.exports = router;
