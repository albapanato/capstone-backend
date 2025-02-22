require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// // Middleware de timeout (se coloca antes de definir rutas)
// app.use((req, res, next) => {
//   res.setTimeout(100000, () => {
//     // 100 segundos
//     res.status(504).json({ error: "Request timeout" });
//   });
//   next();
// });

// Middlewares generales
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const casoRoutes = require("./routes/casoRoutes");
const testigoRoutes = require("./routes/testigoRoutes");
const victimaRoutes = require("./routes/victimaRoutes");
const verificadorRoutes = require("./routes/verificadorRoutes");
const fuenteRoutes = require("./routes/fuenteRoutes");

// Definir rutas
app.use("/api/auth", authRoutes);
app.use("/api/casos", casoRoutes);
app.use("/api/testigos", testigoRoutes);
app.use("/api/victimas", victimaRoutes);
app.use("/api/verificadores", verificadorRoutes);
app.use("/api/fuentes", fuenteRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Puerto
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`✅ Servidor corriendo en http://0.0.0.0:${PORT}`);
// });

app.get("/", (req, res) => {
  res.send("API funcionando en Vercel 🚀");
});

module.exports = app;
