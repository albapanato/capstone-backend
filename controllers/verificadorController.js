const { supabase } = require("../models/db");

// Obtener todos los verificadores
exports.obtenerVerificadores = async (req, res) => {
  try {
    const { data, error } = await supabase.from("verificador").select("*");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("❌ Error al obtener verificadores:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

// Obtener un verificador por su ID
exports.obtenerVerificadorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("verificador")
      .select("*")
      .eq("id_verificador", id)
      .single();

    if (error) throw error;
    if (!data)
      return res.status(404).json({ error: "Verificador no encontrado" });

    res.json(data);
  } catch (err) {
    console.error("❌ Error al obtener verificador por ID:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

// Actualizar un verificador
exports.actualizarVerificador = async (req, res) => {
  try {
    const { id } = req.params;
    const { entidad, cif, apellidos, nombre, DNI, movil, email } = req.body;

    const { error } = await supabase
      .from("verificador")
      .update({
        entidad,
        cif,
        apellidos,
        nombre,
        DNI,
        movil,
        email,
      })
      .eq("id_verificador", id);

    if (error) throw error;

    res.status(202).json({ message: "Verificador actualizado" });
  } catch (err) {
    console.error("❌ Error al actualizar verificador:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

// Eliminar un verificador
exports.eliminarVerificador = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("verificador")
      .delete()
      .eq("id_verificador", id);

    if (error) throw error;

    res.status(202).json({ message: "Verificador eliminado" });
  } catch (err) {
    console.error("❌ Error al eliminar verificador:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};
