


export default async function Horarios({servicioSeleccionado,modalidadSeleccionada,profesionalSeleccionado,fecha }){

if (!servicioSeleccionado || !modalidadSeleccionada || !profesionalSeleccionado) return;

let url = `http://localhost:5000/horarios-disponibles?servicio_id=${servicioSeleccionado}&modalidad_id=${modalidadSeleccionada}&profesional_id=${profesionalSeleccionado}`;
if (fecha) url += `&fecha=${fecha}`;

 const res = await fetch(url);
 const data = await res.json();
 return {data}

}

