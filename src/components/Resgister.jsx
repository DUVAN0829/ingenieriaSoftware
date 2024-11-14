import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { NavLink, useNavigate } from "react-router-dom"

export default function Resgister() {

    //*State user
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    //todo: State función crear usuario FireBase
    const { singup } = useAuth()

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

            await singup(user.email, user.password)
            navigate("/")

        } catch (error) {

            setError(error.message)
            if (error.code === 'auth/invalid-email') {
                setError('Correo electrónico necesario')
            } else if (error.code === 'auth/missing-password') {
                setError('Contraseña necesaria')
            } else if (error.code === 'auth/email-already-in-use') {
                setError('El usuario ya está en uso')
            }

        }

    }

    return (

        <div className="flex justify-center items-center h-screen">

            <section>
                <h1 className="font-extrabold text-center text-2xl">Registrarse</h1>

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

                    <NavLink to={'/login'} className="font-medium text-blue-600 hover:text-blue-800 transition-all ease-in duration-200">Iniciar sesión</NavLink>

                </form>

                {error && <p className="text-red-600 font-medium"> {error} </p>}

            </section>

        </div>

    )
}
