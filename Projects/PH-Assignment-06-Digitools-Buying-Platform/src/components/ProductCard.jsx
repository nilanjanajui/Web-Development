import { useState } from "react";
import { toast } from "react-toastify";
import { ShoppingCart, Check } from "lucide-react";

const tagStyles = {
    "best-seller": "bg-orange-100 text-orange-600",
    "popular": "bg-violet-100 text-violet-600",
    "new": "bg-green-100 text-green-600",
};

export default function ProductCard({ product, onAddToCart, cartItems }) {
    const [added, setAdded] = useState(false);

    const isInCart = cartItems.some((item) => item.id === product.id);

    const handleBuy = () => {
        if (isInCart) {
            toast.info(`"${product.name}" is already in your cart!`);
            return;
        }
        onAddToCart(product);
        setAdded(true);
        toast.success(`"${product.name}" added to cart!`);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative">

            {product.tag && (
                <span
                    className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${tagStyles[product.tagType] || "bg-gray-100 text-gray-600"}`}
                >
                    {product.tag}
                </span>
            )}

            <div className="w-12 h-12  rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                <img
                    src={product.icon}
                    alt={product.name}
                    className="w-8 h-8 object-contain"
                />
            </div>

            <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">
                    {product.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {product.description}
                </p>
            </div>

            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-gray-900">
                    ${product.price}
                </span>
                <span className="text-gray-400 text-sm font-medium">
                    /{product.period}
                </span>
            </div>

            <ul className="flex flex-col gap-1.5">
                {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={15} className="text-green-600 shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>

            <button
                onClick={handleBuy}
                className={`mt-auto w-full flex items-center justify-center gap-2 font-semibold py-2.5 rounded-xl transition-all duration-300 text-sm
                    ${isInCart
                        ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
                        : "bg-violet-600 hover:bg-violet-700 text-white active:scale-95"
                    }`}
            >
                {isInCart ? (
                    <>
                        <Check size={15} />
                        Added to Cart
                    </>
                ) : added ? (
                    <>
                        <Check size={15} />
                        Added!
                    </>
                ) : (
                    <>
                        <ShoppingCart size={15} />
                        Buy Now
                    </>
                )}
            </button>
        </div>
    );
}