const payrollRepository = require('../repositories/payrollRepository');
const ValidationContract = require('../util/validators');

exports.createPayroll = async (req, res) => {
  let validators = new ValidationContract();
  validators.isRequired(req.body.idPerson, 'idPerson is required');
  validators.isRequired(req.body.salary, 'salary is required');
  validators.isRequired(req.body.date, 'date is required');
  validators.isRequired(req.body.idDepartment, 'idSector is required');
  validators.isObjectIdValid(
    req.body.idPerson,
    `idPerson: "${req.body.idPerson}" is not a ObjectId valid.`,
  );
  validators.isObjectIdValid(
    req.body.idDepartment,
    `idDepartment: "${req.body.idDepartment}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      const responsePerson = await getPersonById(req.body.idPerson);
      if (responsePerson.status !== 200) {
        res
          .status(responsePerson.status)
          .send(responsePerson.text, `with idPerson: "${req.body.idPerson}"`);
        return;
      }

      const responseDepartment = await getDepartmentById(req.body.idDepartment);
      if (responseDepartment.status !== 200) {
        res
          .status(responseDepartment.status)
          .send(
            responseDepartment.text,
            `with idDepartment: "${req.body.idDepartment}"`,
          );
        return;
      }
      const department = await responseDepartment.json();
      req.body.department = department;

      await payrollRepository.createPayroll(req.body);
      res.status(201).send('Payroll created!');
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
      res.status(204).send();
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
  let validators = new ValidationContract();
  const payrollId = req.params.id;
  validators.isRequired(payrollId, 'payrollId is required');
  validators.isObjectIdValid(
    payrollId,
    `payrollId: "${payrollId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      const payroll = await payrollRepository.findPayrollById(payrollId);

      if (!payroll) {
        res.status(204).send();
        return;
      }
      res.status(200).send(payroll);
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

exports.updatePayrollById = async (req, res) => {
  let validators = new ValidationContract();
  const payrollId = req.params.id;
  validators.isRequired(payrollId, 'payrollId is required');
  validators.isObjectIdValid(
    payrollId,
    `payrollId: "${payrollId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      await payrollRepository.updatePayrollById(payrollId, req.body);
      res.status(200).send('payroll updated');
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

exports.deletePayrollById = async (req, res) => {
  let validators = new ValidationContract();
  const payrollId = req.params.id;
  validators.isRequired(payrollId, 'payrollId is required');
  validators.isObjectIdValid(
    payrollId,
    `payrollId: "${payrollId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      await payrollRepository.deletePayrollById(payrollId);
      res.status(204).send();
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

async function getPersonById(idPerson) {
  return await fetch(`http:localhost:3001/person/${idPerson}`);
}

async function getDepartmentById(idDepartment) {
  return await fetch(`http:localhost:3001/department/${idDepartment}`);
}
