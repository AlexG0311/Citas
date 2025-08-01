import { useState } from "react";
import './modal.css';

export default function ModalCrearProfesional({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    cedula:'',
    telefono: '',
    especialidad: '',
    contrasena: '',
    estado: 1,
    sede_id: ''
  });

  const [mensaje, setMensaje] = useState(null);

  const handleClose = () => {
    setMensaje(null);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setMensaje({ tipo: 'success', texto: 'Profesional agregado correctamente' });
      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        cedula:'',
        telefono: '',
        especialidad: '',
        contraseña: '',
        estado: 1,
        sede_id: ''
      });
    } catch (error) {
      setMensaje({ tipo: error, texto: 'Error al guardar el profesional' });
    }
    setTimeout(() => setMensaje(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={handleClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Agregar Profesional</h2>

        {mensaje && (
          <div className={`mb-4 p-2 text-sm rounded ${mensaje.tipo === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {['nombre', 'apellido', 'correo', 'cedula', 'telefono', 'especialidad', 'contraseña', 'sede_id'].map((campo) => (
            <input
              key={campo}
              name={campo}
              type={campo === 'correo' ? 'email' : campo === 'contraseña' ? 'password' : 'text'}
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              value={formData[campo]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          ))}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
