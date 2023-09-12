const router = require('express').Router();
const payrollRouter = require('./payrollRoute');

router.use('/payroll', payrollRouter);
module.exports = router;
