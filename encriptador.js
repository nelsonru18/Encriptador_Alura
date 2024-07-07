const textArea = document.querySelector(".formulario_input");
const imagenDetective = document.querySelector(".result_img");
const loaderSpinner = document.querySelector(".loader");
const asideTitulo = document.querySelector(".aside_titulo");
const asideTexto = document.querySelector(".aside_texto");
const buttonEncriptar = document.querySelector(".button_encriptar");
const buttonDesencriptar = document.querySelector(".button_desencriptar");
const botonCopiar = document.querySelector(".result_btn");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

let textoEncriptado = "";
let textoDesencriptado = "";

// Función para encriptar*******

function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

// Función para desencriptar*******

function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

// Función para ajustar el tamaño del textarea

function ajustarTextArea() {
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
}

// Ocultar elementos y mostrar spinner al escribir en el textarea

textArea.addEventListener("input", () => {
    if (textArea.value.trim()) {
        // Si hay texto en el textarea
        loaderSpinner.classList.remove("hidden");
        imagenDetective.style.display = "none";
        asideTitulo.textContent = "Encriptando mensaje...";
        asideTexto.textContent = "";
        botonCopiar.classList.add("hidden"); // Ocultar botón de copiar
    } else {
        // Si el textarea está vacío
        loaderSpinner.classList.add("hidden");
        imagenDetective.style.display = "block";
        asideTitulo.textContent = "Ningún mensaje fue encontrado";
        asideTexto.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
        botonCopiar.classList.add("hidden"); // Ocultar botón de copiar
    }
    ajustarTextArea();
});

// Función para encriptar

buttonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    
    if (textoEncriptado === mensaje) {
        alert("El texto ya está encriptado.");
        return;
    }
    
    textoEncriptado = encriptarMensaje(mensaje);
    asideTexto.textContent = textoEncriptado;
    botonCopiar.classList.remove("hidden"); 
    asideTitulo.textContent = "El resultado es:";
    ajustarTextArea();
});

// Función para desencriptar

buttonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    
    if (textoDesencriptado === mensaje) {
        alert("El texto ya está desencriptado.");
        return;
    }
    
    textoDesencriptado = desencriptarMensaje(mensaje);
    asideTexto.textContent = textoDesencriptado;
    botonCopiar.classList.remove("hidden"); // Mostrar botón de copiar
    asideTitulo.textContent = "El resultado es:";
    ajustarTextArea(); 
});

// Función para copiar el texto encriptado o desencriptado al portapapeles

botonCopiar.addEventListener("click", () => {
    let textoCopiado = asideTexto.textContent;
    imagenDetective.style.display = "block";
    loaderSpinner.classList.add("hidden");
    
    let textarea = document.createElement("textarea");
    textarea.value = textoCopiado;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setTimeout(() => {
        alert("Texto copiado al portapapeles: " + textoCopiado);
    }, 100);
});



