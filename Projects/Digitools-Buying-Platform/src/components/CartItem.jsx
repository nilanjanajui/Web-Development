import { toast } from "react-toastify";
import { X } from "lucide-react";

export default function CartItem({ item, onRemove }) {
    const handleRemove = () => {
        onRemove(item.id);
        toast.error(`"${item.name}" removed from cart!`);
    };

    return (
        
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 hover:shadow-sm transition-shadow">

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="w-6 h-6 object-contain"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            ${item.price} / {item.period}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-base font-extrabold text-gray-900">
                        ${item.price}
                    </span>
                    <button
                        onClick={handleRemove}
                        className="text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                    >
                        <X size={12} />
                        Remove
                    </button>
                </div>
            </div>
    );
}