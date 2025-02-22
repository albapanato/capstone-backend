const mysql = require("mysql2");
require("dotenv").config();

// Configuración del pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

process.on("SIGINT", () => {
  pool.end((err) => {
    if (err) console.error("Error al cerrar la conexión:", err);
    console.log("Conexión a MySQL cerrada correctamente");
    process.exit(0);
  });
});

module.exports = pool.promise();
