document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.querySelector("#sendButton");
    const inputText = document.querySelector("#inputText");

    inputText.addEventListener("keydown", (event)=> {
        if (event.key4 === "Enter" && !event.shiftkey) {
            event.preventDefault ();
            sendButton.click();
        }
    });

    sendButton.addEventListener("click", async () => {
        // Sacar el valor del input (pregunta)
        const myMessage = inputText.value.trim();

        if (!myMessage) return false;

        // Crear y mostrar mensaje del usuario
        const userMessage = document.createElement("div");
        userMessage.className = "chat-message chat-message-user";
        userMessage.textContent = "Tú: " + myMessage; // Cambiado de "Yo:" a "Tú:"

        const messageContainer = document.querySelector(".chat-messages");
        messageContainer.appendChild(userMessage);
        messageContainer.scrollTop = messageContainer.scrollHeight;

        // Limpiar input
        inputText.value = "";
        inputText.focus();

        // Petición al backend para que me responda la IA
        try {
            const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: myMessage,
                }),
            });
            // Crear y mostrar el mensaje del bot
            const data = await response.json();
            
            const botMessage = document.createElement("div");
            botMessage.className = "chat-message chat-message-bot";
            botMessage.textContent = "Bot: " + data.reply; 
            messageContainer.appendChild(botMessage);
            messageContainer.scrollTop = messageContainer.scrollHeight;

        } catch (error) {
            console.log("Error: ", error);
            const errorMessage = document.createElement("div");
            errorMessage.className = "chat-message chat-message-error";
            errorMessage.textContent = "Error: No se pudo obtener respuesta del bot.";
            messageContainer.appendChild(errorMessage);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    });
});