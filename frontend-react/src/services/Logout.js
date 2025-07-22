import { useState } from "react";
export default async function Logout(){

const [respuesta, setRespuesta] = useState(false);

    try {
        const res = await fetch("http://localhost:5000/logout", {
          method: "POST",
          credentials: "include", // ✅ Necesario para borrar cookie
        });

        if (res.ok) {
         setRespuesta(true);
        } else {
          console.error("Error al cerrar sesión");
        }
      } catch (error) {
        console.error("Error de red al cerrar sesión", error);
      }

      return {respuesta}
    }
    


