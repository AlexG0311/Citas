
    export const fetchServicios = async () =>{

    const rest =  await fetch("http://localhost:5000/servicios")
    const data =  await rest.json();
    return data;   

    } 
    
    