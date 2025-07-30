
export const fetchProfesional = async () => {
    try {
      const res = await fetch("http://localhost:5000/profesionales");
      const data = await res.json();
      return data;


    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

