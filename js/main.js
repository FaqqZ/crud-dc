document.addEventListener("DOMContentLoaded", function () {
    // Recuperar los registros de "registros" y "RECLAMOS" de localStorage
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const reclamos = JSON.parse(localStorage.getItem("RECLAMOS")) || [];
  
    // Obtener el último registro de "registros"
    const ultimoRegistro =
      registros.length > 0
        ? registros[registros.length - 1]
        : { dia: "No definido", guardia: "No definido" };
  
    // Verificar si los inputs existen antes de intentar llenarlos
    const diaInput = document.getElementById("dia_de_guardia");
    const guardiaInput = document.getElementById("guardia_de_turno");
  
    if (diaInput && guardiaInput) {
      diaInput.value = ultimoRegistro.dia;
      guardiaInput.value = ultimoRegistro.guardia;
    } else {
      console.warn("⚠️ No se encontraron los inputs de DIA y GUARDIA en el DOM.");
    }
  
    // Obtener la referencia al tbody de la tabla
    const tablaBody = document.querySelector("#tabla-reclamos tbody");
  
    if (!tablaBody) {
      console.warn("⚠️ No se encontró el tbody de la tabla.");
      return; // Detener ejecución si no hay tabla
    }
  
    // Usar un fragmento para mejorar el rendimiento
    const fragmento = document.createDocumentFragment();
  
    // Llenar la tabla con los datos de reclamos
    reclamos.forEach((reclamo, index) => {
      // Obtener el registro correspondiente o valores por defecto
      const registro = registros[index] || {
        dia: "No definido",
        guardia: "No definido",
      };
  
      // Verificar si la fecha está definida, si no asignar un valor predeterminado
      const fecha = reclamo.fecha || "Fecha no definida";
  
      // Verificar si hay opciones en el select para evitar errores
      const tipoReclamoTexto = obtenerTextoDeSelect(
        "tipo-de-reclamo-desc",
        reclamo.tipoReclamo
      );
      const derivadoATexto = obtenerTextoDeSelect(
        "derivado-a-desc",
        reclamo.derivadoA
      );
  
      // Crear una nueva fila
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${registro.dia}</td>
        <td>${registro.guardia}</td>
        <td>${fecha}</td> <!-- Usar la fecha guardada o valor predeterminado -->
        <td>${reclamo.descripcion || "Sin descripción"}</td>
        <td>${reclamo.ubicacion || "Sin ubicación"}</td>
        <td>${tipoReclamoTexto || "No especificado"}</td>
        <td>${derivadoATexto || "No especificado"}</td>
      `;
  
      // Agregar la fila al fragmento
      fragmento.appendChild(fila);
    });
  
    // Finalmente, agregar el fragmento al tbody
    tablaBody.appendChild(fragmento);
});
  
// Función para obtener el texto visible de un select basado en su valor guardado
function obtenerTextoDeSelect(ariaLabel, valorGuardado) {
    const select = document.querySelector(`select[aria-label="${ariaLabel}"]`);
    if (!select) return valorGuardado; // Si el select no existe, devolver el valor sin cambios
  
    const opcionSeleccionada = [...select.options].find(
      (option) => option.value === valorGuardado
    );
    return opcionSeleccionada ? opcionSeleccionada.textContent : valorGuardado;
}
