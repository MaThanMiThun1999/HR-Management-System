const { Router } = require("express");
const router = Router();
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getEmployees);
router.get("/:id", auth, getEmployeeById);
router.post("/",auth,createEmployee);
router.put("/:id", auth, updateEmployee);
router.delete("/:id", auth, deleteEmployee);

module.exports = router;
