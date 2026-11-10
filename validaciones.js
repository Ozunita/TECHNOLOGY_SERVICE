c
const formulario = document.getElementById("formulario");
const fecha = document.getElementById("fecha");
const mensaje = document.getElementById("mensaje");

// Colocar la fecha actual
function fechaLocal() {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
}

fecha.value = fechaLocal();
fecha.min = fechaLocal();

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const curso = document.getElementById("curso").value;

    const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
    const numeroValido = /^09[0-9]{8}$/;

    mensaje.textContent = "";
    mensaje.style.color = "#b91c1c";

    if (!soloLetras.test(nombre) || nombre.length < 2) {
        mensaje.textContent = "Ingresa un nombre válido, solo letras.";
        document.getElementById("nombre").focus();
        return;
    }

    if (!soloLetras.test(apellido) || apellido.length < 2) {
        mensaje.textContent = "Ingresa un apellido válido.";
        document.getElementById("apellido").focus();
        return;
    }

    if (!document.getElementById("correo").checkValidity()) {
        mensaje.textContent = "Ingresa un correo electrónico válido.";
        document.getElementById("correo").focus();
        return;
    }

    if (!numeroValido.test(telefono)) {
        mensaje.textContent = "El teléfono debe tener 10 dígitos e iniciar con 09.";
        document.getElementById("telefono").focus();
        return;
    }

    if (!fecha.value || fecha.value < fechaLocal()) {
        mensaje.textContent = "Selecciona una fecha válida.";
        fecha.focus();
        return;
    }

    if (curso === "") {
        mensaje.textContent = "Debes seleccionar un curso.";
        document.getElementById("curso").focus();
        return;
    }

    mensaje.style.color = "#166534";
    mensaje.textContent = "Datos validados correctamente. Tu inscripción está lista para enviarse.";
});

formulario.addEventListener("reset", function () {
    mensaje.textContent = "";

    setTimeout(function () {
        fecha.value = fechaLocal();
    }, 0);
});
