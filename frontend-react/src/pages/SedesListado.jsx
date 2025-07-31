import Navbar from '../components/Navbar'
import Tabla from '../components/Tabla'
import * as conf_tabla_servicios from '../config/config_tabla_sedes';

const url = "http://localhost:5000/sedes";

function Citas() {

   return (
   <div className="min-h-screen flex flex-col   dark:bg-black">
      {/* Navbar arriba */} 
      <Navbar />

      {/* Contenido cor margen */}
      <div className="flex-1 px-8 py-6">
       <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
 

        {/* Contenido principal */}
        <div className="fbg-white w-full  rounded shadow-md p-10 dark:bg-gray-800 ">
          
              <div className="overflow-x-auto dark:text-white text-black ">
                    <Tabla 
                    conf_tabla ={conf_tabla_servicios}
                    url_api = {url} 
                    
                    />
              </div>
         
        </div>
      </div>
    </div>
    </div>
  )
}
export default Citas

