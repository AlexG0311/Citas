import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function LoginProfesional() {

const [correo, setCorreo] = useState('');
const [contraseña, setContrasena] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try{
const res = await fetch ("http://localhost:5000/login/profesional",
  {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({correo, contraseña})
  }
);
const data = await res.json();
   if (!res.ok) {
        alert(data.error || 'Error al iniciar sesión');
        return;
      }

      // Login exitoso
      navigate('/Login/InicioProfesional');
      
    } catch (err) {
      console.error('Error:', err);
      alert('Error de red. Intenta más tarde.');
    }
}

return(

<div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen flex items-center justify-center">

<div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full">
  <div className="text-center mb-6">
    <h1 className="text-3xl font-bold text-blue-700">Bienvenido Doctor</h1>
    <p className="text-sm text-gray-500">Ingresa tus credenciales</p>
  </div>
<form  className="space-y-5" onSubmit={handleSubmit}>
    <div>
      <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
      <input 
      type="email" 
      value={correo}
      onChange={(e) => setCorreo(e.target.value)}
      name="correo" 
      id="correo" 
      required
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"/>
    </div>

    <div>
      <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
      <input 
      type="password" 
      name="contraseña" 
      id="contraseña" 
      value={contraseña}
      onChange={(e) => setContrasena(e.target.value)}
      required 
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"/>
    </div>

    <p className="text-red-600 text-sm"></p>


    <button 
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow">
      Ingresar
    </button>
</form>
  <div className="text-center mt-6 text-sm text-gray-400">
    &copy; 2025 Tu Clínica. Todos los derechos reservados.
  </div>
</div>

</div>

);


}