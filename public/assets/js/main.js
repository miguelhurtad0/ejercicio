document.addEventListener("DOMContentLoaded", () => {
  let translatedButton = document.querySelector("#tranlateButton");
  translatedButton.addEventListener("click", async () => {
    let inputText = document.querySelector("#inputText");

    //Obtener el valor que se desea traducir
    const texto = document.querySelector("#inputText").value.trim();

    //Lenguaje de destino
    const targetLang = document.querySelector("#targetLang").value;

    if (!texto) return false;

    //Meter el mensaje del usuario a la caja de mensajes
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message chat-message-user";
    userMessage.textContent = texto;

    const messageContainer = document.querySelector(".chat-messages");
    messageContainer.appendChild(userMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    //Peticion ajax al backend
    try {
      const response = await fetch("/api/traducir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto,
          targetLang,
        }),
      });

      const data = await response.json();

      //Agregar el mensaje de la IA al chat
      const botMessage = document.createElement("div");
      botMessage.className = "chat-message chat-message-bot";
      botMessage.textContent = data.translatedText;

      messageContainer.appendChild(botMessage);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    } catch (error) {
      console.log("Error:", error);
    }

    //Limpiar el input
    inputText.value = "";
  });
});
