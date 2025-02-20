const express = require("express");
const router = express.Router();
// const verificarToken = require("../middlewares/authMiddleware"); // Si necesitas autenticación, descomenta esto.

const {
  crearCaso,
  obtenerCasosVerificados,
  obtenerTodosCasos,
  obtenerCasoPorId,
} = require("../controllers/casoController");

// Rutas ordenadas correctamente para evitar conflictos
router.post("/", crearCaso);
router.get("/verificados", obtenerCasosVerificados); 
router.get("/all", obtenerTodosCasos);
router.get("/:id", obtenerCasoPorId);

module.exports = router;
