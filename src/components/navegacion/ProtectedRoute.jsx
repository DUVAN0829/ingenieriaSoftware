
import { useAuth } from "../../context/AuthContext"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {

    const { user } = useAuth()

    if (!user) { //Cuando se hace logout el valor es vacio y redirecciona a login.
        return (
            <Navigate to='/login' />
        )
    }

    return <> {children} </>

}

export default ProtectedRoute