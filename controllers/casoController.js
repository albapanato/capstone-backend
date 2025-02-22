const { supabase } = require("../models/db");

exports.crearCaso = async (req, res) => {
  try {
    let {
      nombre_caso,
      fecha,
      hora,
      descripcion_caso,
      fk_verificador,
      fk_testigo,
      fk_victima,
      fk_fuente_documental,
      nombre_ubicacion,
      coordenadas,
      descripcion_coordenadas,
      valoracion_daños,
    } = req.body;

    // Valores por defecto
    fk_verificador = fk_verificador || null;
    fk_testigo = fk_testigo || null;
    fk_victima = fk_victima || null;
    fk_fuente_documental = fk_fuente_documental || null;

    // Validar campos obligatorios
    if (!nombre_caso || !nombre_ubicacion || !coordenadas) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    if (coordenadas && !coordenadas.includes(",")) {
      return res.status(400).json({
        error: "Formato de coordenadas inválido. Use 'latitud,longitud'",
      });
    }

    // Insertar caso en Supabase
    const { data, error } = await supabase
      .from("caso")
      .insert([
        {
          nombre_caso,
          fecha,
          hora,
          descripcion_caso,
          fk_verificador,
          fk_testigo,
          fk_victima,
          fk_fuente_documental,
          nombre_ubicacion,
          coordenadas,
          descripcion_coordenadas,
          valoracion_danos: valoracion_daños,
        },
      ])
      .select("id_caso");

    if (error) throw error;

    res.status(201).json({
      message: "Caso creado exitosamente",
      id_caso: data[0].id_caso,
    });
  } catch (err) {
    console.error("❌ Error al crear caso:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

exports.obtenerCasosSinVerificar = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("caso")
      .select("*")
      .is("fk_verificador", null);

    if (error) throw error;
    if (data.length === 0)
      return res
        .status(404)
        .json({ error: "No se encontraron casos sin verificar" });

    res.json(data);
  } catch (err) {
    console.error("❌ Error en la consulta de casos sin verificar:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerCasoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("caso")
      .select("*")
      .eq("id_caso", id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Caso no encontrado" });

    res.json(data);
  } catch (err) {
    console.error("Error al obtener caso:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

exports.obtenerTodosCasos = async (req, res) => {
  try {
    const { data, error } = await supabase.from("caso").select("*");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerCasosVerificadosDeUnVerificador = async (req, res) => {
  try {
    const { id_verificador } = req.params;

    if (!id_verificador)
      return res
        .status(400)
        .json({ error: "El ID del verificador es requerido" });

    const { data, error } = await supabase
      .from("caso")
      .select("*")
      .eq("fk_verificador", id_verificador);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("❌ Error en obtenerCasosVerificadosDeUnVerificador:", err);
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.obtenerTodosLosCasosVerificados = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("caso")
      .select("*")
      .not("fk_verificador", "is", null);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error en la BD" });
  }
};

exports.validarCaso = async (req, res) => {
  try {
    const { id } = req.params;
    const { fk_verificador, validar } = req.body;

    const { error } = await supabase
      .from("caso")
      .update({
        fk_verificador: validar ? fk_verificador : null,
      })
      .eq("id_caso", id);

    if (error) throw error;

    res.status(200).json({
      message: validar ? "Caso validado" : "Caso invalidado",
      ok: true,
    });
  } catch (err) {
    console.error("Error al actualizar caso:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

exports.actualizarCaso = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_caso,
      fecha,
      hora,
      descripcion_caso,
      fk_verificador,
      fk_testigo,
      fk_victima,
      fk_fuente_documental,
      nombre_ubicacion,
      coordenadas,
      descripcion_coordenadas,
      valoracion_daños,
    } = req.body;

    if (!coordenadas || !coordenadas.includes(",")) {
      return res.status(400).json({
        error: "Formato de coordenadas inválido. Use 'latitud, longitud'",
      });
    }

    const { error } = await supabase
      .from("caso")
      .update({
        nombre_caso,
        fecha,
        hora,
        descripcion_caso,
        fk_verificador,
        fk_testigo,
        fk_victima,
        fk_fuente_documental,
        nombre_ubicacion,
        coordenadas,
        descripcion_coordenadas,
        valoracion_danos: valoracion_daños,
      })
      .eq("id_caso", id);

    if (error) throw error;

    res.status(200).json({ message: "Caso actualizado" });
  } catch (err) {
    console.error("Error al actualizar caso:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

exports.eliminarCaso = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("caso").delete().eq("id_caso", id);

    if (error) throw error;

    res.status(200).json({ message: "Caso eliminado" });
  } catch (err) {
    console.error("Error al eliminar caso:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
};
