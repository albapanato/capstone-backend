const { supabase } = require("../models/db");

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

    const { data, error } = await supabase
      .from("testigo")
      .insert([
        {
          apellidos,
          nombre,
          dni: DNI,
          sexo,
          parentesco,
          telefono,
          movil,
          email,
          declaracion,
        },
      ])
      .select("id_testigo");

    if (error) throw error;

    res.status(201).json({
      message: "Testigo creado",
      id_testigo: data[0].id_testigo,
      ok: true,
    });
  } catch (err) {
    console.error("❌ Error al crear testigo:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerTestigos = async (req, res) => {
  try {
    const { data, error } = await supabase.from("testigo").select("*");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("❌ Error al obtener testigos:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerTestigoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("testigo")
      .select("*")
      .eq("id_testigo", id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Testigo no encontrado" });

    res.json(data);
  } catch (err) {
    console.error("❌ Error al obtener testigo por ID:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.actualizarTestigo = async (req, res) => {
  try {
    const { id } = req.params;
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

    const { error } = await supabase
      .from("testigo")
      .update({
        apellidos,
        nombre,
        dni: DNI,
        sexo,
        parentesco,
        telefono,
        movil,
        email,
        declaracion,
      })
      .eq("id_testigo", id);

    if (error) throw error;

    res.status(202).json({ message: "Testigo actualizado", ok: true });
  } catch (err) {
    console.error("❌ Error al actualizar testigo:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.eliminarTestigo = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("testigo")
      .delete()
      .eq("id_testigo", id);

    if (error) throw error;

    res.status(202).json({ message: "Testigo eliminado", ok: true });
  } catch (err) {
    console.error("❌ Error al eliminar testigo:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};
