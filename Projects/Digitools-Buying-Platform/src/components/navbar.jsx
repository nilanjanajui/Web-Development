import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

const navLinks = ["Products", "Features", "Pricing", "Testimonials", "FAQ"];

export default function Navbar({ cartCount }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* ── Left: Hamburger + Logo ── */}
                    <div className="flex items-center gap-3">

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>

                        {/* Logo */}
                        <div className="flex items-center">
                            <span className="text-2xl font-extrabold text-violet-600 tracking-tight">Digi</span>
                            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Tools</span>
                        </div>
                    </div>

                    {/* ── Center: Desktop Nav Links ── */}
                    <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
                        {navLinks.map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="hover:text-violet-600 transition-colors duration-200"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* ── Right: Cart + Login + Get Started (always visible) ── */}
                    <div className="flex items-center gap-3">

                        {/* Cart Icon */}
                        <div className="relative cursor-pointer">
                            <ShoppingCart size={22} className="text-gray-700 hover:text-violet-600 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        {/* Login — hidden on mobile */}
                        <a
                            href="#"
                            className="hidden sm:block text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors"
                        >
                            Login
                        </a>

                        {/* Get Started — always visible */}
                        <a
                            href="#"
                            className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Get Started
                        </a>

                    </div>
                </div>
            </div>

            {/* ── Mobile Dropdown — Nav Links Only ── */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-md px-4 py-3 flex flex-col gap-1">
                    {navLinks.map((item) => (
                        <a
                            key={item}
                            href="#"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 px-3 py-2.5 rounded-lg transition-colors duration-200"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}