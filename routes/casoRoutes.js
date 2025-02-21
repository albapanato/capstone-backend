const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/authMiddleware");

const {
  crearCaso,
  obtenerCasosSinVerificar,
  obtenerCasosVerificadosDeUnVerificador,
  obtenerTodosCasos,
  obtenerTodosLosCasosVerificados,
  validarCaso,
  obtenerCasoPorId,
  actualizarCaso,
} = require("../controllers/casoController");

// Rutas ordenadas correctamente para evitar conflictos
router.post("/", crearCaso); //funciona
router.get("/no-verificados", obtenerCasosSinVerificar); //funciona
router.get(
  "/mis-verificados/:id_verificador",
  obtenerCasosVerificadosDeUnVerificador
); //funciona
router.get("/verificados", obtenerTodosLosCasosVerificados); //funciona
router.get("/all", obtenerTodosCasos); //funciona
router.get("/:id", obtenerCasoPorId); //funciona
router.put("/validar/:id", verificarToken, validarCaso);
router.put("/:id", verificarToken, actualizarCaso); // funciona -- no esta la funcionalidad en el front
module.exports = router;
