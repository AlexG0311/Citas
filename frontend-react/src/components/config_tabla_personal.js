export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "APELLIDO", uid: "apellido", sortable: true },
  { name: "CORREO", uid: "correo", sortable: true },
  { name: "TELEFONO", uid: "telefono", sortable: true },
  { name: "ESPECIALIDAD", uid: "especialidad", sortable: true },
  { name: "SEDE", uid: "sede", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Activo", uid: "Activo" },
  { name: "Inactivo", uid: "Inactivo" },
];



export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
