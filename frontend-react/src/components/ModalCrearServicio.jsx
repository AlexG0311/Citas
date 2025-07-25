import { useState, useEffect } from "react";

export default function ModalCrearServicio({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: "",
    duracion: "",
    estado: 1,
    fecha: new Date().toISOString().slice(0, 16),
    id_estado: ""
  });

  const [estados, setEstados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/estado-servicio") // Ajusta según tu endpoint
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .catch((err) => console.error("Error cargando estados:", err));
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };


      return (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={onClose}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Agregar Servicio</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Duración (min)</label>
                <input
                  type="number"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fecha</label>
                <input
                  type="datetime-local"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
              <select
              name="id_estado"
              value={formData.id_estado}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Seleccione un estado</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.nombre_estado}
                </option>
              ))}
            </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
