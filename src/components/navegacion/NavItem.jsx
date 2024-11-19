
const NavItem = ({ Icon, text }) => (
    <li className="flex items-center space-x-3 py-2 px-4 font-medium text-gray-900 hover:bg-blue-700 hover:text-white hover:font-bold transition-all duration-300 ease-in cursor-pointer">
        <Icon className="w-5 h-5 transition-colors duration-200" />
        <span className="group-hover:font-bold transition-all duration-200">{text}</span>
    </li>
)

export default NavItem
