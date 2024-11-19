
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/dashboard/Home"
import Login from "./components/autenticacion/Login"
import Resgister from "./components/autenticacion/Resgister"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/navegacion/ProtectedRoute"
import Historial from "./components/Historial/Historial"
import Configuracion from "./components/Configuracion/Config"
import Inventario from "./components/Inventario/Inventario"

function App() {

  return (
    <div>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/register" element={<Resgister />} />

          <Route path="/login" element={<Login />} />

          <Route path="/inventario" element={<Inventario/>} />

          <Route path="/historial" element={<Historial />} />

          <Route path="/configuracion" element={<Configuracion />} />

        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
