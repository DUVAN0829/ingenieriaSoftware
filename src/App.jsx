
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/dashboard/Home"
import Login from "./components/autenticacion/Login"
import Resgister from "./components/autenticacion/Resgister"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/navegacion/ProtectedRoute"
import Historial from "./components/Historial/Historial"
import Config from "./components/Configuracion/Config"
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

          <Route path="/inventario" element={<ProtectedRoute> <Inventario /> </ProtectedRoute>} />

          <Route path="/historial" element={<ProtectedRoute> <Historial /> </ProtectedRoute>} />

          <Route path="/configuracion" element={<ProtectedRoute> <Config /> </ProtectedRoute>} />

        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
