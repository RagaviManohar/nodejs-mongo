const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
