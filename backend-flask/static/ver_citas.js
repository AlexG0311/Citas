function cancelarCita(citaId) {
  if (!confirm("¿Estás seguro que deseas cancelar esta cita?")) return;

  fetch(`/cancelar_cita/${citaId}`, {
      method: 'POST'
  })
  .then(res => res.json())
  .then(data => {
      alert(data.message);
      const fila = document.getElementById(`cita-${citaId}`);
      if (fila) fila.remove();
  })
  .catch(err => {
      console.error(err);
      alert("Error al cancelar la cita.");
  });
}
