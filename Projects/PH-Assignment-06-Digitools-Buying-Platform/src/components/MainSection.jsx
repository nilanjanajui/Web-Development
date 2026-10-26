import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShoppingCart, PackageOpen } from "lucide-react";
import ProductCard from "./ProductCard";
import CartItem from "./CartItem";

export default function MainSection({ cartItems, setCartItems }) {
    const [activeTab, setActiveTab] = useState("products");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("/products.json")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleAddToCart = (product) => {
        setCartItems((prev) => [...prev, product]);
    };

    const handleRemove = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.warning("Your cart is already empty!");
            return;
        }
        setCartItems([]);
        toast.success("Order placed! Cart has been cleared.");
    };

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                        Premium Digital Tools
                    </h2>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                        Choose from our curated collection of premium digital products designed
                        to boost your productivity and creativity.
                    </p>

                    <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm">
                        <button
                            onClick={() => setActiveTab("products")}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                                ${activeTab === "products"
                                    ? "bg-violet-600 text-white shadow-sm border border-gray-200"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Products
                        </button>
                        <button
                            onClick={() => setActiveTab("cart")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                                ${activeTab === "cart"
                                    ? "bg-violet-600 text-white shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <ShoppingCart size={14} />
                            Cart
                            {cartItems.length > 0 && (
                                <span className="bg-white text-violet-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {activeTab === "products" && (
                    <>
                        {loading ? (
                            <div className="text-center py-20 text-gray-400 text-sm">
                                Loading products...
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        cartItems={cartItems}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === "cart" && (
                    <div className="max-w-2xl mx-auto">
                        {cartItems.length === 0 ? (
                            // Empty Cart State
                            <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-sm">
                                <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mb-4">
                                    <PackageOpen size={36} className="text-violet-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-700 mb-1">
                                    Your cart is empty
                                </h3>
                            </div>
                        ) : (
                            
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900">Your Cart</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 divide-y divide-gray-100 px-6">
                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onRemove={handleRemove}
                                        />
                                    ))}
                                </div>

                                <div className="px-6 py-4 bg-white border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-500 font-medium text-sm">Total</span>
                                        <span className="text-2xl font-extrabold text-gray-900">
                                            ${total}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm"
                                    >
                                        Proceed To Checkout
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}