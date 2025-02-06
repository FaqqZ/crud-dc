document.getElementById("reclamoForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const descripcion = document.getElementById("descripcion-reclamo").value;
    const ubicacion = document.getElementById("domicilio-reclamo").value;
    const tipoReclamo = document.querySelector(
      'select[aria-label="tipo-de-reclamo-desc"]'
    ).value;
    const derivadoA = document.querySelector(
      'select[aria-label="derivado-a-desc"]'
    ).value;
    const fecha = document.getElementById("fecha-reclamo").value; // Cambié el selector a input[type="date"]
  
    // Verificar si la fecha es válida
    if (!fecha) {
      alert("Por favor, seleccione una fecha válida.");
      return;
    }
  
    console.log("Fecha seleccionada:", fecha); // Verifica el valor de la fecha

    const dia = localStorage.getItem("DIA") || "No definido";
    const guardia = localStorage.getItem("GUARDIA") || "No definido";
  
    let reclamos = JSON.parse(localStorage.getItem("RECLAMOS")) || [];
    reclamos.push({
      descripcion,
      ubicacion,
      tipoReclamo,
      derivadoA,
      fecha, // Agregar la fecha seleccionada
    });
  
    console.log("Reclamos guardados:", reclamos); // Verifica que los reclamos se hayan guardado correctamente
    
    localStorage.setItem("RECLAMOS", JSON.stringify(reclamos));
  
    window.location.href = "tabla.html";
});
