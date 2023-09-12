const payrollRecordRepository = require('../repositories/payrollRecordRepository');
const ValidationContract = require('../util/validators');

exports.createPayrollRecord = async (req, res) => {
  let validators = new ValidationContract();
  //validators.isRequired(req.body.payroll, 'Payroll is required');

  try {
    if (validators.isValid()) {
      await payrollRecordRepository.createPayrollRecord(req.body);
      res.status(201).send('payrollRecord created!');
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

exports.findAllPayrollRecords = async (req, res) => {
  try {
    const payrollRecords =
      await payrollRecordRepository.findAllPayrollRecords();
    if (payrollRecords == null || payrollRecords.length == 0) {
      res.status(204).send('No payrollRecords found');
    } else {
      res.status(200).send(payrollRecords);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findPayrollRecordById = async (req, res) => {
  const payrollRecordId = req.params.id;
  if (payrollRecords == null) {
    res.status(400).send('payrollRecordId is required');
  }
  const payrollRecord =
    payrollRecordRepository.findPayrollRecordById(payrollRecordId);

  if (!payrollRecord) {
    res.status(404).send();
  }

  res.status(200).send(payrollRecord);
};

exports.updatePayrollRecordById = async (req, res) => {
  const payrollRecordId = req.params.id;
  await payrollRecordRepository.updatePayrollRecordById(
    payrollRecordId,
    req.body,
  );
  res.status(200).send('payrollRecord updated', req.body);
};

exports.deletePayrollRecordById = async (req, res) => {
  const payrollRecordId = req.params.id;
  await payrollRecordRepository.deletePayrollRecordById(payrollRecordId);
  res.status(204).send('payrollRecord deleted', req.body);
};
