import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function ListadoPersonal() {

const sidebarLinks = [
    { to: '/personal/listado', label: 'Listado', icon: '' },
    { to: '/personal/crear', label: 'Crear', icon: '' },
  ]

   return (
  <div className="min-h-screen flex flex-col">
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenido cor margen */}
      <div className="flex-1 px-8 py-6">
       <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
        <Sidebar links={sidebarLinks}/>

        {/* Contenido principal */}
        <div className="flex-1 flex justify-center p-8  ">
          <div className="bg-white w-full p-8 rounded shadow-md ">  
              <div className="overflow-x-auto">
                <table className="table"> 
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Fecha</th>
                      <th>Servicios Ofrecidos</th>
                      <th>Creador</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>2</th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>3</th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
export default ListadoPersonal

