const db = require("../models/db");

//   console.log("--casoController.js backend----req.body------>", req.body);
//   // estamos aquii
//   try {
//     console.log("Datos recibidos en el backend:", req.body); // 🔍 Depuración

//     const {
//       nombre_caso,
//       fecha,
//       hora,
//       descripcion_caso,
//       fk_verificador = 0, // Valor por defecto: 0
//       fk_testigo,
//       fk_victima,
//       fk_fuente_documental,
//       nombre_ubicacion,
//       coordenadas,
//       descripcion_coordenadas,
//       valoracion_daños,
//     } = req.body;

//     // Validar campos obligatorios
//     const camposObligatorios = [
//       { campo: "nombre_caso", valor: nombre_caso },
//       { campo: "nombre_ubicacion", valor: nombre_ubicacion },
//       { campo: "coordenadas", valor: coordenadas },
//     ];

//     const faltantes = camposObligatorios.filter(
//       (c) => c.valor === undefined || c.valor === null || c.valor === ""
//     );

//     if (faltantes.length > 0) {
//       return res.status(400).json({
//         error: "Faltan campos obligatorios",
//         campos_faltantes: faltantes.map((f) => f.campo),
//       });
//     }

//     // Validar formato de coordenadas
//     if (!coordenadas.includes(",")) {
//       return res.status(400).json({
//         error: "Formato de coordenadas inválido. Use 'latitud, longitud'",
//       });
//     }

//     // Verificar existencia de registros relacionados
//     const [testigoExiste, victimaExiste, fuenteExiste] = await Promise.all([
//       verificarExistencia("testigo", fk_testigo),
//       verificarExistencia("victima", fk_victima),
//       verificarExistencia("fuente_documental", fk_fuente_documental),
//     ]);

//     if (!testigoExiste || !victimaExiste || !fuenteExiste) {
//       return res
//         .status(404)
//         .json({ error: "Registros relacionados no encontrados" });
//     }

//     // Insertar el caso en la BD
//     const [result] = await db.query(
//       `INSERT INTO caso (
//         nombre_caso,
//         fecha,
//         hora,
//         descripcion_caso,
//         fk_verificador,
//         fk_testigo,
//         fk_victima,
//         fk_fuente_documental,
//         nombre_ubicacion,
//         coordenadas,
//         descripcion_coordenadas,
//         valoracion_daños
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

//       [
//         nombre_caso,
//         fecha || null,
//         hora || null,
//         descripcion_caso || null,
//         fk_verificador, // Aquí se usa 0 por defecto
//         fk_testigo,
//         fk_victima,
//         fk_fuente_documental,
//         nombre_ubicacion,
//         coordenadas,
//         descripcion_coordenadas || null,
//         valoracion_daños || null,
//       ]
//     );

//     res.status(201).json({
//       message: "Caso creado exitosamente",
//       id_caso: result.insertId,
//     });
//   } catch (err) {
//     console.error("❌ Error al crear caso:", err);
//     res.status(500).json({ error: "Error en la base de datos" });
//   }
// };

