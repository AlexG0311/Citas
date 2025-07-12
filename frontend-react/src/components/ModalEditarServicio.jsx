import { useEffect, useState } from "react";

export default function ModalEditarServicio({ isOpen, onClose, onSubmit, datosIniciales }) {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    dur: '',
    date: new Date().toISOString().slice(0, 16),
    id_estado: ''
  });

  const [estados, setEstados] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (datosIniciales) {
      setFormData({
        id: datosIniciales.id ?? '',
        nombre: datosIniciales.name ?? '',
        dur: datosIniciales.dur ?? '',
        date: datosIniciales.date?.slice(0, 16) ?? new Date().toISOString().slice(0, 16),
        id_estado: datosIniciales.id_estado ?? ''
      });
    }
  }, [datosIniciales]);

  useEffect(() => {
    fetch("http://localhost:5000/estado-servicio")
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setMensaje({ tipo: 'success', texto: 'Servicio actualizado correctamente' });
    } catch (error) {
      setMensaje({ tipo: error, texto: 'Error al actualizar el servicio' });
    }
    setTimeout(() => setMensaje(null), 3000);
  };

  const handleClose = () => {
    setMensaje(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={handleClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Editar Servicio</h2>

        {mensaje && (
          <div className={`mb-4 p-2 text-sm rounded ${mensaje.tipo === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="nombre" // ← Corregido
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
            name="dur" // ← Corregido
            value={formData.dur}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Fecha</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Estado</label>
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

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Actualizar</button>
        </div>
      </form>

      </div>
    </div>
  );
}
