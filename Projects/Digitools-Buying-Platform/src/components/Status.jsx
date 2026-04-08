const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "200+", label: "Premium Tools" },
    { value: "4.9",  label: "Rating" },
];

export default function Status() {
    return (
        <section className="bg-violet-600 py-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-violet-400">

                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex-1 flex flex-col items-center justify-center py-8 sm:py-0 sm:px-12"
                        >
                            <span className="text-5xl font-extrabold text-white mb-2">
                                {stat.value}
                            </span>
                            <span className="text-violet-200 text-base font-medium">
                                {stat.label}
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}