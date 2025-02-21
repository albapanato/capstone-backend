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

router.post("/", crearFuente);
router.get("/", obtenerFuentes);
router.get("/:id", obtenerFuentePorId); // Integrar lógica de verificarToken mas tarde
router.put("/:id", actualizarFuente); // Integrar lógica de verificarToken mas tarde
router.delete("/:id", eliminarFuente); // Integrar lógica de verificarToken mas tarde

module.exports = router;
