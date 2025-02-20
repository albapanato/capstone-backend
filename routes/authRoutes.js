const express = require("express");
const router = express.Router();
const { login, registrarVerificador  } = require("../controllers/authController");

router.post("/login", login);
router.post("/registro", registrarVerificador);

module.exports = router;

