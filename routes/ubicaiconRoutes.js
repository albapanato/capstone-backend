const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/authMiddleware");
const {
  crearUbicacion,
  obtenerUbicaciones,
  obtenerUbicacionPorId,
  actualizarUbicacion,
  eliminarUbicacion,
} = require("../controllers/ubicacionController");

// Rutas para ubicaciones
router.post("/", verificarToken, crearUbicacion); // Crear una ubicación
router.get("/", verificarToken, obtenerUbicaciones); // Obtener todas las ubicaciones
router.get("/:id", verificarToken, obtenerUbicacionPorId); // Obtener una ubicación por ID
router.put("/:id", verificarToken, actualizarUbicacion); // Actualizar una ubicación por ID
router.delete("/:id", verificarToken, eliminarUbicacion); // Eliminar una ubicación por ID

module.exports = router;










