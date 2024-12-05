import { LayoutDashboard, Package, History, Settings, Icon } from "lucide-react"
import NavItem from "./NavItem"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { ArrowLeftToLine } from 'lucide-react'

const Navegacion = () => {

    const { logout } = useAuth()

    return (
        <nav className="w-64 bg-slate-800 h-screen shadow-md fixed top-0 left-0">
            <h2 className="text-slate-50 text-2xl font-extrabold mb-6 mt-3 ml-3">Gestión Inventario</h2>
            <ul className="flex flex-col gap-y-4">

                <NavLink to='/'>
                    <NavItem Icon={LayoutDashboard} text="Dashboard" />
                </NavLink>

                <NavLink to='/inventario'>
                    <NavItem Icon={Package} text="Inventario" />
                </NavLink>

                <NavLink to='/historial'>
                    <NavItem Icon={History} text="Historial" />
                </NavLink>

                {/* <NavLink to='/configuracion'>
                    <NavItem Icon={Settings} text="Configuración" />
                </NavLink> */}

                <section className="mt-96 flex justify-center">
                    <button onClick={logout}
                        className="bg-slate-900 px-7 py-2 w-32 font-bold text-slate-300 rounded-lg
                         hover:bg-slate-300 hover: hover:text-slate-800 
                         transition-all ease-in duration-500 cursor-pointer" >
                        <section className="flex justify-between">
                            <ArrowLeftToLine/>
                            <span>Salir</span>
                        </section>
                    </button>
                </section>

            </ul>
        </nav>
    )
}

export default Navegacion
