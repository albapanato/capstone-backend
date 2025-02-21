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

router.post("/", crearTestigo);
router.get("/", obtenerTestigos);
router.get("/:id", obtenerTestigoPorId);
router.put("/:id", verificarToken, actualizarTestigo);
router.delete("/:id", verificarToken, eliminarTestigo);

module.exports = router;
