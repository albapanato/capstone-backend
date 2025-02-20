// routes/testigoRoutes.js
const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/authMiddleware");
const {
  crearTestigo,
  obtenerTestigos,
  obtenerTestigoPorId,
  actualizarTestigo,
  eliminarTestigo,
} = require("../controllers/testigoController");

router.post("/", verificarToken, crearTestigo);
router.get("/", verificarToken, obtenerTestigos);
router.get("/:id", verificarToken, obtenerTestigoPorId);
router.put("/:id", verificarToken, actualizarTestigo);
router.delete("/:id", verificarToken, eliminarTestigo);

module.exports = router;