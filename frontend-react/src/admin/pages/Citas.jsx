import { useEffect, useState } from 'react';
import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuUser } from "react-icons/lu";
import * as config_tabla_citas from '../config/config_tabla_citas';
import Tabla from '../components/Tabla';
import Navbar from '../components/Navbar';
import ModalEditarCita from '../components/ModalEditarCita';

const url = "http://localhost:5000/citas";

function Citas() {
  const [documento, setDocumento] = useState('');
  const [servicios, setServicios] = useState([]);
  const [datosAEditar, setDatosAEditar] = useState(null);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [modalidades, setModalidades] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState('');
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/servicios')
      .then(res => res.json())
      .then(data => setServicios(data));

    fetch('http://localhost:5000/modalidad')
      .then(res => res.json())
      .then(data => setModalidades(data));
  }, []);

  useEffect(() => {
    if (!servicioSeleccionado) {
      setProfesionales([]);
      setProfesionalSeleccionado('');
      return;
    }

    fetch(`http://localhost:5000/servicios/${servicioSeleccionado}/profesionales`)
      .then(res => res.json())
      .then(data => {
        setProfesionales(data);
        setProfesionalSeleccionado('');
      });
  }, [servicioSeleccionado]);
  

  const buscarHorarios = async () => {
    if (!servicioSeleccionado || !modalidadSeleccionada || !profesionalSeleccionado) return;

    let url = `http://localhost:5000/horarios-disponibles?servicio_id=${servicioSeleccionado}&modalidad_id=${modalidadSeleccionada}&profesional_id=${profesionalSeleccionado}`;
    if (fecha) url += `&fecha=${fecha}`;

    const res = await fetch(url);
    const data = await res.json();
    setHorarios(data);
  };

  const agendarCita = async (horario) => {
    try {
      const clienteRes = await fetch(`http://localhost:5000/clientes/cedula/${documento}`);
      const cliente = await clienteRes.json();

      if (!cliente.id) {
        alert('Cliente no encontrado');
        return;
      }

      const cita = {
        fecha: horario.fecha,
        estado: "pendiente",
        hora_inicio: horario.hora_inicio,
        hora_fin: horario.hora_fin,
        Clientes_id: cliente.id,
        Profesionales_id: profesionalSeleccionado,
        Servicios_id: servicioSeleccionado,
        sede_id: horario.sede_id
      };

      console.log('📤 Datos que se envían a /citas:', cita);

      const res = await fetch('http://localhost:5000/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cita)
      });

      if (!res.ok) throw new Error('Error al agendar cita');

      alert('Cita agendada con éxito');
      buscarHorarios();
    } catch (error) {
      alert(error.message);
    }
  };

 const eliminarCita = async (id) => {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar Cita');
  };



  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 px-8 py-6">
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-full p-6 flex-col">
          <Tabs.Root defaultValue="members">
            <Tabs.List>
              <Tabs.Trigger value="members">
                <LuUser />
                Agendar cita
              </Tabs.Trigger>
              <Tabs.Trigger value="projects">
                <LuFolder />
                Citas
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="members">
              <div className="flex gap-8 w-full">
                {/* FORMULARIO IZQUIERDA */}
                <div className="flex flex-col gap-4 w-1/2">
                  <div>
                    <label className="block text-sm font-medium">Número de documento del paciente</label>
                    <input
                      type="text"
                      value={documento}
                      onChange={e => setDocumento(e.target.value)}
                      className="border px-3 py-2 rounded w-full mt-1"
                      placeholder="Ingrese su número de documento"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Servicio</label>
                    <select
                      value={servicioSeleccionado}
                      onChange={e => setServicioSeleccionado(e.target.value)}
                      className="border px-3 py-2 rounded w-full mt-1"
                    >
                      <option value="">Seleccione un servicio</option>
                      {servicios.map(s => (
                        <option key={s.id} value={s.id}>{s.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Profesional</label>
                    <select
                      value={profesionalSeleccionado}
                      onChange={e => setProfesionalSeleccionado(e.target.value)}
                      className="border px-3 py-2 rounded w-full mt-1"
                    >
                      <option value="">Seleccione un profesional</option>
                      {profesionales.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Modalidad</label>
                    <select
                      value={modalidadSeleccionada}
                      onChange={e => setModalidadSeleccionada(e.target.value)}
                      className="border px-3 py-2 rounded w-full mt-1"
                    >
                      <option value="">Seleccione una modalidad</option>
                      {modalidades.map(m => (
                        <option key={m.id} value={m.id}>{m.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Fecha (opcional)</label>
                    <input
                      type="date"
                      value={fecha}
                      onChange={e => setFecha(e.target.value)}
                      className="border px-3 py-2 rounded w-full mt-1"
                    />
                  </div>

                  <button
                    onClick={buscarHorarios}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  >
                    Buscar horarios disponibles
                  </button>
                </div>

                {/* TABLA DERECHA */}
                <div className="flex-1 border rounded p-4">
                  <h2 className="text-center font-semibold mb-2">Horarios disponibles</h2>
                  <table className="w-full border">
                    <thead>
                      <tr>
                        <th className="border p-2">Fecha</th>
                        <th className="border p-2">Hora Inicio</th>
                        <th className="border p-2">Hora Fin</th>
                        <th className="border p-2">Profesional</th>
                        <th className="border p-2">Estado</th>
                        <th className="border p-2">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {horarios.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center p-4">No hay horarios disponibles</td>
                        </tr>
                      ) : (
                        horarios.map((h) => (
                          <tr key={h.id}>
                            <td className="border p-2">{h.fecha}</td>
                            <td className="border p-2">{h.hora_inicio}</td>
                            <td className="border p-2">{h.hora_fin}</td>
                            <td className="border p-2">{h.profesional_nombre}</td>
                            <td className="border p-2">{h.estado}</td>
                            <td className="border p-2">
                              <button
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                onClick={() => agendarCita(h)}
                              >
                                Agendar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Tabs.Content>

            <ModalEditarCita
            isOpen={showModalEditar}
            OnClose={() => setShowModalEditar(false)}
            datosIniciales={datosAEditar}
            />

            <Tabs.Content value="projects">
              <Tabla
                conf_tabla={config_tabla_citas}
                url_api={url}
                onEdit={(fila) => {
                  console.log('Datos de fila al editar:', fila);
                  setDatosAEditar(fila);
                  setShowModalEditar(true);
                }}
                 onDelete={(fila) => {
                  if (confirm(`¿Estás seguro de eliminar a ${fila.name} ${fila.apellido}?`)) {
                    eliminarCita(fila.id).then(() => window.location.reload());
                  }
                }}
              />           
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}

export default Citas;
