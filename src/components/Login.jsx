import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"

export default function Login() {

    //*State user
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    //todo: State función crear usuario FireBase
    const { login } = useAuth()

    //!State errores
    const [error, setError] = useState('')

    //todo: State Cambiar page
    const navigate = useNavigate()

    //*Generar cambio a tráves de input.
    const handleChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    //*Enviar Formulario.
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            await login(user.email, user.password) //toda petición hacia un back es asincrona.
            navigate("/")

        } catch (error) {

            setError(error.message)
            if (error.code === "auth/invalid-email") {
                setError('Correo vacio o invalido')
            } else if (error.code === "auth/missing-password") {
                setError('Contraseña vacia o invalida')
            } else if (error.code === 'auth/invalid-credential') {
                setError('El usuario ingresado no existe')
            }
            console.log(error.message)

        }

    }

    return (

        <div className="flex justify-center items-center h-screen">

            <section>
                <h1 className="font-extrabold text-center text-2xl">Iniciar Sesión</h1>

                <form
                    className="border-gray-500 p-8 bg-opacity-20 flex flex-col gap-y-4 rounded-lg mt-5 mb-14 shadow-xl"
                    onSubmit={handleSubmit}>

                    <legend className="text-center font-bold"> Formulario </legend>

                    <div>
                        <label htmlFor="email" className="font-bold"> Email </label>
                        <input
                            className="text-black pl-3 rounded-md ml-2"
                            id="email"
                            type="email"
                            placeholder="youremail@company.ltd"
                            name="email"
                            onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="password" className="font-bold"> Password </label>
                        <input
                            className="text-black pl-3 rounded-md ml-2"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="******"
                            onChange={handleChange} />
                    </div>

                    <input
                        className="bg-gray-800 rounded-md hover:bg-blue-700 transition-all ease-in duration-500 text-white font-bold py-2 cursor-pointer"
                        type="submit"
                        value="Login" />

                    <NavLink to={'/register'} className="font-medium text-blue-600 hover:text-blue-800 transition-all ease-in duration-200">Registrarse</NavLink>

                </form>

                {error && <p className="text-red-600 font-medium"> {error} </p>}

            </section>

        </div>

    )
}