exports.crearCaso = async (req, res) => {
  // funciona
  console.log("--casoController.js backend----req.body------>", req.body);

  try {
    console.log("Datos recibidos en el backend:", req.body); // 🔍 Depuración

    let {
      nombre_caso,
      fecha,
      hora,
      descripcion_caso,
      fk_verificador,
      fk_testigo,
      fk_victima,
      fk_fuente_documental,
      nombre_ubicacion,
      coordenadas,
      descripcion_coordenadas,
      valoracion_daños,
    } = req.body;

    // ✅ Asignar valores por defecto si no existen
    fk_verificador = fk_verificador || null;
    fk_testigo = fk_testigo || null;
    fk_victima = fk_victima || null;
    fk_fuente_documental = fk_fuente_documental || null;

    // ✅ Validar campos obligatorios (sin incluir claves foráneas opcionales)
    const camposObligatorios = [
      { campo: "nombre_caso", valor: nombre_caso },
      { campo: "nombre_ubicacion", valor: nombre_ubicacion },
      { campo: "coordenadas", valor: coordenadas },
    ];

    const faltantes = camposObligatorios.filter(
      (c) => !c.valor || c.valor === ""
    );

    if (faltantes.length > 0) {
      return res.status(400).json({
        error: "Faltan campos obligatorios",
        campos_faltantes: faltantes.map((f) => f.campo),
      });
    }

    // ✅ Validar formato de coordenadas si existen
    if (coordenadas && !coordenadas.includes(",")) {
      return res.status(400).json({
        error: "Formato de coordenadas inválido. Use 'latitud,longitud'",
      });
    }

    // ✅ Verificar existencia de registros relacionados (si no son null)
    const verificaciones = [];
    if (fk_testigo)
      verificaciones.push(verificarExistencia("testigo", fk_testigo));
    if (fk_victima)
      verificaciones.push(verificarExistencia("victima", fk_victima));
    if (fk_fuente_documental)
      verificaciones.push(
        verificarExistencia("fuente_documental", fk_fuente_documental)
      );

    if (verificaciones.length > 0) {
      const resultados = await Promise.all(verificaciones);
      if (resultados.includes(false)) {
        return res
          .status(404)
          .json({ error: "Registros relacionados no encontrados" });
      }
    }

    // ✅ Insertar el caso en la BD
    const [result] = await db.query(
      `INSERT INTO caso (
        nombre_caso, 
        fecha, 
        hora, 
        descripcion_caso, 
        fk_verificador, 
        fk_testigo, 
        fk_victima, 
        fk_fuente_documental, 
        nombre_ubicacion, 
        coordenadas, 
        descripcion_coordenadas, 
        valoracion_daños
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre_caso,
        fecha || null,
        hora || null,
        descripcion_caso || null,
        fk_verificador,
        fk_testigo,
        fk_victima,
        fk_fuente_documental,
        nombre_ubicacion,
        coordenadas,
        descripcion_coordenadas || null,
        valoracion_daños || null,
      ]
    );

    res.status(201).json({
      message: "Caso creado exitosamente",
      id_caso: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error al crear caso:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

//funciona
exports.obtenerCasosSinVerificar = async (req, res) => {
  try {
    console.log("🔍 Ejecutando consulta de casos verificados...");

    const [casos] = await db.query(
      "SELECT * FROM caso WHERE fk_verificador IS NULL;"
    );

    if (casos.length === 0) {
      console.log("⚠️ No se encontraron casos verificados.");
      return res
        .status(404)
        .json({ error: "No se encontraron casos verificados" });
    }

    console.log("✅ Casos encontrados:", casos);
    res.json(casos);
  } catch (err) {
    console.error("❌ Error en la consulta de casos verificados:", err);
    res.status(500).json({ error: "Error en la BD", detalle: err.message });
  }
};

//funciona
exports.obtenerCasoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [caso] = await db.query("SELECT * FROM caso WHERE id_caso = ?", [id]);

    if (caso.length === 0) {
      return res.status(404).json({ error: "Caso no encontrado" });
    }

    res.status(200).json(caso[0]);
  } catch (err) {
    console.error("Error al obtener caso:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

//funciona
exports.obtenerTodosCasos = async (req, res) => {
  try {
    const [casos] = await db.query("SELECT * FROM caso");
    res.json(casos);
  } catch (err) {
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerCasosVerificadosDeUnVerificador = async (req, res) => {
  try {
    const { id_verificador } = req.params; // 🟢 Obtenemos el ID desde la URL

    if (!id_verificador) {
      return res
        .status(400)
        .json({ error: "El ID del verificador es requerido" });
    }

    const [casos] = await db.query(
      "SELECT * FROM caso WHERE fk_verificador = ?",
      [id_verificador]
    );

    res.json(casos);
  } catch (err) {
    console.error("❌ Error en obtenerCasosVerificadosDeUnVerificador:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerTodosLosCasosVerificados = async (req, res) => {
  try {
    const [casos] = await db.query(
      "SELECT * FROM caso WHERE fk_verificador IS NOT NULL;"
    );
    res.json(casos);
  } catch (err) {
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.actualizarCaso = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_caso,
      fecha,
      hora,
      descripcion_caso,
      fk_verificador,
      fk_testigo,
      fk_victima,
      fk_fuente_documental,
      nombre_ubicacion,
      coordenadas,
      descripcion_coordenadas,
      valoracion_daños,
    } = req.body;

    // Validar coordenadas
    if (!coordenadas || !coordenadas.includes(",")) {
      return res.status(400).json({
        error: "Formato de coordenadas inválido. Use 'latitud, longitud'",
      });
    }

    // Actualizar el caso
    await db.query(
      "UPDATE caso SET nombre_caso = ?, fecha = ?, hora = ?, descripcion_caso = ?, fk_verificador = ?, fk_testigo = ?, fk_victima = ?, fk_fuente_documental = ?, nombre_ubicacion = ?, coordenadas = ?, descripcion_coordenadas = ?, valoracion_daños = ? WHERE id_caso = ?",
      [
        nombre_caso,
        fecha,
        hora,
        descripcion_caso,
        fk_verificador,
        fk_testigo,
        fk_victima,
        fk_fuente_documental,
        nombre_ubicacion,
        coordenadas,
        descripcion_coordenadas,
        valoracion_daños,
        id,
      ]
    );

    res.status(200).json({ message: "Caso actualizado" });
  } catch (err) {
    console.error("Error al actualizar caso:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

exports.eliminarCaso = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM caso WHERE id_caso = ?", [id]);

    res.status(200).json({ message: "Caso eliminado" });
  } catch (err) {
    console.error("Error al eliminar caso:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};
