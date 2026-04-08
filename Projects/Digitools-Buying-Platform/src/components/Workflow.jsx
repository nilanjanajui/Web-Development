export default function Workflow() {
    return (
        <section className="bg-violet-600 py-24 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">

                <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
                    Ready To Transform Your Workflow?
                </h2>

                <p className="text-violet-200 text-base mb-2">
                    Join thousands of professionals who are already using Digitools to work smarter.
                </p>
                <p className="text-violet-200 text-base mb-10">
                    Start your free trial today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <button className="bg-white hover:bg-gray-50 border-2 border-white text-violet-600 font-semibold px-8 py-3 rounded-full transition-all duration-200 active:scale-95 transform hover:-translate-y-1">
                        Explore Products
                    </button>
                    <button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 active:scale-95 transform hover:-translate-y-1">
                        View Pricing
                    </button>
                </div>

                <p className="text-violet-300 text-sm">
                    14-day free trial • No credit card required • Cancel anytime
                </p>

            </div>
        </section>
    );
}