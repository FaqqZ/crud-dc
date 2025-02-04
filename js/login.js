// Recuperar registros previos de localStorage o inicializar array vacío
const registros = JSON.parse(localStorage.getItem("registros")) || [];

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue

    // Capturar valores del formulario
    const dia = document.getElementById("dia_de_guardia").value.trim();
    const guardia = document.getElementById("guardia_de_turno").value.trim();

    // Verificar que los campos no estén vacíos
    if (dia === "" || guardia === "") {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Crear objeto y agregarlo al array
    const nuevoRegistro = { dia, guardia };
    registros.push(nuevoRegistro);

    // Guardar en localStorage
    localStorage.setItem("registros", JSON.stringify(registros));

    console.log("Registros almacenados:", registros); // Ver en consola

    // Limpiar formulario
    form.reset();

    // Cerrar modal después del registro
    const modal = bootstrap.Modal.getInstance(document.getElementById("login-modal"));
    modal.hide();

    window.location.href = "routes/reclamos.html";

  });
});
