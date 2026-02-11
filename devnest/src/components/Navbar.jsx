import { useState } from 'react';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-[#0D1117] border-b border-[#30363D] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-[20px] font-bold tracking-tight text-[#C9D1D9]">
                            DevNest
                        </span>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#docs"
                            className="text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                        >
                            Docs
                        </a>
                        <a
                            href="#courses"
                            className="text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                        >
                            Courses
                        </a>
                        <a
                            href="#about"
                            className="text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                        >
                            About
                        </a>
                    </div>

                    {/* Action Buttons - Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <button className="px-4 py-2 border border-[#30363D] text-[#C9D1D9] rounded-md hover:bg-[#161B22] transition-colors">
                            Login
                        </button>

                        <button className="px-4 py-2 bg-[#1F6FEB] text-white rounded-md hover:bg-[#58A6FF] transition-colors">
                            Get Started
                        </button>
                    </div>

                    {/* Hamburger Menu Button - Mobile */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-[#C9D1D9] transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-[#C9D1D9] transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-[#C9D1D9] transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>

                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-[#30363D] space-y-4">
                        <a
                            href="#docs"
                            className="block text-[#8B949E] hover:text-[#C9D1D9] transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Docs
                        </a>
                        <a
                            href="#courses"
                            className="block text-[#8B949E] hover:text-[#C9D1D9] transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Courses
                        </a>
                        <a
                            href="#about"
                            className="block text-[#8B949E] hover:text-[#C9D1D9] transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </a>
                        <div className="flex flex-col gap-3 pt-2">
                            <button className="px-4 py-2 border border-[#30363D] text-[#C9D1D9] rounded-md hover:bg-[#161B22] transition-colors">
                                Login
                            </button>
                            <button className="px-4 py-2 bg-[#1F6FEB] text-white rounded-md hover:bg-[#58A6FF] transition-colors">
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
