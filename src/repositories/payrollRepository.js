const mongoose = require('mongoose');
const Payroll = mongoose.model('Payroll');

exports.createPayroll = async (payroll) => {
  const createdPayroll = Payroll(payroll);
  await createdPayroll.save();
};

exports.findAllPayrolls = async () => {
  const payrolls = await Payroll.find();
  return payrolls;
};

exports.findPayrollById = async (payrollId) => {
  const payroll = await Payroll.findOne({ _id: payrollId });
  return payroll;
};

exports.deletePayrollById = async (payrollId) => {
  await Payroll.findByIdAndDelete(payrollId);
};

exports.updatePayrollById = async (payrollId, payroll) => {
  await Payroll.findByIdAndUpdate(payrollId, {
    $set: {
      personCode: payroll.personCode,
      salary: payroll.salary,
      date: payroll.date,
      payrollCode: payroll.code,
      department: payroll.department,
    },
  });
};
