const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;
const { schemaDepartment } = require('./Department');

const schemaPayroll = new Schema({
  idPerson: {
    type: ObjectId,
    required: [true, 'idPerson is required'],
  },
  salary: {
    type: Number,
    required: [true, 'salary is required'],
  },
  date: {
    type: Date,
    required: [true, 'date is required'],
  },
  idDepartment: {
    type: ObjectId,
    required: [true, 'idDepartment is required'],
  },
  department: {
    type: schemaDepartment,
    required: [true, 'department is required'],
  },
});

module.exports = mongoose.model('Payroll', schemaPayroll);
