import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchClientes } from "../services/fetchClientes";
import { fetchProfesional } from "../services/fetchProfesional";
import { fetchServicios } from "../services/fetchServicios";
import { fetchSedes} from "../services/fetchSedes";

function ModalEditarCita({isOpen, OnClose, datosIniciales }){

const [formData, setFormData] = useState({    
    id: '',
    fecha: '',
    estado: '',
    hora_inicio: '',
    hora_fin: '',
    cliente: '',
    profesional: '',
    servicio:'',
    sede: ''
  });

  const [estados, setEstados] = useState([]);
  const [mensaje, setMensaje] = useState(null);

const [clientes, setClientes] = useState([]);
const [profesionales, setProfesional] = useState([]);
const [servicios, setServicios] = useState([]);
const [sedes, setSede] = useState([]);

useEffect(() =>{

fetchClientes().then(newCliente => setClientes(newCliente))
fetchServicios().then(newServicio => setServicios(newServicio))
fetchSedes().then(newSede => setSede(newSede))
},[])

async function getProfesional() {

const newProfional = await fetchProfesional();
setProfesional(newProfional)

}
getProfesional();

  useEffect(() => {
    if (datosIniciales) {
      setFormData({
    id: datosIniciales.id,
    fecha: datosIniciales.fecha,
    estado: datosIniciales.estado,
    hora_inicio: datosIniciales.hora_inicio,
    hora_fin: datosIniciales.hora_fin,
    cliente: datosIniciales.cliente,
    profesional:datosIniciales.profesional,
    servicio:datosIniciales.servicio,
    sede: datosIniciales.sede
    
      });
    }
  }, [datosIniciales]);

    

  if (!isOpen) return null;


 const  handleClose  = () =>{
    OnClose();
 }
  

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


return(


<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 bg-opacity-50">
<div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
    <h1 className="font-bold text-xl mb-5">EDITAR CITA</h1>
<div>
<label htmlFor="">FECHA:</label>
<input 
 type="date"
 name="fecha"  
 value={formData.fecha}
 onChange={handleChange}
 className="w-full border border-gray-300 rounded px-3 py-2" />
</div>

<div>
<label htmlFor="">ESTADO:</label>
<select 
name="estado"
onChange={handleChange}
value={formData.estado}
className="w-full border border-gray-300 rounded px-3 py-2">
    <option value={formData.estado}>
        {formData.estado}
    </option>
     <option value="Confirmada">
        Confirmada
    </option>
     <option value="Cancelada">
        Cancelada
    </option>
     <option value="Finalizada">
        Finalizada
    </option>
     <option value="No asistió">
        No asistio
    </option>
     <option value="En proceso">
        En Proceso
    </option>
</select>
</div>

<div>
<label htmlFor="">HORA DE INICIO:</label>
<input 
type="time" 
name="hora_inicio"
onChange={handleChange}
value={formData.hora_inicio}  
className="w-full border border-gray-300 rounded px-3 py-2" />
</div>

<div>
<label htmlFor="">HORA FINAL:</label>
<input 
onChange={handleChange}
type="time" 
name="hora_fin"
value={formData.hora_fin}  
className="w-full border border-gray-300 rounded px-3 py-2"/>
</div>

<div>
  <label htmlFor="">PACIENTE:</label>
  <Autocomplete
    disablePortal
    
    options={clientes}
    getOptionLabel={(option) =>
      `${option.nombre} ${option.apellido} - Cédula: ${option.cedula}`
    }
    sx={{ width: 400 }}
    value={clientes.find(c => c.id === formData.cliente) || null}
    onChange={(event, newValue) => {
      setFormData(prev => ({
        ...prev,
        cliente: newValue ? newValue.id : ''
      }));
    }}
    renderInput={(params) => <TextField {...params} label="Pacientes" />}
  />
</div>



<div>
  <label htmlFor="">PROFESIONAL:</label>
  <Autocomplete
    disablePortal
    options={profesionales}
    getOptionLabel={(option) =>
      `${option.nombre} ${option.apellido} - Cédula: ${option.cedula}`
    }
    sx={{ width: 400 }}
    value={profesionales.find(p => p.id === formData.profesional) || null}
    onChange={(event, newValue) => {
      setFormData(prev => ({
        ...prev,
        profesional: newValue ? newValue.id : ''
      }));
    }}
    renderInput={(params) => <TextField {...params} label="Pacientes" />}
  />
</div>

<div>
<label htmlFor="">SERVICIO:</label>
<select
    name="servicio"
    required
    value={formData.servicio}
    onChange={handleChange}
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

<div>
<label htmlFor="">SEDE:</label>
<select 
    name="sede" 
    value={formData.sede} 
    className="w-full border border-gray-300 rounded px-3 py-2"
    onChange={handleChange}>
   
   {sedes.map((se) => (
    <option  key={se.id} value={se.id}name = "sede">
         {se.nombre}
    </option>
))}
  
   
</select>
</div>

 <div className="flex justify-end gap-2 pt-2">
    <button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Actualizar</button>
</div>

</div>
</div>


);

}




export default ModalEditarCita;