const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;

const schemaDepartment = new Schema({
  departmentCode: {
    type: String,
    required: [true, 'departmentCode is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  idSector: {
    type: ObjectId,
    required: [true, 'idSector is required'],
  },
});

module.exports = {
  schemaDepartment,
};
