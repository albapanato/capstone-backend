const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Crear cliente de Supabase
const supabase = createClient(
  process.env.DATABASE_SUPABASE_URL,
  process.env.DATABASE_SUPABASE_SERVICE_ROLE_KEY // Usa la clave de servicio para acceso total
);

/**
 * Función para realizar consultas genéricas a la base de datos
 * @param {string} table - Nombre de la tabla
 * @param {Array} columns - Columnas a seleccionar (ej: ["id", "name"])
 * @param {Object} filters - Objeto con las condiciones (ej: { id: 1 })
 * @returns {Promise<{ data: any, error: any }>}
 */
const query = async (table, columns = ["*"], filters = {}) => {
  let query = supabase.from(table).select(columns.join(","));

  // Aplicar filtros dinámicamente
  Object.keys(filters).forEach((key) => {
    query = query.eq(key, filters[key]);
  });

  const { data, error } = await query;
  return { data, error };
};

// Exportar Supabase y la función de consulta
module.exports = { supabase, query };
