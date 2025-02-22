const { supabase } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Login de verificadores
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar verificador por email
    const { data: verificador, error } = await supabase
      .from("verificador")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !verificador) {
      return res.status(401).json({ error: "Email no registrado" });
    }

    // 2. Comparar contraseña
    const passwordMatch = await bcrypt.compare(
      password,
      verificador.contrasena
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // 3. Generar token JWT
    const token = jwt.sign(
      { id: verificador.id_verificador },
      process.env.JWT_SECRET
    );

    res.json({
      id: verificador.id_verificador,
      ok: true,
      token,
      isValidator: true, // Todos los verificadores son válidos por defecto
    });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Registro de verificadores
exports.registrarVerificador = async (req, res) => {
  try {
    const { entidad, cif, apellidos, nombre, DNI, movil, email, contraseña } =
      req.body;

    if (!entidad || !apellidos || !nombre || !DNI || !contraseña) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const hashedPassword = bcrypt.hashSync(contraseña, 10);

    // Insertar verificador en la BD
    const { data, error } = await supabase
      .from("verificador")
      .insert([
        {
          entidad,
          cif,
          apellidos,
          nombre,
          dni: DNI,
          movil,
          email,
          contrasena: hashedPassword,
        },
      ])
      .select("id_verificador")
      .single();

    if (error) throw error;

    // Generar token SIN expiración
    const token = jwt.sign(
      { id_verificador: data.id_verificador, nombre, email },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      message: "Verificador creado",
      id_verificador: data.id_verificador,
      token, // Enviamos el token generado
    });
  } catch (err) {
    console.error("❌ Error en registro:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};
