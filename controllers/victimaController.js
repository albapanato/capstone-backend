const db = require("../models/db");

exports.crearVictima = async (req, res) => {
  try {
    const { estado, apellidos, nombre, DNI, sexo, telefono, movil, email } = req.body;

    if (!estado || !apellidos || !nombre || !DNI || !sexo) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const [result] = await db.query(
      "INSERT INTO victima (estado, apellidos, nombre, DNI, sexo, telefono, movil, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [estado, apellidos, nombre, DNI, sexo, telefono, movil, email]
    );

    res.status(201).json({ message: "Víctima creada", id_victima: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Error en la BD" });
  }
};
// 2. Obtener todas las víctimas
exports.obtenerVictimas = async (req, res) => {
  try {
    const [victimas] = await db.query("SELECT * FROM victima");
    res.status(200).json(victimas);
  } catch (err) {
    console.error("Error al obtener víctimas:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 3. Obtener una víctima por su ID
exports.obtenerVictimaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [victima] = await db.query("SELECT * FROM victima WHERE id_victima = ?", [id]);

    if (victima.length === 0) {
      return res.status(404).json({ error: "Víctima no encontrada" });
    }

    res.status(200).json(victima[0]);
  } catch (err) {
    console.error("Error al obtener víctima por ID:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 4. Actualizar una víctima por su ID
exports.actualizarVictima = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, apellidos, nombre, DNI, sexo, telefono, movil, email } = req.body;

    // Verificar si la víctima existe
    const [victima] = await db.query("SELECT * FROM victima WHERE id_victima = ?", [id]);
    if (victima.length === 0) {
      return res.status(404).json({ error: "Víctima no encontrada" });
    }

    // Actualizar la víctima
    await db.query(
      "UPDATE victima SET estado = ?, apellidos = ?, nombre = ?, DNI = ?, sexo = ?, telefono = ?, movil = ?, email = ? WHERE id_victima = ?",
      [estado, apellidos, nombre, DNI, sexo, telefono, movil, email, id]
    );

    res.status(200).json({ message: "Víctima actualizada" });
  } catch (err) {
    console.error("Error al actualizar víctima:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 5. Eliminar una víctima por su ID
exports.eliminarVictima = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si la víctima existe
    const [victima] = await db.query("SELECT * FROM victima WHERE id_victima = ?", [id]);
    if (victima.length === 0) {
      return res.status(404).json({ error: "Víctima no encontrada" });
    }

    // Eliminar la víctima
    await db.query("DELETE FROM victima WHERE id_victima = ?", [id]);

    res.status(200).json({ message: "Víctima eliminada" });
  } catch (err) {
    console.error("Error al eliminar víctima:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};