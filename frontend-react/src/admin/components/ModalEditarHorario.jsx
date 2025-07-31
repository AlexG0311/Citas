import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect , useState } from 'react'
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
const profesionales = ['Dra. Ana Torres', 'Dr. Juan Pérez', 'Lic. Sofía Ríos']



export default function ModalEditarHorario({isOpen, onClose, datosIniciales, onSubmit}){
const [profesional, setProfesional] = useState('')

 useEffect(() => {
    import('cally') // asegúrate de registrar el componente web
  }, [])

 if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };
  
return(
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"  >
<div className="bg-white  p-8 rounded-lg shadow-lg  dark:bg-black dark:text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Asignar Horario</h2>

          {/* Profesional */}
          <div className="flex justify-center w-full mb-6">
            <div className="w-40">
              <label className="block font-medium mb-1">Profesional:</label>
              <select
                className="w-full border px-4 py-2 rounded"
                value={profesional}
                onChange={(e) => setProfesional(e.target.value)}
              >
                <option value="">Seleccione</option>
                {profesionales.map((pro, i) => (
                  <option key={i} value={pro}>
                    {pro}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {/* Fecha */}
        <div  className='flex flex-graw '>
          <div>
          <label className="block font-medium  mb-1">Asignar Fecha:</label>
          <calendar-date class="cally  bg-base-100 w-70 h-80  mt-10 border  border-base-300 shadow-lg rounded-box dark:bg-black dark:text-white">
            <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
            <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
            <calendar-month></calendar-month>
          </calendar-date>
          </div>    
          {/* Hora */}
          <div className="mb-6 ml-20  ">
            <label className="block  font-medium mb-1 ">Hora:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                 <DemoContainer
                 components={[
                 'StaticTimePicker',
                  ]}
                 >
                <DemoItem className='dark:bg-black dark:text-white'>
                  <StaticTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                </DemoItem>
              </DemoContainer>
              </LocalizationProvider>
          </div>
         </div>

          {/* Botón */}
          <button
            className="w-full mb-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Establecer Horario
          </button>

            {/* Botón */}
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"  onClick={handleClose}
          >
           Cancelar
          </button>
        </div>
  </div>
  
    );
}