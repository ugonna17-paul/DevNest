export function Footer() {
    return (
        <footer
            className="bg-[#0D1117] border-t border-[#30363D] py-8 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6"
        >
            <div className="max-w-7xl mx-auto">

                {/* Top Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">

                    {/* Brand */}
                    <div>
                        <span className="block text-lg sm:text-xl font-bold tracking-tight text-[#C9D1D9] mb-3 sm:mb-4">
                            DevNest
                        </span>

                        <p className="text-xs sm:text-sm text-[#8B949E] leading-relaxed">
                            Learn web development the structured way.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#C9D1D9] mb-3 sm:mb-4">
                            Product
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {["Features", "Pricing", "Roadmap", "Changelog"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-xs sm:text-sm text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#C9D1D9] mb-3 sm:mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {["Documentation", "Courses", "Blog", "Community"].map(
                                (item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="text-xs sm:text-sm text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#C9D1D9] mb-3 sm:mb-4">
                            Company
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {["About", "Careers", "Contact", "Privacy"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-xs sm:text-sm text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#30363D] pt-6 sm:pt-8 text-center text-xs sm:text-sm text-[#8B949E]">
                    © 2026 DevNest. All rights reserved.
                </div>

            </div>
        </footer>
    );
}
