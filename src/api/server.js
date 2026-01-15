const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const API_URL = "https://api.imgflip.com/get_memes";

// Endpoint para obtener todos los elementos
app.get("/api/memes", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}`);
    res.json(response.data.data.memes);
  } catch (error) {
    console.error("Error al consultar la API:", error.message);
    res.status(500).json({ error: "Error al obtener los memes" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Servidor funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
