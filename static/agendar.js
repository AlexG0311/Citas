document.addEventListener('DOMContentLoaded', () => {
  const servicioSelect = document.getElementById('servicio');
  const modalidadSelect = document.getElementById('modalidad');
  const tablaContenedor = document.getElementById('tabla-contenedor');
  const tablaDoctores = document.getElementById('tabla-doctores');

  // cargar modalidades al iniciar
  axios.get('/get_modalidades')
    .then(res => {
      res.data.forEach(mod => {
        const opt = document.createElement('option');
        opt.value = mod.id;
        opt.textContent = mod.nombre;
        modalidadSelect.appendChild(opt);
      });
    })
    .catch(err => console.error(err));

  // cuando cambian servicio o modalidad
  servicioSelect.addEventListener('change', actualizarTabla);
  modalidadSelect.addEventListener('change', actualizarTabla);

  function actualizarTabla() {
    const servicioId = servicioSelect.value;
    const modalidad = modalidadSelect.value;

    if (!servicioId || !modalidad) {
      tablaContenedor.classList.add('hidden');
      return;
    }

    axios.get('/get_doctores_con_horarios', {
      params: { servicio_id: servicioId, modalidad: modalidad }
    })
      .then(res => {
        tablaDoctores.innerHTML = '';
        const datos = res.data;

        if (datos.length === 0) {
          tablaDoctores.innerHTML = `<tr><td colspan="8" class="text-center py-4">No hay horarios disponibles</td></tr>`;
          tablaContenedor.classList.remove('hidden');
          return;
        }

        datos.forEach(item => {
          const tr = document.createElement('tr');

          tr.innerHTML = `
            <td class="border px-3 py-2">${item.doctor}</td>
            <td class="border px-3 py-2">${item.especialidad}</td>
            <td class="border px-3 py-2">${item.dia}</td>
            <td class="border px-3 py-2">${item.fecha}</td>
            <td class="border px-3 py-2">${item.hora_inicio}</td>
            <td class="border px-3 py-2">${item.hora_fin}</td>
            <td class="border px-3 py-2">${item.sede}</td>
            <td class="border px-3 py-2">
              <button class="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
                      data-profesional="${item.profesional_id}"
                      data-servicio="${item.servicio_id}"
                      data-sede="${item.sede_id}"
                      data-fecha="${item.fecha}"
                      data-hora="${item.hora_inicio}">
                Agendar
              </button>
            </td>
          `;

          tablaDoctores.appendChild(tr);
        });

        tablaContenedor.classList.remove('hidden');

        // Agregar eventos a los nuevos botones
        document.querySelectorAll('#tabla-doctores button').forEach(btn => {
          btn.addEventListener('click', () => {
            const payload = {
              profesional_id: btn.dataset.profesional,
              servicio_id: btn.dataset.servicio,
              sede_id: btn.dataset.sede,
              fecha: btn.dataset.fecha,
              hora_inicio: btn.dataset.hora
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
        tablaDoctores.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-red-500">Error al cargar los datos</td></tr>`;
        tablaContenedor.classList.remove('hidden');
      });
  }
});
