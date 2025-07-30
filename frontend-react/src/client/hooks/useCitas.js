import { useEffect, useState } from "react";
import useAutorizarUser from '@/hooks/useAutorizarUser';

export default function useCitas() {
  const [citas, setCitas] = useState([]);
  const { user } = useAutorizarUser();

  // Función para cargar citas del usuario actual
  const cargarCitas = () => {
    if (!user.cedula) return; // Evita llamada vacía

    fetch(`http://localhost:5000/citas/buscar?cedula=${user.cedula}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo encontrar");
        return res.json();
      })
      .then((data) => {
        const activas = data.filter(c => c.estado !== "cancelada");
        setCitas(activas);
      })
      .catch((err) => console.error("Error al obtener citas:", err));
  };

  // Cargar citas cuando cambia el user.cedula
  useEffect(() => {
    cargarCitas();
  }, [user.cedula]);

  return { citas, cargarCitas };
}
