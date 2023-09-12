const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaDepartment = new Schema({
  departmentCode: {
    type: String,
    required: [true, 'departmentCode is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  sector: {
    type: String,
    required: [true, 'sector is required'],
  },
});

module.exports = mongoose.model('Department', schemaDepartment);
