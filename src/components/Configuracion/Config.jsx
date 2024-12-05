import Navegacion from "../navegacion/Navegacion";
import { useAuth } from "../../context/AuthContext";

const Config = () => {

    const { user, logout } = useAuth()

    const hanldeLogout = async () => {
        await logout()
    }

    return (
        <div>
            <Navegacion />

            <section className="flex justify-center">
                <button onClick={hanldeLogout} >Salir</button>
            </section>
        </div>
    )
}

export default Config;