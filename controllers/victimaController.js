const { supabase } = require("../models/db");

// 1. Crear una nueva víctima
exports.crearVictima = async (req, res) => {
  try {
    const { estado, apellidos, nombre, DNI, sexo, telefono, movil, email } =
      req.body;

    if (!estado || !apellidos || !nombre || !DNI || !sexo) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const { data, error } = await supabase
      .from("victima")
      .insert([
        { estado, apellidos, nombre, dni: DNI, sexo, telefono, movil, email },
      ])
      .select("id_victima");

    if (error) throw error;

    res.status(201).json({
      message: "Víctima creada",
      id_victima: data[0].id_victima,
      ok: true,
    });
  } catch (err) {
    console.error("❌ Error al crear víctima:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 2. Obtener todas las víctimas
exports.obtenerVictimas = async (req, res) => {
  try {
    const { data, error } = await supabase.from("victima").select("*");

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error al obtener víctimas:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 3. Obtener una víctima por su ID
exports.obtenerVictimaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("victima")
      .select("*")
      .eq("id_victima", id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Víctima no encontrada" });

    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error al obtener víctima por ID:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 4. Actualizar una víctima por su ID
exports.actualizarVictima = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, apellidos, nombre, DNI, sexo, telefono, movil, email } =
      req.body;

    // Verificar si la víctima existe
    const { data: victimaExistente, error: errorExistencia } = await supabase
      .from("victima")
      .select("id_victima")
      .eq("id_victima", id)
      .single();

    if (errorExistencia) throw errorExistencia;
    if (!victimaExistente)
      return res.status(404).json({ error: "Víctima no encontrada" });

    // Actualizar la víctima
    const { error } = await supabase
      .from("victima")
      .update({
        estado,
        apellidos,
        nombre,
        dni: DNI,
        sexo,
        telefono,
        movil,
        email,
      })
      .eq("id_victima", id);

    if (error) throw error;

    res.status(200).json({ message: "Víctima actualizada" });
  } catch (err) {
    console.error("❌ Error al actualizar víctima:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 5. Eliminar una víctima por su ID
exports.eliminarVictima = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si la víctima existe
    const { data: victimaExistente, error: errorExistencia } = await supabase
      .from("victima")
      .select("id_victima")
      .eq("id_victima", id)
      .single();

    if (errorExistencia) throw errorExistencia;
    if (!victimaExistente)
      return res.status(404).json({ error: "Víctima no encontrada" });

    // Eliminar la víctima
    const { error } = await supabase
      .from("victima")
      .delete()
      .eq("id_victima", id);

    if (error) throw error;

    res.status(200).json({ message: "Víctima eliminada" });
  } catch (err) {
    console.error("❌ Error al eliminar víctima:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};
