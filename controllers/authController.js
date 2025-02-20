const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
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
    const token = jwt.sign(
      { id: user.id_verificador }, 
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ 
      ok: true,
      token,
      isValidator: true // Todos los verificadores son válidos por defecto
    });

  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

exports.registrarVerificador = async (req, res) => {
  const {
    entidad,
    cif,
    apellidos,
    nombre,
    DNI,
    movil,
    email,
    password 
  } = req.body;

  try {
    // Validar campos obligatorios
    if (!entidad || !cif || !apellidos || !nombre || !DNI || !movil || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar si el email ya existe
    const [existingUser] = await db.query(
      "SELECT email FROM verificador WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10); 

    // Insertar nuevo verificador
    await db.query(
      "INSERT INTO verificador (entidad, cif, apellidos, nombre, DNI, movil, email, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
      [entidad, cif, apellidos, nombre, DNI, movil, email, hashedPassword]
    );

    res.status(201).json({ message: "Verificador registrado exitosamente" });

  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};