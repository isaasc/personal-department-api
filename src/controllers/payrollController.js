const payrollRepository = require('../repositories/payrollRepository');
const ValidationContract = require('../util/validators');

exports.createPayroll = async (req, res) => {
  let validators = new ValidationContract();
  //validators.isRequired(req.body.payroll, 'Payroll is required');

  try {
    if (validators.isValid()) {
      await payrollRepository.createPayroll(req.body);
      res.status(201).send('payroll created!');
    } else {
      res.status(400).send({
        errors: validators.getErrors(),
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findAllPayrolls = async (req, res) => {
  try {
    const payrolls = await payrollRepository.findAllPayrolls();
    if (payrolls == null || payrolls.length == 0) {
      res.status(204).send('No payrolls found');
    } else {
      res.status(200).send(payrolls);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findPayrollById = async (req, res) => {
  const payrollId = req.params.id;
  if (payrollId == null) {
    res.status(400).send('payrollId is required');
  }
  const payroll = payrollRepository.findPayrollById(payrollId);

  if (!payroll) {
    res.status(404).send();
  }

  res.status(200).send(payroll);
};

exports.updatePayrollById = async (req, res) => {
  const payrollId = req.params.id;
  await payrollRepository.updatePayrollById(payrollId, req.body);
  res.status(200).send('payroll updated', req.body);
};

exports.deletePayrollById = async (req, res) => {
  const payrollId = req.params.id;
  await payrollRepository.deletePayrollById(payrollId);
  res.status(204).send('payroll deleted', req.body);
};
