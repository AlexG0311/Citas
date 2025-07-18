
  export const fetchSedes = async () =>{

  const rest =  await fetch("http://localhost:5000/sedes")
  const data =  await rest.json();
  return data;   

  } 