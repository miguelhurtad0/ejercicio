
document.addEventListener("DOMContentLoaded", function() {
    const sendBtn = document.getElementById("sendBtn");
    const input = document.getElementById("messagesInput");
    const messages = document.getElementById("messages");

    //diccionario con propiedades css
    const propiedadesCSS ={
        color: "La propiedad 'color' cambia el color del texto.",
        margin: "La propiedad 'margin' agrega espacio/margen alrededor de un elemeto.",
        padding: "La propiedad 'padding' agrega epacio dentro de un elemento",
        fontsize: "La propiedad 'font-size' sirve para establecer el tamaño del texto.",
        fontfamily: "La propiedad 'font-family' sirve para definir la fuente del texto.",
        backgroundcolor: "La propiedad 'background-color' sirve para establecer el color de fondo de un elemento.",
        textalign: "La propiedad 'text-align' sirve para especificar la alineación horizontal del texto dentro de un elemento.",
        width: "La propiedad 'width' sirve para establecer el ancho de un elemento.",
        height: "La propiedad 'height' sirve para establecer la altura de un elemento.",
        border: "La propiedad 'border' sirve para establecer el borde de un elemento (ancho, estilo y color).",
        display: "La propiedad 'display' sirve para especificar cómo se muestra un elemento (por ejemplo, 'block', 'inline', 'flex', 'grid').",
        position: "La propiedad 'position' sirve para especificar el tipo de método de posicionamiento utilizado para un elemento (estático, relativo, fijo, absoluto, pegajoso).",
        top: "La propiedad 'top' sirve para posicionar un elemento desde la parte superior.",
        right: "La propiedad 'right' sirve para posicionar un elemento desde la parte derecha.",
        bottom: "La propiedad 'bottom' sirve para posicionar un elemento desde la parte inferior.",
        left: "La propiedad 'left' sirve para posicionar un elemento desde la parte izquierda.",
        zindex: "La propiedad 'z-index' sirve para especificar el orden de apilamiento de un elemento (cuál está delante o detrás de otros).",
        float: "La propiedad 'float' sirve para especificar si un elemento debe flotar a la izquierda, a la derecha o no flotar en absoluto.",
        clear: "La propiedad 'clear' sirve para especificar qué lados de un elemento flotante no pueden tener otros elementos flotantes junto a ellos.",
        opacity: "La propiedad 'opacity' sirve para establecer el nivel de opacidad de un elemento (su transparencia).",
        boxshadow: "La propiedad 'box-shadow' sirve para agregar una o más sombras a un elemento.",
        textshadow: "La propiedad 'text-shadow' sirve para agregar una o más sombras al texto.",
        borderradius: "La propiedad 'border-radius' sirve para agregar esquinas redondeadas a un elemento.",
        overflow: "La propiedad 'overflow' sirve para especificar qué sucede si el contenido de un elemento desborda su caja.",
        visibility: "La propiedad 'visibility' sirve para especificar si un elemento es visible o no.",
        cursor: "La propiedad 'cursor' sirve para especificar el tipo de cursor del ratón que se mostrará cuando se apunte sobre un elemento.",
        transition: "La propiedad 'transition' sirve para establecer las propiedades de transición (efectos de animación).",
        transform: "La propiedad 'transform' sirve para aplicar una transformación 2D o 3D a un elemento.",
        animation: "La propiedad 'animation' sirve para controlar las propiedades de animación de un elemento.",
        flexdirection: "La propiedad 'flex-direction' sirve para especificar la dirección de los elementos flexibles dentro de un contenedor flex.",
        justifycontent: "La propiedad 'justify-content' sirve para alinear los elementos flexibles a lo largo del eje principal de un contenedor flex.",
        alignitems: "La propiedad 'align-items' sirve para alinear los elementos flexibles a lo largo del eje transversal de un contenedor flex.",
        gridtemplatecolumns: "La propiedad 'grid-template-columns' sirve para definir los nombres y el tamaño de las columnas de la cuadrícula.",
        gridtemplaterows: "La propiedad 'grid-template-rows' sirve para definir los nombres y el tamaño de las filas de la cuadrícula.",
        gap: "La propiedad 'gap' sirve para establecer el tamaño de los huecos entre las filas y columnas en diseños de cuadrícula o flexbox."
        

    }

    // Función para agregar el mensaje del usuario al chat
    function agregarMensaje(texto, clase){
        const msg = document.createElement("div"); // crea un nuevo elemento
        msg.classList.add("message", clase);// asignar clases
        msg.textContent = texto; // asignarel texto al div 
        messages.appendChild(msg);//Agregar el mensaje al area del chat
        messages.scrollTop = messages.scrollHeight; //Manda al final del chat
    }

    // función que analiza lo que escribio el usuario y genera una respuesta
    function analizarMensaje(texto) {
        const textoRecibido = texto.toLowerCase(); //Convertir todo a miniscula

        // Buscr si el texto recibido contiene una propiedad css del diccionario
        for(const propiedad in propiedadesCSS) {
            if(textoRecibido.includes(propiedad)) {
                return propiedadesCSS[propiedad]; //Devolver la respuesta encontrda
            }
        }

        //Si no encuentra nada
        return "La propiedad no se encuentra en el diccionario CSS.";
    }

    //funcion para enviar el mensaje
    function enviarMensaje() {
        const texto = input.value.trim();// obtenert txt sin espacios
        if(texto === "") return;
        agregarMensaje(texto, "user");//mostrar el msg del usuario
        input.value = "";
        input.focus();
    
    
    // esperar 0.5 segundos antes de mostrar la respuesta de bot
    setTimeout(function() {
        const respuesta = analizarMensaje(texto);//Obtener la respuesta del bot
        agregarMensaje(respuesta,"bot");
    },500);

}

    //capturar eventos
    sendBtn.addEventListener("click", enviarMensaje);

    input.addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            enviarMensaje();
        }
    })
})