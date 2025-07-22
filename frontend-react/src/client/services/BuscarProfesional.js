
import { useEffect, useState } from "react";

export default function BuscarProfesional({servicioSeleccionado}){
const [profesionales, setProfesionales] = useState([]);


  useEffect(() => {
        if (!servicioSeleccionado) {
          setProfesionales([]);
          return;
        }
    
        fetch(`http://localhost:5000/servicios/${servicioSeleccionado}/profesionales`)
          .then(res => res.json())
          .then(data => {
            setProfesionales(data);
          
          });
      }, [servicioSeleccionado]);

      return {profesionales}

}