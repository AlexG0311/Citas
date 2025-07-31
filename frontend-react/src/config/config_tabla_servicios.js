export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "DURACION", uid: "duracion", sortable: true },
  { name: "FECHA", uid: "fecha", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];


export const initial_colum = ["name","duracion", "fecha", "status", "actions"];

export const statusOptions = [
  { name: "Activo", uid: "Activo" },
  { name: "Inactivo", uid: "Inactivo" },
];


export const camposAdaptar = {     
  id: "id",
  name: "nombre",
  duracion: "duracion",
  fecha: "fecha",
  status: "estado_servicio",
};


export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
