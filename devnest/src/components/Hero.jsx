import { Link } from 'react-router-dom';

export function Hero() {
    return (
        <section className="bg-[#0D1117] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">

                    {/* Left Content */}
                    <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
                        <h1
                            data-aos="fade-up"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[#C9D1D9]"
                        >
                            Learn Web Development the Structured Way
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-base sm:text-lg leading-relaxed text-[#8B949E] max-w-xl mx-auto lg:mx-0"
                        >
                            Master modern web development with comprehensive courses in
                            HTML, CSS, JavaScript, React, Node.js, and Tailwind CSS.
                            Build production-ready applications with structured learning paths.
                        </p>

                        <div
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <Link to="/signup" className="px-6 py-3 bg-[#1F6FEB] text-white rounded-md hover:bg-[#58A6FF] transition-colors text-sm sm:text-base text-center">
                                Get Started
                            </Link>

                            <Link to="/signup" className="px-6 py-3 border border-[#30363D] text-[#C9D1D9] rounded-md hover:bg-[#161B22] transition-colors text-sm sm:text-base text-center">
                                View Docs
                            </Link>
                        </div>
                    </div>

                    {/* Right - Code Editor Mockup */}
                    <div
                        data-aos="fade-left"
                        data-aos-delay="300"
                        className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden max-w-2xl mx-auto lg:mx-0"
                    >

                        {/* Editor Header */}
                        <div className="bg-[#1C2128] border-b border-[#30363D] px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-1.5 sm:gap-2">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]"></div>
                            <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-[#8B949E]">App.tsx</span>
                        </div>

                        {/* Editor Content */}
                        <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2 font-mono text-xs sm:text-sm text-[#C9D1D9] overflow-x-auto">

                            <div className="whitespace-nowrap">
                                <span className="text-[#8B949E]">1</span>
                                <span className="ml-4 sm:ml-6 text-[#ff7b72]">import</span>
                                <span> React </span>
                                <span className="text-[#ff7b72]">from</span>
                                <span className="text-[#a5d6ff]"> 'react'</span>
                            </div>

                            <div>
                                <span className="text-[#8B949E]">2</span>
                            </div>

                            <div className="whitespace-nowrap">
                                <span className="text-[#8B949E]">3</span>
                                <span className="ml-4 sm:ml-6 text-[#ff7b72]">function</span>
                                <span className="text-[#d2a8ff]"> App</span>
                                <span>() {'{'}</span>
                            </div>

                            <div className="whitespace-nowrap">
                                <span className="text-[#8B949E]">4</span>
                                <span className="ml-4 sm:ml-6 text-[#ff7b72]">return</span>
                                <span> (</span>
                            </div>

                            <div className="whitespace-nowrap">
                                <span className="text-[#8B949E]">5</span>
                                <span className="ml-4 sm:ml-6">{'<'}</span>
                                <span className="text-[#7ee787]">div</span>
                                <span className="text-[#79c0ff]"> className</span>
                                <span>=</span>
                                <span className="text-[#a5d6ff]">"container"</span>
                                <span>{'>'}</span>
                            </div>

                            <div className="whitespace-nowrap">
                                <span className="text-[#8B949E]">6</span>
                                <span className="ml-4 sm:ml-6">{'<'}</span>
                                <span className="text-[#7ee787]">h1</span>
                                <span>{'>'}</span>
                                <span>Hello DevNest</span>
                                <span>{'</'}</span>
                                <span className="text-[#7ee787]">h1</span>
                                <span>{'>'}</span>
                            </div>

                            <div className="whitespace-nowrap">
                                <span className="text-[#8B949E]">7</span>
                                <span className="ml-4 sm:ml-6">{'</'}</span>
                                <span className="text-[#7ee787]">div</span>
                                <span>{'>'}</span>
                            </div>

                            <div className="whitespace-nowrap">
                                <span className="text-[#8B949E]">8</span>
                                <span className="ml-4 sm:ml-6">)</span>
                            </div>

                            <div className="whitespace-nowrap">
                                <span className="text-[#8B949E]">9</span>
                                <span className="ml-4 sm:ml-6">{'}'}</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
