import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Servicios from './pages/Servicios'
import Personal from './pages/Personal'
import ListadoPersonal from './pages/ListadoPersonal'
import CrearServicio from './pages/CrearServicio'
import SedesListado from './pages/SedesListado'
import Citas from './pages/Citas'
import Login from './pages/Login'
import Horario from './pages/Horario'
import Sedes from './pages/Sedes'
import LoginCliente from './client/pages/LoginCliente'
import ClienteInicio from './client/pages/ClienteInicio'
import LoginProfesional from './profesional/pages/LoginProfesional'
import InicioProfesional from './profesional/pages/InicioProfesional'
import AgendarCita from './client/pages/AgendarCita'
import CitasCliente from './client/pages/CitasCliente'
import './App.css';
import Estadisticas from './pages/Estadisticas'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cliente/Login" />} />
      <Route path="/cliente/login" element={<LoginCliente/>} />
      <Route path="/cliente/perfil" element={<ClienteInicio/>} />
      <Route path="/Login/profesional" element={<LoginProfesional/>} />
      <Route path="/Login/InicioProfesional" element={<InicioProfesional/>} />
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
    </Routes>
  )
}

export default App
