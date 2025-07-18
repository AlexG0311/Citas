document.addEventListener('DOMContentLoaded', () => {
  const tablaContenedor = document.getElementById('tabla-contenedor');
  const tablaDoctores = document.getElementById('tabla-doctores');
  const servicioSelect = document.getElementById('servicio');
  const modalidadSelect = document.getElementById('modalidad');

  servicioSelect.addEventListener('change', actualizarTabla);
  modalidadSelect.addEventListener('change', actualizarTabla);

  function actualizarTabla() {
    const servicioId = servicioSelect.value;
    const modalidadId = modalidadSelect.value;

    if (!servicioId || !modalidadId) {
      tablaContenedor.classList.add('hidden');
      tablaDoctores.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-4">
            Selecciona servicio y modalidad para ver horarios
          </td>
        </tr>`;
      return;
    }

    axios.get('/get_doctores_con_horarios', {
      params: {
        servicio_id: servicioId,
        modalidad: modalidadId
      }
    })
      .then(res => {
        tablaDoctores.innerHTML = '';
        const datos = res.data;

        if (datos.length === 0) {
          tablaDoctores.innerHTML = `
            <tr>
              <td colspan="9" class="text-center py-4">No hay horarios disponibles</td>
            </tr>`;
          tablaContenedor.classList.remove('hidden');
          return;
        }

        datos.forEach(item => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td class="border px-3 py-2">${item.doctor}</td>
            <td class="border px-3 py-2">${item.servicio}</td>
            <td class="border px-3 py-2">${item.fecha}</td>
            <td class="border px-3 py-2">${item.hora_inicio}</td>
            <td class="border px-3 py-2">${item.hora_fin}</td>
            <td class="border px-3 py-2">${item.sede}</td>
            <td class="border px-3 py-2">${item.modalidad}</td>
            <td class="border px-3 py-2">
              <button
                class="agendar-btn bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                data-profesional="${item.profesional_id}"
                data-servicio="${item.servicio_id}"
                data-sede="${item.sede_id}"
                data-fecha="${item.fecha}"
                data-hora="${item.hora_inicio}"
                data-modalidad="${item.modalidad_id}">
                Agendar
              </button>
            </td>`;
          tablaDoctores.appendChild(tr);
        });

        tablaContenedor.classList.remove('hidden');

        document.querySelectorAll('#tabla-doctores .agendar-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const payload = {
              profesional_id: btn.dataset.profesional,
              servicio_id: btn.dataset.servicio,
              sede_id: btn.dataset.sede,
              fecha: btn.dataset.fecha,
              hora_inicio: btn.dataset.hora,
              modalidad_id: btn.dataset.modalidad
            };

            if (!confirm(`¿Confirmar cita para el ${payload.fecha} a las ${payload.hora_inicio}?`)) {
              return;
            }

            axios.post('/guardar_cita', payload)
              .then(res => {
                alert(res.data.message);
                actualizarTabla(); // refresca tabla
              })
              .catch(err => {
                console.error(err);
                alert('Ocurrió un error al agendar la cita');
              });
          });
        });
      })
      .catch(err => {
        console.error(err);
        tablaDoctores.innerHTML = `
          <tr>
            <td colspan="9" class="text-center py-4 text-red-500">
              Error al cargar los datos
            </td>
          </tr>`;
        tablaContenedor.classList.remove('hidden');
      });
  }
});


function cargarHorarios() {
    const servicio = document.getElementById("servicio").value;
    const modalidad = document.getElementById("modalidad").value;

    if (!servicio || !modalidad) return;

    axios.get('/get_doctores_con_horarios', {
        params: {
            servicio_id: servicio,
            modalidad: modalidad
        }
    }).then(response => {
        const data = response.data;
        const tbody = document.getElementById("tabla-doctores");
        tbody.innerHTML = "";

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-red-500">No hay horarios disponibles</td></tr>`;
            return;
        }

        data.forEach(item => {
            const fila = `
                <tr>
                    <td class="border px-3 py-2">${item.doctor}</td>
                    <td class="border px-3 py-2">${item.especialidad}</td>
                    <td class="border px-3 py-2">${item.dia}</td>
                    <td class="border px-3 py-2">${item.fecha}</td>
                    <td class="border px-3 py-2">${item.hora_inicio}</td>
                    <td class="border px-3 py-2">${item.hora_fin}</td>
                    <td class="border px-3 py-2">${item.sede}</td>
                    <td class="border px-3 py-2">${item.modalidad}</td>
                    <td class="border px-3 py-2">
                        <button onclick='agendarCita(${JSON.stringify(item)})'
                                class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                            Agendar
                        </button>
                    </td>
                </tr>`;
            tbody.innerHTML += fila;
        });

        document.getElementById("tabla-contenedor").classList.remove("hidden");
    }).catch(err => {
        console.error(err);
    });
}
