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

router.post("/", crearVictima);
router.get("/", obtenerVictimas);
router.get("/:id", obtenerVictimaPorId);
router.put("/:id", verificarToken, actualizarVictima);
router.delete("/:id", verificarToken, eliminarVictima);

module.exports = router;
