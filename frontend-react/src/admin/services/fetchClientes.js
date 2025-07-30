
export const fetchClientes = async () => {
    try {
      const res = await fetch("http://localhost:5000/clientes");
      const data = await res.json();
      return data;


    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

