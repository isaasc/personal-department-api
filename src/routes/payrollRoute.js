const router = require('express').Router();
const payrollController = require('../controllers/payrollController');

router.get('/', payrollController.findAllPayrolls);
router.get('/:id', payrollController.findPayrollById);
router.post('/', payrollController.createPayroll);
router.put('/:id', payrollController.updatePayrollById);
router.delete('/:id', payrollController.deletePayrollById);

module.exports = router;
