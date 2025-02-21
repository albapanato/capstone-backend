const db = require("../models/db");

exports.crearFuente = async (req, res) => {
  try {
    const {
      descripcion_medio,
      autor_medio,
      fecha_publicacion,
      url,
      fk_verificador,
    } = req.body;

    if (!descripcion_medio) {
      // Solo validar descripcion_medio como campo obligatorio
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const [result] = await db.query(
      "INSERT INTO fuente_documental (descripcion_medio, autor_medio, fecha_publicacion, url, fk_verificador) VALUES (?, ?, ?, ?, ?)",
      [descripcion_medio, autor_medio, fecha_publicacion, url, fk_verificador]
    );

    res
      .status(201)
      .json({ message: "Fuente creada", id_fuente: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerFuentes = (req, res) => {
  db.query("SELECT * FROM fuente_documental", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la BD" });
    res.json(results);
  });
};

exports.obtenerFuentePorId = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM fuente_documental WHERE id_fuente = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en la BD" });
      if (results.length === 0)
        return res.status(404).json({ error: "Fuente no encontrada" });
      res.json(results[0]);
    }
  );
};

exports.actualizarFuente = (req, res) => {
  const id = req.params.id;
  const {
    descripcion_medio,
    autor_medio,
    fecha_publicacion,
    url,
    fk_verificador,
  } = req.body;
  db.query(
    "UPDATE fuente_documental SET descripcion_medio=?, autor_medio=?, fecha_publicacion=?, url=?, fk_verificador=? WHERE id_fuente=?",
    [
      descripcion_medio,
      autor_medio,
      fecha_publicacion,
      url,
      fk_verificador,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la BD" });
      res.status(202).json({ message: "Fuente actualizada" });
    }
  );
};

exports.eliminarFuente = (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM fuente_documental WHERE id_fuente = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la BD" });
      res.status(202).json({ message: "Fuente eliminada" });
    }
  );
};
