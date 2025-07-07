import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Servicios from './pages/Servicios'
import Personal from './pages/Personal'
import ListadoPersonal from './pages/ListadoPersonal'
import CrearServicio from './pages/CrearServicio'
import SedesListado from './pages/SedesListado'
import Citas from './pages/Citas'
import Horario from './pages/Horario'
import Sedes from './pages/Sedes'
import './App.css';
import Estadisticas from './pages/Estadisticas'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
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
