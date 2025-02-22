const { supabase } = require("../models/db");

// 1. Crear una nueva ubicación
exports.crearUbicacion = async (req, res) => {
  try {
    const { nombre, latitud, longitud, descripcion } = req.body;

    // Validar campos obligatorios
    if (!nombre || !latitud || !longitud) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Insertar ubicación en Supabase
    const { data, error } = await supabase
      .from("ubicacion")
      .insert([{ nombre, latitud, longitud, descripcion }])
      .select("id_ubicacion");

    if (error) throw error;

    res.status(201).json({
      message: "Ubicación creada",
      id_ubicacion: data[0].id_ubicacion,
    });
  } catch (err) {
    console.error("❌ Error al crear ubicación:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 2. Obtener todas las ubicaciones
exports.obtenerUbicaciones = async (req, res) => {
  try {
    const { data, error } = await supabase.from("ubicacion").select("*");

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error al obtener ubicaciones:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 3. Obtener una ubicación por su ID
exports.obtenerUbicacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("ubicacion")
      .select("*")
      .eq("id_ubicacion", id)
      .single();

    if (error) throw error;
    if (!data)
      return res.status(404).json({ error: "Ubicación no encontrada" });

    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error al obtener ubicación por ID:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 4. Actualizar una ubicación por su ID
exports.actualizarUbicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, latitud, longitud, descripcion } = req.body;

    // Verificar si la ubicación existe
    const { data: ubicacionExistente, error: errorExistencia } = await supabase
      .from("ubicacion")
      .select("id_ubicacion")
      .eq("id_ubicacion", id)
      .single();

    if (errorExistencia) throw errorExistencia;
    if (!ubicacionExistente)
      return res.status(404).json({ error: "Ubicación no encontrada" });

    // Actualizar la ubicación
    const { error } = await supabase
      .from("ubicacion")
      .update({
        nombre,
        latitud,
        longitud,
        descripcion,
      })
      .eq("id_ubicacion", id);

    if (error) throw error;

    res.status(200).json({ message: "Ubicación actualizada" });
  } catch (err) {
    console.error("❌ Error al actualizar ubicación:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

// 5. Eliminar una ubicación por su ID
exports.eliminarUbicacion = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si la ubicación existe
    const { data: ubicacionExistente, error: errorExistencia } = await supabase
      .from("ubicacion")
      .select("id_ubicacion")
      .eq("id_ubicacion", id)
      .single();

    if (errorExistencia) throw errorExistencia;
    if (!ubicacionExistente)
      return res.status(404).json({ error: "Ubicación no encontrada" });

    // Eliminar la ubicación
    const { error } = await supabase
      .from("ubicacion")
      .delete()
      .eq("id_ubicacion", id);

    if (error) throw error;

    res.status(200).json({ message: "Ubicación eliminada" });
  } catch (err) {
    console.error("❌ Error al eliminar ubicación:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};
