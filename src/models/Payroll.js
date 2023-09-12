const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Department = mongoose.model('Department');

const schemaPayroll = new Schema({
  personCode: {
    type: String,
    required: [true, 'personCode is required'],
  },
  salary: {
    type: Number,
    required: [true, 'salary is required'],
  },
  date: {
    type: Date,
    required: [true, 'date is required'],
  },
  payrollCode: {
    type: String,
    required: [true, 'payrollCode is required'],
  },
  department: {
    type: Department,
    required: [true, 'department is required'],
  },
});

module.exports = mongoose.model('Payroll', schemaPayroll);
