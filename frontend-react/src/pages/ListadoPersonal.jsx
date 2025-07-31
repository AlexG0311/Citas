import { useState } from 'react';
import Navbar from '../components/Navbar';
import Tabla from '../components/Tabla';
import ModalCrearProfesional from '../components/ModalCrearProfesional';
import ModalEditarProfesional from '../components/ModalEditarProfesional';
import * as conf_tabla_servicios from '../config/config_tabla_personal';

const url = "http://localhost:5000/profesionales";

function ListadoPersonal() {
  const [showModalCrear, setShowModalCrear] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [datosAEditar, setDatosAEditar] = useState(null);

  const crearProfesional = async (data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al crear profesional');
  };

  const editarProfesional = async (data) => {
    const res = await fetch(`${url}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al actualizar profesional');
  };

  const eliminarProfesional = async (id) => {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar profesional');
  };

  return (
    <div className="min-h-screen  bg-white text-black  dark:bg-black flex flex-col  ">
      <Navbar />

      <div className="flex-1 px-8 py-6  ">
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden dark:bg-black">
          <div className="   bg-white  text-black dark:bg-gray-800   dark:text-white p-10  w-full dark:text-white rounded shadow-md">
            <div className="overflow-x-auto">

              {/* Botón para abrir modal (CREAR) */}
              <div className="flex justify-end my-2 mr-4">
                <button
                  onClick={() => setShowModalCrear(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Agregar Profesional
                </button>
              </div>

              {/* Tabla con acciones */}
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

              {/* Modales separados */}
              <ModalCrearProfesional
                isOpen={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                onSubmit={crearProfesional}
              />

              <ModalEditarProfesional
                isOpen={showModalEditar}
                onClose={() => setShowModalEditar(false)}
                onSubmit={editarProfesional}
                datosIniciales={datosAEditar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListadoPersonal;
