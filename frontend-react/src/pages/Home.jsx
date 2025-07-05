// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Sistema de Agendamiento Médico</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => navigate("/admin")}
        >
          Ingresar como Administrador
        </button>

        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          onClick={() => navigate("/paciente")}
        >
          Ingresar como Paciente
        </button>

        <button
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition"
          onClick={() => navigate("/doctor")}
        >
          Ingresar como Doctor
        </button>
      </div>
    </div>
  );
}
