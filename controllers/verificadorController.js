const db = require("../models/db");
const bcrypt = require("bcryptjs");

exports.obtenerVerificadores = (req, res) => {
  db.query("SELECT * FROM verificador", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la BD" });
    res.json(results);
  });
};

exports.obtenerVerificadorPorId = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM verificador WHERE id_verificador = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en la BD" });
      if (results.length === 0)
        return res.status(404).json({ error: "Verificador no encontrado" });
      res.json(results[0]);
    }
  );
};

exports.actualizarVerificador = (req, res) => {
  const id = req.params.id;
  const { entidad, cif, apellidos, nombre, DNI, movil, email } = req.body;
  db.query(
    "UPDATE verificador SET entidad=?, cif=?, apellidos=?, nombre=?, DNI=?, movil=?, email=? WHERE id_verificador=?",
    [entidad, cif, apellidos, nombre, DNI, movil, email, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la BD" });
      res.status(202).json({ message: "Verificador actualizado" });
    }
  );
};

exports.eliminarVerificador = (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM verificador WHERE id_verificador = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la BD" });
      res.status(202).json({ message: "Verificador eliminado" });
    }
  );
};
