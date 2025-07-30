export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "DIRECCION", uid: "direccion", sortable: true },
  { name: "TELEFONO", uid: "telefono", sortable: true },
  { name: "CIUDAD", uid: "ciudad", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Activo", uid: "Activo" },
  { name: "Inactivo", uid: "Inactivo" },
];


export const initial_colum = ["name","direccion","telefono", "ciudad","status", "actions"];



export const camposAdaptar = {
  id: "id",
  name: "nombre",
  direccion: "direccion",
  telefono: "telefono",
  ciudad: "ciudad",
  status: "estado",
  
};

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
