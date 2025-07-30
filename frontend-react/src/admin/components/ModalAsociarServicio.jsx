import { useEffect, useState } from "react";

export default function AsociarServicio({ isOpen, onClose, onSubmit }) {
  const [profesionales, setProfesionales] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [profesionalId, setProfesionalId] = useState('');
  const [servicioId, setServicioId] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    fetch("http://localhost:5000/profesionales")
      .then(res => res.json())
      .then(data => setProfesionales(data));

    fetch("http://localhost:5000/servicios")
      .then(res => res.json())
      .then(data => setServicios(data));
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ profesional_id: profesionalId, servicio_id: servicioId });
    setProfesionalId('');
    setServicioId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-black/50  bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4 text-center">Asignar Servicio a Profesional</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Profesional</label>
            <select
              required
              value={profesionalId}
              onChange={(e) => setProfesionalId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Seleccione un profesional</option>
              {profesionales.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} {p.apellido}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Servicio</label>
            <select
              required
              value={servicioId}
              onChange={(e) => setServicioId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Seleccione un servicio</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Asignar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
