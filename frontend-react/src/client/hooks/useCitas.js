import { useEffect, useState } from "react";
import useAutorizarUser from '@/hooks/useAutorizarUser';

export default function useCitas() {

const [citas, setCitas] = useState([])
const {user} = useAutorizarUser();

useEffect(() => {
  if (!user.cedula) return; // Evita llamar con vacío
// Busca todas las citas que ha hecho el pacinete o cliente
  fetch(`http://localhost:5000/citas/buscar?cedula=${user.cedula}`, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo encontrar");
      return res.json();
    })
    .then((data) => {
      setCitas(data);
      console.log(data);
    })
    .catch((err) => console.error("Error al obtener citas:", err));
}, [user.cedula]);

return {citas}
}