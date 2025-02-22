const { supabase } = require("../models/db");

exports.crearFuente = async (req, res) => {
  try {
    const {
      descripcion_medio,
      autor_medio,
      fecha_publicacion,
      url,
      fk_verificador,
    } = req.body;

    if (!descripcion_medio || !fecha_publicacion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const { data, error } = await supabase
      .from("fuente_documental")
      .insert([
        {
          descripcion_medio,
          autor_medio,
          fecha_publicacion,
          url,
          fk_verificador,
        },
      ])
      .select("id_fuente_documental");

    if (error) throw error;

    res.status(201).json({
      message: "Fuente creada",
      id_fuente_documental: data[0].id_fuente_documental,
      ok: true,
    });
  } catch (err) {
    console.error("❌ Error al crear fuente:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerFuentes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fuente_documental")
      .select("*");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("❌ Error al obtener fuentes:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerFuentePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("fuente_documental")
      .select("*")
      .eq("id_fuente", id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Fuente no encontrada" });

    res.json(data);
  } catch (err) {
    console.error("❌ Error al obtener fuente por ID:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.actualizarFuente = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      descripcion_medio,
      autor_medio,
      fecha_publicacion,
      url,
      fk_verificador,
    } = req.body;

    const { error } = await supabase
      .from("fuente_documental")
      .update({
        descripcion_medio,
        autor_medio,
        fecha_publicacion,
        url,
        fk_verificador,
      })
      .eq("id_fuente_documental", id);

    if (error) throw error;

    res.status(202).json({ message: "Fuente actualizada" });
  } catch (err) {
    console.error("❌ Error al actualizar fuente:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.eliminarFuente = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("fuente_documental")
      .delete()
      .eq("id_fuente_documental", id);

    if (error) throw error;

    res.status(202).json({ message: "Fuente eliminada" });
  } catch (err) {
    console.error("❌ Error al eliminar fuente:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};
