
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Resgister from "./components/Resgister"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <div>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

          <Route path="/register" element={<Resgister />} />

          <Route path="/login" element={<Login />} />

        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
