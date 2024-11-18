import { LayoutDashboard, Package, History, Settings } from "lucide-react"
import NavItem from "./NavItem"
import { NavLink } from "react-router-dom"

LayoutDashboard

const Navegacion = () => {
    return (
        <nav className="w-64 bg-gray-50 min-h-full shadow-md">
            <h2 className="text-gray-900 text-2xl font-extrabold mb-6 mt-3 ml-3">Gestión Inventario</h2>
            <ul>

                <NavLink to='/'>
                    <NavItem Icon={LayoutDashboard} text="Dashboard" />
                </NavLink>

                <NavLink to='inventario'>
                    <NavItem Icon={Package} text="Inventario" />
                </NavLink>

                <NavLink to='historial'>
                    <NavItem Icon={History} text="Historial" />
                </NavLink>

                <NavLink to='configuracion'>
                    <NavItem Icon={Settings} text="Configuración" />
                </NavLink>

            </ul>
        </nav>
    )
}

export default Navegacion