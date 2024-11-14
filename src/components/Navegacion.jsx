import { LayoutDashboard, Package, History, Settings } from "lucide-react"
import NavItem from "./NavItem"
import { NavLink } from "react-router-dom"

LayoutDashboard

const Navegacion = () => {
    return (
        <nav className="w-64 bg-gray-50 h-screen shadow-md">
            <h2 className="text-gray-900 text-2xl font-extrabold mb-6 mt-3 ml-3">Gestión Inventario</h2>
            <ul>

                <NavLink to='/'>
                    <NavItem Icon={LayoutDashboard} text="Dashboard" />
                </NavLink>

                <NavItem Icon={Package} text="Inventario" />
                <NavItem Icon={History} text="Historial" />
                <NavItem Icon={Settings} text="Configuración" />
            </ul>
        </nav>
    )
}

export default Navegacion