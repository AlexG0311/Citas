import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginFetch from "../services/LoginFetch";

const LoginCliente = () => {
  
  
  const [cedula, setCedula] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

const {res} = await  LoginFetch({cedula})

    if (res) {
      setMensaje("succefull");
      navigate("/cliente/perfil");
       
    } else {
      setMensaje("Fallo en encontrar un usuario");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700">Bienvenido</h1>
            <p className="text-sm text-gray-500">
              Por favor ingresa tus datos para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-1">
                Cédula
              </label>
              <input
                type="text"
                name="cedula"
                id="cedula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
            >
              Ingresar
            </button>
          </form>

          {mensaje && (
            <div className="mt-4 text-center text-sm text-red-600">{mensaje}</div>
          )}

          <div className="text-center mt-6 text-sm text-gray-400">
            &copy; 2025 Tu Clínica. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCliente;
