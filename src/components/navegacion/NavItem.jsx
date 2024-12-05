
const NavItem = ({ Icon, text }) => (
    <li className="flex items-center space-x-3 py-2 px-4 font-medium text-slate-50 hover:bg-blue-50 hover:text-slate-900 hover:font-bold transition-all duration-300 ease-in cursor-pointer">
        <Icon className="w-5 h-5 transition-colors duration-200" />
        <span className="group-hover:font-bold transition-all duration-200">{text}</span>
    </li>
)

export default NavItem
