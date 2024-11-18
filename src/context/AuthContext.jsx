
import { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase";

//* onAuthStateChanged devuelve el estado de sesión del usuario, si se crea una cuenta, si inicia sesión, si se abandona la cuenta, etc.

const authContext = createContext();

//*Hook
export const useAuth = () => {
    const context = useContext(authContext)
    return context
}

export function AuthProvider({ children }) {

    //State
    const [user, setUser] = useState({})

    //Función para registrar usuarios.
    const singup = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    //Función para iniciar sesión
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password) //Comprueba si está en la BD //se usa return ya que toca retornar la promesa para manejar los posibles errores.

    //Función Cerrar sesión
    const logout = () => signOut(auth)

    useEffect(() => {
        //console.log('AuthProvider loaded')
        onAuthStateChanged(auth, currentUser => {
            //console.log(currentUser)
            setUser(currentUser)
        })

    }, []) //El useEffect ejecuta algo cuando carga el componente, en este caso AuthProvider.

    return <authContext.Provider value={{ singup, login, user, logout }}>
        {children}
    </authContext.Provider>

}

// useAuth es un hook.
// AuthProvider es un component.
// El hook se debe de usar en un componente, el cual ira dentro del children de AuthProvider.

