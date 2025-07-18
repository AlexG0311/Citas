export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "FECHA", uid: "fecha", sortable: true },
  { name: "HORA_INICIO", uid: "hora_inicio", sortable: true },
  { name: "HORA_FIN", uid: "hora_fin", sortable: true },
  { name: "PROFESIONALES", uid: "profesional", sortable: true },
  { name: "MODALIDAD", uid: "modalidad", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];


export const initial_colum = ["estado","fecha", "hora_inicio", "hora_fin", "profesional","modalidad","actions"];

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
  profesional: "profesional_nombre",
  modalidad: "modalidad_nombre"

};




export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
