import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './admin/pages/Dashboard'
import Servicios from './admin/pages/Servicios'
import Personal from './admin/pages/Personal'
import ListadoPersonal from './admin/pages/ListadoPersonal'
import CrearServicio from './admin/pages/CrearServicio'
import SedesListado from './admin/pages/SedesListado'
import Citas from './admin/pages/Citas'
import Login from './admin/pages/Login'
import Horario from './admin/pages/Horario'
import Sedes from './admin/pages/Sedes'
import LoginCliente from './client/pages/LoginCliente'
import ClienteInicio from './client/pages/ClienteInicio'
import AgendarCita from './client/pages/AgendarCita'
import CitasCliente from './client/pages/CitasCliente'
import './App.css';
import Estadisticas from './admin/pages/Estadisticas'
import LoginProfesional from './profesional/pages/LoginProfesional'
import InicioProfesional from './profesional/pages/InicioProfesional'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cliente/Login" />} />
      <Route path="/cliente/login" element={<LoginCliente/>} />
      <Route path="/cliente/perfil" element={<ClienteInicio/>} />
      <Route path="/cliente/agendar" element={<AgendarCita/>} />
      <Route path="/cliente/mis_citas" element={<CitasCliente/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/servicios/listado" element={<CrearServicio />} />
      <Route path="/servicios/crear" element={<Servicios />} />
      <Route path="/personal/listado" element={<ListadoPersonal />} />
      <Route path="/personal/crear" element={<Personal />} />
      <Route path="/citas" element={<Citas />} />
      <Route path="/horario" element={<Horario />} />
      <Route path="/sedes/crear" element={<Sedes />} />
      <Route path="/sedes/listado" element={<SedesListado />} />
      <Route path="/estadisticas" element={<Estadisticas />} />
      <Route path="/profesional/login" element={<LoginProfesional />} />
      <Route path="/profesional" element={<InicioProfesional />} />

    </Routes>
  )
}

export default App
