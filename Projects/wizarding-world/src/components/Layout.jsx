import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";

export default function Layout() {
    const location = useLocation();

    return (
        <div className="bg-background-dark text-slate-100 min-h-screen font-display flex flex-col">
            <Navbar />
            <div className="flex-1">
                <AnimatePresence mode="wait">
                    <Motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        <Outlet />
                    </Motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}