import { useEffect, useState } from 'react';

export default function useAutorizarUser() {

const [user, setUser] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/cliente/perfil", {
      method: "GET",
      credentials: "include", // Importante para enviar cookies (por ejemplo, de sesión)
    })
      .then(res => {
        if (!res.ok) throw new Error("No autorizado");
        setIsAuthorized(true)
        return res.json()
      })
      .then(data => {
      setUser(data)
      })
      .catch(err => {
        console.error("Error al obtener el perfil:", err);
        setIsAuthorized(false)
      })
      .finally(() => {
       setIsLoading(false);
      }

      )

  }, []);
   return {user,isLoading, isAuthorized};
}