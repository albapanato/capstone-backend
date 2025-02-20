const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/authMiddleware");
const {
  crearVerificador,
  obtenerVerificadores,
  obtenerVerificadorPorId,
  actualizarVerificador,
  eliminarVerificador,
} = require("../controllers/verificadorController");

router.get("/", verificarToken, obtenerVerificadores);
router.get("/:id", verificarToken, obtenerVerificadorPorId);
router.put("/:id", verificarToken, actualizarVerificador);
router.delete("/:id", verificarToken, eliminarVerificador);

module.exports = router;
