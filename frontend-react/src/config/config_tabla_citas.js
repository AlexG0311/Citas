  export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "FECHA", uid: "fecha", sortable: true },
  { name: "ESTDO", uid: "estado", sortable: true },
  { name: "HORA_INICIO", uid: "hora_inicio", sortable: true },
  { name: "HORA_FIN", uid: "hora_fin", sortable: true },
  { name: "PACIENTE", uid: "cliente", sortable: true },
  { name: "PROFESIONAL", uid: "profesional", sortable: true },
  { name: "SERVICIO", uid: "servicio", sortable: true },
  { name: "SEDE", uid: "sede", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];


export const initial_colum = ["fecha","estado", "hora_inicio", "hora_fin", "cliente", "profesional", "servicio","sede","actions"];

export const statusOptions = [
  { name: "Activo", uid: "Activo" },
  { name: "Inactivo", uid: "Inactivo" },
];


export const camposAdaptar = {
  id: "id",
  fecha: "fecha",
  estado: "estado",
  hora_inicio: "hora_inicio",
  hora_fin: "hora_fin",
  cliente: "cliente",
  profesional: "profesional",
  servicio: "servicio",
  sede: "sede",
  

};




export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
