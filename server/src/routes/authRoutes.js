const { Router } = require("express");
const { register, login, logout,getProfile } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.post("/logout", auth, logout);

module.exports = router;