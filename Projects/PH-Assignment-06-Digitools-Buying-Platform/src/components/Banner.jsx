import bannerImg from "../assets/banner.png";
import Play from "../assets/Play.png";

export default function Banner() {
    return (
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

                    <div className="flex-1 text-left">

                        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
                            New: AI-Powered Tools Available
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Supercharge Your <br />
                            <span className="text-violet-600">Digital Workflow</span>
                        </h1>

                        <p className="text-gray-500 text-base max-w-md mb-2 leading-relaxed">
                            Access premium AI tools, design assets, templates, and productivity
                            software-all in one place. Start creating faster today.
                        </p>
                        <p className="text-gray-500 text-base mb-8 ">
                            Explore Products
                        </p>

                        <div className="flex flex-row items-center gap-4">
                            <button className="bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 relative">
                                Explore Products
                            </button>
                            <button className="flex items-center gap-2 border-2 border-violet-600 text-violet-600 hover:bg-violet-50 font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 relative">
                                <span className="w-6 h-6 flex items-center justify-center ">
                                    <img src={Play} alt="Play" className="w-5 h-5 object-contain" />
                                </span>
                                Watch Demo
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <img
                            src={bannerImg}
                            alt="Digital Workflow"
                            className="w-full h-auto object-cover rounded-2xl"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}