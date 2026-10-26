import { User, Package, Rocket } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: <User size={28} className="text-violet-500" />,
        title: "Create Account",
        description: "Sign up for free in seconds. No credit card required to get started.",
    },
    {
        number: "02",
        icon: <Package size={28} className="text-violet-500" />,
        title: "Choose Products",
        description: "Browse our catalog and select the tools that fit your needs.",
    },
    {
        number: "03",
        icon: <Rocket size={28} className="text-violet-500" />,
        title: "Start Creating",
        description: "Download and start using your premium tools immediately.",
    },
];

export default function StepsSection() {
    return (
        <section className="bg-gray-50 py-30 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                        Get Started In 3 Steps
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Start using premium digital tools in minutes, not hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="relative bg-white border border-gray-200 rounded-2xl px-8 py-15 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
                        >
                            <span className="absolute top-4 right-4 w-8 h-8 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {step.number}
                            </span>

                            <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mb-5">
                                {step.icon}
                            </div>

                            <h3 className="text-base font-bold text-gray-900 mb-2">
                                {step.title}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}