const express = require("express");
const router = express.Router();
const {
  login,
  registrarVerificador,
} = require("../controllers/authController");

router.post("/login", login); // funciona
router.post("/registro", registrarVerificador); // funciona

module.exports = router;
