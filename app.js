// Importar dependencias
import express, { text } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// Cargar configuración (de api key)
dotenv.config();

// Cargar express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir el frontend (carpeta public)
app.use("/", express.static("public"));

// Middleware para procesar jason
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear una instancia de openai y pasar la api key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ruta / endpoint / url
// app.js
// Ruta /api/chatbot
app.post("/api/chatbot", async (req, res) => {
  // Contexto para el asistente de soporte del supermercado "Familiar"
  const contexto = `
    Eres un asistente de soporte para el supermercado "Familiar".
    Información del negocio:
    - Ubicación: Rivas, Bo. Juan Bautista Rivera, Parroquia San Pedro 7c al sur.
    - Horario: Lunes a Sábado de 08:00 am a 09:00 pm, Domingos de 09:00 am a 06:00 pm.
    - Productos: Pan, Leche, Huevos, Frutas, Verduras, Carnes, Refrescos (solo y exclusivamente tenemos estos productos).
    - Marcas: Bimbo, La Perfecta, Parmalack, Coca cola, Pepsi Cola, Prix Cola, Big Cola.
    - Métodos de pago: Efectivo y tarjetas de crédito/débito.
    Solo puedes responder preguntas sobre la tienda. Cualquier otra pregunta está prohibida.
    Debes responder de la forma más corta y directa posible, usando los mínimos tokens posibles.
  `;

  // Recibir pregunta del usuario del cuerpo de la solicitud
  const { message } = req.body;

  // Validar si el mensaje está vacío
  if (!message) {
    return res.status(400).json({ error: "Has pasado un mensaje vacío." });
  }

  // Petición al modelo de inteligencia artificial
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: contexto }, // Rol del sistema con el contexto
        { role: "user", content: message }     // Mensaje del usuario
      ],
      max_completion_tokens: 200, // Límite de tokens para la respuesta
    });

    // Devolver la respuesta del modelo
    const reply = response.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (error) {
    // Manejo de errores en caso de fallo de la API
    console.error("Error:", error);
    return res.status(500).json({ error: "Error al generar la respuesta." });
  }
});

// Servir el backend
app.listen(PORT, () => {
  console.log("Servidor corriendo correctamente en http//localhost:" + PORT);
});
