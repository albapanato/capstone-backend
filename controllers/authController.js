const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  // FUNCIONA
  const { email, password } = req.body;

  try {
    // 1. Buscar verificador por email
    const [verificador] = await db.query(
      "SELECT * FROM verificador WHERE email = ?",
      [email]
    );

    if (verificador.length === 0) {
      return res.status(401).json({ error: "Email no registrado" });
    }

    // 2. Comparar contraseña
    const user = verificador[0];
    const passwordMatch = await bcrypt.compare(password, user.contraseña);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // 3. Generar token JWT
    const token = jwt.sign({ id: user.id_verificador }, process.env.JWT_SECRET);

    res.json({
      ok: true,
      token,
      isValidator: true, // Todos los verificadores son válidos por defecto
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

exports.registrarVerificador = async (req, res) => {
  // FUNCIONA
  try {
    const { entidad, cif, apellidos, nombre, DNI, movil, email, contraseña } =
      req.body;

    if (!entidad || !apellidos || !nombre || !DNI || !contraseña) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const hashedPassword = bcrypt.hashSync(contraseña, 10);

    const [result] = await db.query(
      "INSERT INTO verificador (entidad, cif, apellidos, nombre, DNI, movil, email, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [entidad, cif, apellidos, nombre, DNI, movil, email, hashedPassword]
    );
    // Generar token SIN expiración
    const token = jwt.sign(
      { id_verificador: result.insertId, nombre, email },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      message: "Verificador creado",
      id_verificador: result.insertId,
      token, // Enviamos el token generado
    });
  } catch (err) {
    res.status(500).json({ error: "Error en la BD" });
  }
};
