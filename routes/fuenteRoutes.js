const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/authMiddleware");
const {
  crearFuente,
  obtenerFuentes,
  obtenerFuentePorId,
  actualizarFuente,
  eliminarFuente,
} = require("../controllers/fuenteController");

router.post("/", verificarToken, crearFuente);
router.get("/", verificarToken, obtenerFuentes);
router.get("/:id", verificarToken, obtenerFuentePorId);
router.put("/:id", verificarToken, actualizarFuente);
router.delete("/:id", verificarToken, eliminarFuente);

module.exports = router;