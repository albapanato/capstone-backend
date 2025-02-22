const { supabase } = require("./models/db"); // Importa la configuración de Supabase

async function testConnection() {
  console.log("🔄 Probando conexión a Supabase...");

  // Intenta hacer una consulta simple a una tabla existente
  const { data, error } = await supabase
    .from("caso")
    .select("id_caso, nombre_caso")
    .limit(5);

  if (error) {
    console.error("❌ Error en la conexión a Supabase:", error.message);
  } else {
    console.log("✅ Conexión exitosa. Datos de prueba:", data);
  }
}

// Ejecutar la prueba
testConnection();
