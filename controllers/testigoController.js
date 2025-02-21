const db = require("../models/db");

exports.crearTestigo = async (req, res) => {
  try {
    const {
      apellidos,
      nombre,
      DNI,
      sexo,
      parentesco,
      telefono,
      movil,
      email,
      declaracion,
    } = req.body;

    // Validar campos obligatorios
    if (!apellidos || !nombre || !DNI || !declaracion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const [result] = await db.query(
      "INSERT INTO testigo (apellidos, nombre, DNI, sexo, parentesco, telefono, movil, email, declaracion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        apellidos,
        nombre,
        DNI,
        sexo,
        parentesco,
        telefono,
        movil,
        email,
        declaracion,
      ]
    );

    res
      .status(201)
      .json({ message: "Testigo creado", id_testigo: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerTestigos = (req, res) => {
  db.query("SELECT * FROM testigo", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la BD" });
    res.json(results);
  });
};

exports.obtenerTestigoPorId = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM testigo WHERE id_testigo = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en la BD" });
      if (results.length === 0)
        return res.status(404).json({ error: "Testigo no encontrado" });
      res.json(results[0]);
    }
  );
};

exports.actualizarTestigo = (req, res) => {
  const id = req.params.id;
  const {
    apellidos,
    nombre,
    DNI,
    sexo,
    parentesco,
    telefono,
    movil,
    email,
    declaracion,
  } = req.body;
  db.query(
    "UPDATE testigo SET apellidos=?, nombre=?, DNI=?, sexo=?, parentesco=?, telefono=?, movil=?, email=?, declaracion=? WHERE id_testigo=?",
    [
      apellidos,
      nombre,
      DNI,
      sexo,
      parentesco,
      telefono,
      movil,
      email,
      declaracion,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la BD" });
      res.status(202).json({ message: "Testigo actualizado" });
    }
  );
};

exports.eliminarTestigo = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM testigo WHERE id_testigo = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la BD" });
    res.status(202).json({ message: "Testigo eliminado" });
  });
};
