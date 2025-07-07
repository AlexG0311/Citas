import Navbar from '../components/Navbar'
import Tabla from '../components/Tabla'
import * as conf_tabla_servicios from '../components/config_tabla_personal';

const url = "http://localhost:5000/servicios";

function ListadoPersonal() {

   return (
   <div className="min-h-screen flex flex-col">
      {/* Navbar arriba */} 
      <Navbar />

      {/* Contenido cor margen */}
      <div className="flex-1 px-8 py-6">
       <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
 

        {/* Contenido principal */}
        <div className="fbg-white w-full  rounded shadow-md  ">
          
              <div className="overflow-x-auto">
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
export default ListadoPersonal

