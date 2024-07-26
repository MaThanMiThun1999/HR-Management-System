const { Router } = require('express');
const { createSalary, getSalaries, getSalaryById, updateSalary, deleteSalary } = require('../controllers/salaryController');
const router = Router();
const auth = require("../middleware/authMiddleware");

router.post('/',auth, createSalary);
router.get('/', auth,getSalaries);
router.get('/:id',auth, getSalaryById);
router.put('/:id',auth, updateSalary);
router.delete('/:id',auth, deleteSalary);

module.exports = router;
