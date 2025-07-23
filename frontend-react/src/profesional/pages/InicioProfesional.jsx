import { useNavigate } from "react-router-dom";
import useAutorizarProfesional from "../hooks/useAutorizarProfesional";

export default function InicioProfesional() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthorized } = useAutorizarProfesional();

  if (isLoading) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  if (!isAuthorized) {
    navigate("/Login/profesional");
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Bienvenido Dr. {user.nombre}
        </h1>

        <a
          href="/profesional/citas"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
        >
          Ver Citas
        </a>
      </div>
    </div>
  );
}
