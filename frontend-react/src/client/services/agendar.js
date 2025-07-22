
export default async function agendar({h, documento, profesionalSeleccionado, servicioSeleccionado}){

try {
      const clienteRes = await fetch(`http://localhost:5000/clientes/cedula/${documento}`);
      const cliente = await clienteRes.json();

      if (!cliente.id) {
        alert('Cliente no encontrado');
        return;
      }

      const cita = {
        fecha: h.fecha,
        estado: "pendiente",
        hora_inicio: h.hora_inicio,
        hora_fin: h.hora_fin,
        Clientes_id: cliente.id,
        Profesionales_id: profesionalSeleccionado,
        Servicios_id: servicioSeleccionado,
        sede_id: h.sede_id
      };

      console.log('📤 Datos que se envían a /citas:', cita);

      const res = await fetch('http://localhost:5000/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cita)
      });

      if (!res.ok) throw new Error('Error al agendar cita');

      alert('Cita agendada con éxito');
    } catch (error) {
      alert(error.message);
    }






}