import { Dialog, Portal, CloseButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const ModalChakraUI = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    estado: "libre",
    fecha: new Date().toISOString().split("T")[0],
    hora_inicio: "",
    hora_fin: "",
    profesionales_id: "",
    modalidad_id: "",
    sede_id: "", // Nuevo campo
  });

  const [profesionales, setProfesionales] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [sedes, setSedes] = useState([]); // Lista de sedes
  const [selected, setSelected] = useState(new Date());

  useEffect(() => {
    fetch("http://localhost:5000/profesionales")
      .then((res) => res.json())
      .then((data) => setProfesionales(data));

    fetch("http://localhost:5000/modalidad")
      .then((res) => res.json())
      .then((data) => setModalidades(data));

    fetch("http://localhost:5000/sedes") // Obtener sedes
      .then((res) => res.json())
      .then((data) => setSedes(data));
  }, []);

  useEffect(() => {
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        fecha: selected.toISOString().split("T")[0],
      }));
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog.Root
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
      open={isOpen}
      onOpenChange={onClose}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="rounded-lg max-w-lg h-max mx-auto">
            <Dialog.Header>
              <Dialog.Title>Asignar un horario</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Profesional */}
                <div>
                  <label className="block font-medium mb-1">Profesional:</label>
                  <select
                    className="w-full border px-4 py-2 rounded"
                    name="profesionales_id"
                    value={formData.profesionales_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione</option>
                    {profesionales.map((pro) => (
                      <option key={pro.id} value={pro.id}>
                        {pro.nombre} {pro.apellido}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Modalidad */}
                <div>
                  <label className="block font-medium mb-1">Modalidad:</label>
                  <select
                    className="w-full border px-4 py-2 rounded"
                    name="modalidad_id"
                    value={formData.modalidad_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione</option>
                    {modalidades.map((mod) => (
                      <option key={mod.id} value={mod.id}>
                        {mod.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sede */}
                <div>
                  <label className="block font-medium mb-1">Sede:</label>
                  <select
                    className="w-full border px-4 py-2 rounded"
                    name="sede_id"
                    value={formData.sede_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una sede</option>
                    {sedes.map((sede) => (
                      <option key={sede.id} value={sede.id}>
                        {sede.nombre} - {sede.ciudad}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fecha */}
                <div>
                  <label className="block font-medium mb-1">Asignar Fecha:</label>
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    className="mx-auto"
                  />
                </div>

                {/* Hora Inicio / Fin */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Hora Inicio:</label>
                    <input
                      type="time"
                      name="hora_inicio"
                      value={formData.hora_inicio}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Hora Fin:</label>
                    <input
                      type="time"
                      name="hora_fin"
                      value={formData.hora_fin}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                      required
                    />
                  </div>
                </div>

                {/* Botón */}
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="w-60 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    Establecer Horario
                  </button>
                </div>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ModalChakraUI;
