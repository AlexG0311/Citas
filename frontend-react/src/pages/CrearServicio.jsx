import Navbar from '../components/Navbar'
import Tabla from '../components/Tabla'
function CrearServicio() {

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
                  <Tabla/>
              </div>
         
        </div>
      </div>
    </div>
    </div>
  )
}
export default CrearServicio

