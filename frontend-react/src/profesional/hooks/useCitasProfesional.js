import { useEffect, useState } from 'react';

export default function useCitasProfesional() {
  const [citas, setCitas] = useState([]);

  const cargarCitas = () => {
    fetch('http://localhost:5000/profesional/citas', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener citas');
        return res.json();
      })
      .then(data => {
        const activas = data.filter(c => c.estado !== "cancelada");
        setCitas(activas);
      })
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  return { citas, cargarCitas };
}
