import FacebookImg from "../assets/facebook.png";
import TwitterImg from "../assets/twitter.png";
import InstagramImg from "../assets/Instagram.png";

const footerLinks = [
    {
        title: "Product",
        links: ["Features", "Pricing", "Templates", "Integrations"],
    },
    {
        title: "Company",
        links: ["About", "Blog", "Careers", "Press"],
    },
    {
        title: "Resources",
        links: ["Documentation", "Help Center", "Community", "Contact"],
    },
];

const socialIcons = [
    { icon: <img src={InstagramImg} alt="Instagram" className="w-4 h-4 object-contain" />, href: "#" },
    { icon: <img src={FacebookImg} alt="Facebook" className="w-4 h-4 object-contain" />, href: "#" },
    { icon: <img src={TwitterImg} alt="Twitter" className="w-4 h-4 object-contain" />, href: "#" },
];

export default function Footer() {
    return (
        <footer style={{ backgroundColor: "#0f1117" }} className="text-gray-400">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col lg:flex-row gap-10">

                    <div className="lg:w-1/3">
                        <h2 className="text-2xl font-extrabold text-white mb-4">
                            DigiTools
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            Premium digital tools for creators, professionals, and businesses.
                            Work smarter with our suite of powerful tools.
                        </p>
                    </div>

                    <div className="flex-1 flex flex-wrap justify-between gap-8">

                        {footerLinks.map((col) => (
                            <div key={col.title}>
                                <h4 className="text-white font-semibold text-sm mb-5">
                                    {col.title}
                                </h4>
                                <ul className="flex flex-col gap-4">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div>
                            <h4 className="text-white font-semibold text-sm mb-5">
                                Social Links
                            </h4>
                            <div className="flex items-center gap-3">
                                {socialIcons.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-violet-600 transition-all duration-200"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <hr className="border-gray-800" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                    © 2026 Digitools. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>

        </footer>
    );
}