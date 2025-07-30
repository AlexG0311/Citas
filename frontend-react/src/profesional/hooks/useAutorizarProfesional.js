import { useEffect, useState } from 'react';

export default function useAutorizarProfesional() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/profesional/perfil", {
      method: "GET",
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then(data => {
        setUser(data);
        setIsAuthorized(true);
      })
      .catch(err => {
        console.error("Error al obtener perfil profesional:", err);
        setIsAuthorized(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { user, isLoading, isAuthorized };
}
