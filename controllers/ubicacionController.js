const db = require("../models/db");

// 1. Crear una nueva ubicación
exports.crearUbicacion = async (req, res) => {
  try {
    const { nombre, latitud, longitud, descripcion } = req.body;

    // Validar campos obligatorios
    if (!nombre || !latitud || !longitud) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Insertar la ubicación en la base de datos
    const [result] = await db.query(
      "INSERT INTO ubicacion (nombre, latitud, longitud, descripcion) VALUES (?, ?, ?, ?)",
      [nombre, latitud, longitud, descripcion]
    );

    res
      .status(201)
      .json({ message: "Ubicación creada", id_ubicacion: result.insertId });
  } catch (err) {
    console.error("Error al crear ubicación:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 2. Obtener todas las ubicaciones
exports.obtenerUbicaciones = async (req, res) => {
  try {
    const [ubicaciones] = await db.query("SELECT * FROM ubicacion");
    res.status(200).json(ubicaciones);
  } catch (err) {
    console.error("Error al obtener ubicaciones:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 3. Obtener una ubicación por su ID
exports.obtenerUbicacionPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [ubicacion] = await db.query(
      "SELECT * FROM ubicacion WHERE id_ubicacion = ?",
      [id]
    );

    if (ubicacion.length === 0) {
      return res.status(404).json({ error: "Ubicación no encontrada" });
    }

    res.status(200).json(ubicacion[0]);
  } catch (err) {
    console.error("Error al obtener ubicación por ID:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 4. Actualizar una ubicación por su ID
exports.actualizarUbicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, latitud, longitud, descripcion } = req.body;

    // Verificar si la ubicación existe
    const [ubicacion] = await db.query(
      "SELECT * FROM ubicacion WHERE id_ubicacion = ?",
      [id]
    );
    if (ubicacion.length === 0) {
      return res.status(404).json({ error: "Ubicación no encontrada" });
    }

    // Actualizar la ubicación
    await db.query(
      "UPDATE ubicacion SET nombre = ?, latitud = ?, longitud = ?, descripcion = ? WHERE id_ubicacion = ?",
      [nombre, latitud, longitud, descripcion, id]
    );

    res.status(200).json({ message: "Ubicación actualizada" });
  } catch (err) {
    console.error("Error al actualizar ubicación:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 5. Eliminar una ubicación por su ID
exports.eliminarUbicacion = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si la ubicación existe
    const [ubicacion] = await db.query(
      "SELECT * FROM ubicacion WHERE id_ubicacion = ?",
      [id]
    );
    if (ubicacion.length === 0) {
      return res.status(404).json({ error: "Ubicación no encontrada" });
    }

    // Eliminar la ubicación
    await db.query("DELETE FROM ubicacion WHERE id_ubicacion = ?", [id]);

    res.status(200).json({ message: "Ubicación eliminada" });
  } catch (err) {
    console.error("Error al eliminar ubicación:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};
