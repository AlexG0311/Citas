import Navbar from '../components/Navbar';
import Tabla from '../components/Tabla';
import ModalCrearServicio from '../components/ModalCrearServicio';
import { useState } from "react";
import ModalEditarServicio from '../components/ModalEditarServicio';
import * as conf_tabla_servicios from '../config/config_tabla_servicios';
import ModalAsociarServicio from '../components/ModalAsociarServicio';
const url = "http://localhost:5000/servicios";

function CrearServicio() {
  const [showModal, setShowModal] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [datosAEditar, setDatosAEditar] = useState(null);
  const [showModalAsignar, setShowModalAsignar] = useState(false);

  const handleAddServicio = async (servicioData) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(servicioData)
      });

      if (!res.ok) {
        throw new Error("Error al crear el servicio");
      }

      const data = await res.json();
      console.log("Servicio creado:", data);
      // Aquí puedes recargar datos si lo deseas
    } catch (error) {
      console.error("Error al agregar servicio:", error);
    }
  };



const AsignarServicios = async ({ profesional_id, servicio_id }) => {
  try {
    const res = await fetch("http://localhost:5000/asociar_servicio_profesional", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profesional_id, servicio_id })
    });

    const data = await res.json();
    alert(data.message || "Servicio asignado correctamente");
  } catch (error) {
    console.error("Error al asignar servicio:", error);
    alert("Ocurrió un error al asignar el servicio.");
  }
};



 const eliminarProfesional = async (id) => {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar profesional');
  };

const editarServicio = async (data) => {
    const res = await fetch(`${url}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al actualizar profesional');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-8 py-6">
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-full">
            <div className="overflow-x-auto">
              <button
                onClick={() => setShowModal(true)}
                className="bg-black text-white px-4 ml-4 mb-2 py-2 rounded hover:bg-gray-400"
              >
                Agregar Servicio
              </button>

                <button
                onClick={() => setShowModalAsignar(true)}
                className="bg-black text-white px-4 ml-4 mb-2 py-2 rounded hover:bg-gray-400"
              >
                Asignar servicio
              </button>

              <ModalCrearServicio
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddServicio}
              />

              <ModalAsociarServicio
                isOpen={showModalAsignar}
                onClose={() => setShowModalAsignar(false)}
                onSubmit={AsignarServicios}
              />


                <ModalEditarServicio
                 isOpen={showModalEditar}
                 onClose={() => setShowModalEditar(false)}
                 onSubmit={editarServicio}
                 datosIniciales={datosAEditar}
               />             

              <Tabla
                conf_tabla={conf_tabla_servicios}
                url_api={url}
                onEdit={(fila) => {
                  console.log('Datos de fila al editar:', fila);
                  setDatosAEditar(fila);
                  setShowModalEditar(true);
                }}
                onDelete={(fila) => {
                  if (confirm(`¿Estás seguro de eliminar a ${fila.name} ${fila.apellido}?`)) {
                    eliminarProfesional(fila.id).then(() => window.location.reload());
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearServicio;
