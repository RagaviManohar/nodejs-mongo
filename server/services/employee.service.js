'use strict';

// Lib
const _ = require('lodash');

// Models
const Employee = require('../models/Employee.model');

// Others
const constants = require('../utils/constants');

exports.createEmployee = async(bodyData) => {
    const newEmployee = new Employee({
        email: _.get(bodyData, 'email', ''),
        name: _.get(bodyData, 'email', ''),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return newEmployee.save();
}

exports.validateEmployee = async(bodyData) => {
    if (_.isEmpty(_.get(bodyData, 'email', ''))) {
        throw new Error('Email is required');
    } else if (!constants.emailRegexp.test(_.get(bodyData, 'email'))) {
        throw new Error('Invalid Email');
    } else if (_.isEmpty(_.get(bodyData, 'name', ''))) {
        throw new Error('Name is required');
    }
}

exports.findEmployeeByEmail = async(email) => {
    return Employee.findOne({ email }).lean();
}

exports.getEmployeesListByEmail = async(emailList) => {
    return Employee.find({ email: { $in: emailList } }).lean();
}

exports.checkEmployeeExistsByemail = async(email) => {
    const employeeDetails = await this.findEmployeeByEmail(email);
    if (!_.isEmpty(employeeDetails)) {
        throw new Error('Employee already exists');
    }
}

exports.findAllEmployees = async() => {
    return Employee.find().lean();
}

exports.updateEmployeeByEmail = async(email, bodyData) => {
    const updateData = {
        name: _.get(bodyData, 'name', ''),
        updatedAt: new Date(),
    };
    return Employee.findOneAndUpdate({ email }, updateData, { upsert: true });
}

exports.updateMultipleEmployeeByEmail = async(employeeEditRequestList) => {
    let updatePromiseArray = [];
    employeeEditRequestList.map(emp => {
        const updateData = {
            name: emp.name,
            updatedAt: new Date(),
        };
        updatePromiseArray.push(Employee.findOneAndUpdate({ email: emp.email }, updateData));
    });
    return Promise.all(updatePromiseArray);
}

/** This below aggregate will return emails which matches 'isDeleted: false' condition as object array
 * Example Output:
[
    { 'emailList' : [ 'test@gmail.com' ] },
    { 'emailList' : [ 'test1@gmail.com' ] },
]
 */
exports.getEmailList = async() => {
    return Employee.aggregate([
        { $match: { isDeleted: false } },
        { $group: { _id: '$_id', emailList: { $addToSet: '$email' } } },
        { $project: { _id: 0, emailList: 1 } },
    ]);
}

/** This below aggregate will return emails which matches 'isDeleted: false' condition as single array
 * Example Output:
[
    { 'emailAsSingleArr' : [ 'test@gmail.com', 'test1@gmail.com' ] },
]
 */
exports.getEmailAsSingleArr = async() => {
    return Employee.aggregate([
        { $match: { isDeleted: false } },
        { $group: { _id: null, emailAsSingleArr: { $addToSet: '$email' } } },
        { $project: { _id: 0, emailAsSingleArr: 1 } }
    ]);
}
