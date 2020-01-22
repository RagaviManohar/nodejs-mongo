'use strict';

// Lib
const _ = require('lodash');

// Services
const employeeService = require('../services/employee.service');

/**
 * createEmployee with given request
 */
exports.createEmployee = async(req, res) => {
    try {
        await employeeService.createEmployee(_.get(req, 'body', {}));
        return res.status(200).send({
            message: 'Employee created successfully without validation',
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * createEmployeeWithValidation with given request
 */
exports.createEmployeeWithValidation = async(req, res) => {
    try {
        const bodyData = _.get(req, 'body', {});
        // Validate required fields to create an employee before saving in DB
        await employeeService.validateEmployee(bodyData);
        // Check employee already exists by email
        await employeeService.checkEmployeeExistsByemail(_.get(req, 'body.email'));
        await employeeService.createEmployee(bodyData);
        return res.status(200).json({
            message: 'Employee created successfully with validation',
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * To get all employees list form DB
 */
exports.getEmployeesList = async(req, res) => {
    try {
        const employeeList = await employeeService.findAllEmployees();
        return res.status(200).json({
            employeeList,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * edit employee with given request
 */
exports.editEmployee = async(req, res) => {
    try {
        await employeeService.updateEmployeeByEmail(_.get(req, 'params.email', ''), _.get(req, 'body', {}));
        return res.status(200).send({
            message: 'Employee edited successfully without validation',
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * check employee exists and update with given request
 */
exports.editEmployeeWithValidation = async(req, res) => {
    try {
        const email = _.get(req, 'params.email', '');
        if (_.isEmpty(email)) {
            throw new Error('Email is required');
        }
        // Check employee exists by email
        const employeeDetails = await employeeService.findEmployeeByEmail(email);
        if (_.isEmpty(employeeDetails)) {
            throw new Error('User not exists');
        }

        await employeeService.updateEmployeeByEmail(email, _.get(req, 'body', {}));
        return res.status(200).send({
            message: 'Employee edited successfully without validation',
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * check employee exists and update with given request
 */
exports.editMultipleEmployeesWithValidation = async(req, res) => {
    try {
        const employeeEditRequestList = _.get(req, 'body.employeesList', {});
        const emailsToUpdate = employeeEditRequestList.map(data => data.email);
        // Check employees exists by email
        const employeeDetails = await employeeService.getEmployeesListByEmail(emailsToUpdate);
        if (employeeDetails.length  !== employeeEditRequestList.length) {
            throw new Error('User not exists');
        }

        await employeeService.updateMultipleEmployeeByEmail(employeeEditRequestList);
        const employeeList = await employeeService.findAllEmployees();
        return res.status(200).send({
            message: 'Employees edited successfully with validation',
            employeeList,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
