const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/authMiddleware");
const {
  crearVictima,
  obtenerVictimas,
  obtenerVictimaPorId,
  actualizarVictima,
  eliminarVictima,
} = require("../controllers/victimaController");

router.post("/", verificarToken, crearVictima);
router.get("/", verificarToken, obtenerVictimas);
router.get("/:id", verificarToken, obtenerVictimaPorId);
router.put("/:id", verificarToken, actualizarVictima);
router.delete("/:id", verificarToken, eliminarVictima);

module.exports = router;