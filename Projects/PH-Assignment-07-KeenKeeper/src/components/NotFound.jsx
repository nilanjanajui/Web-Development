import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center flex-1 py-40 px-4 text-center">
            <p className="text-8xl font-extrabold text-[#2D4A3E] mb-4">404</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
            <p className="text-sm text-gray-400 max-w-sm mb-8">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 bg-[#2D4A3E] hover:bg-[#3D6B59] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
                Go back home
            </button>
        </div>
    )
}