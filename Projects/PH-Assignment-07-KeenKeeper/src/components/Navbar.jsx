import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Clock, BarChart2, Menu, X } from 'lucide-react'

const navLinks = [
    { path: '/', label: 'Home', Icon: Home },
    { path: '/timeline', label: 'Timeline', Icon: Clock },
    { path: '/stats', label: 'Stats', Icon: BarChart2 },
]

export default function Navbar() {
    const { pathname } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                        <span className="font-extrabold">Keen</span>
                        <span className="text-[#2D4A3E]">Keeper</span>
                    </Link>

                    <div className="hidden sm:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path
                            const NavIcon = link.Icon
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                                        ${isActive
                                            ? 'bg-[#2D4A3E] text-white'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <NavIcon size={15} />
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>

                    <button
                        className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                </div>
            </div>

            {menuOpen && (
                <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path
                        const NavIcon = link.Icon
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                                    ${isActive
                                        ? 'bg-[#2D4A3E] text-white'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <NavIcon size={16} />
                                {link.label}
                            </Link>
                        )
                    })}
                </div>
            )}
        </nav>
    )
}