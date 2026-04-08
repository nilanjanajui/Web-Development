import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        subtitle: "Perfect for getting started.",
        price: 0,
        period: "Month",
        features: [
            "Access to 10 free tools",
            "Basic templates",
            "Community support",
            "1 project per month",
        ],
        buttonLabel: "Get Started Free",
        highlighted: false,
    },
    {
        name: "Pro",
        subtitle: "Best for professionals.",
        price: 29,
        period: "Month",
        badge: "Most Popular",
        features: [
            "Access to all premium tools",
            "Unlimited templates",
            "Priority support",
            "Unlimited projects",
            "Cloud sync",
            "Advanced analytics",
        ],
        buttonLabel: "Start Pro Trial",
        highlighted: true,
    },
    {
        name: "Enterprise",
        subtitle: "For teams and businesses.",
        price: 99,
        period: "Month",
        features: [
            "Everything in Pro",
            "Team collaboration",
            "Custom integrations",
            "Dedicated support",
            "SLA guarantee",
            "Custom branding",
        ],
        buttonLabel: "Contact Sales",
        highlighted: false,
    },
];

export default function PricingSection() {
    return (
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Choose the plan that fits your needs. Upgrade or downgrade anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl p-7 flex flex-col gap-5 border transition-all duration-300
                                ${plan.highlighted
                                    ? "bg-violet-600 border-violet-600 shadow-2xl shadow-violet-200 scale-105"
                                    : "bg-gray-50 border-gray-200 hover:shadow-md"
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div>
                                <h3 className={`text-lg font-extrabold mb-1 ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-xs ${plan.highlighted ? "text-violet-200" : "text-gray-400"}`}>
                                    {plan.subtitle}
                                </p>
                            </div>

                            <div className="flex items-baseline gap-1">
                                <span className={`text-4xl font-extrabold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                                    ${plan.price}
                                </span>
                                <span className={`text-sm font-medium ${plan.highlighted ? "text-violet-200" : "text-gray-400"}`}>
                                    /{plan.period}
                                </span>
                            </div>

                            <ul className="flex flex-col gap-2.5 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm">
                                        <Check
                                            size={14}
                                            className={`shrink-0 ${plan.highlighted ? "text-violet-200" : "text-green-600"}`}
                                        />
                                        <span className={plan.highlighted ? "text-violet-100" : "text-gray-600"}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 mt-2
                                    ${plan.highlighted
                                        ? "bg-white text-violet-600 hover:bg-violet-50"
                                        : "bg-violet-600 hover:bg-violet-700 text-white"
                                    }`}
                            >
                                {plan.buttonLabel}
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}