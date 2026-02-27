import { Play, Copy, Check } from "lucide-react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

const codeExample = `import React from 'react'

function Welcome() {
  return (
    <div className="welcome">
      <h1>Welcome to DevNest</h1>
      <button>Get Started</button>
    </div>
  )
}`;

export function InteractiveCode() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeExample);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Code copied!', {
            position: "top-center",
            autoClose: 2000,
            style: {
                background: '#161B22',
                color: '#C9D1D9',
                border: '1px solid #30363D',
            }
        });
    };

    return (
        <section className="bg-[#161B22] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2
                        data-aos="fade-up"
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#C9D1D9] mb-3 sm:mb-4"
                    >
                        Interactive Code Experience
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-base sm:text-lg text-[#8B949E] px-4"
                    >
                        Write code and see results instantly in our interactive playground
                    </p>
                </div>

                {/* Main Container */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="bg-[#0D1117] border border-[#30363D] rounded-lg overflow-hidden"
                >
                    {/* Top Bar */}
                    <div className="bg-[#1C2128] border-b border-[#30363D] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-3">

                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
                            <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-[#8B949E]">
                                playground.jsx
                            </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <button onClick={handleCopy} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-[#30363D] bg-[#161B22] text-[#C9D1D9] rounded-md hover:border-[#1F6FEB] transition-all flex items-center gap-1.5 sm:gap-2 text-sm cursor-pointer">
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                            </button>

                            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1F6FEB] text-white rounded-md hover:bg-[#58A6FF] transition-colors flex items-center gap-1.5 sm:gap-2 text-sm">
                                <Play className="w-4 h-4" />
                                <span className="hidden sm:inline">Run</span>
                            </button>
                        </div>
                    </div>

                    {/* Split Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* LEFT — CODE */}
                        <div className="p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#30363D]">
                            <span className="text-xs uppercase tracking-wide text-[#8B949E] font-medium">
                                Code
                            </span>

                            <div className="mt-3 sm:mt-4 font-mono text-xs sm:text-sm text-[#C9D1D9] space-y-1.5 sm:space-y-2 overflow-x-auto">
                                <p className="whitespace-nowrap">
                                    <span className="text-[#8B949E]">1</span>
                                    <span className="ml-3 sm:ml-4 text-[#ff7b72]">import</span>
                                    <span> React </span>
                                    <span className="text-[#ff7b72]">from</span>
                                    <span className="text-[#a5d6ff]"> 'react'</span>
                                </p>

                                <p>
                                    <span className="text-[#8B949E]">3</span>
                                    <span className="ml-3 sm:ml-4 text-[#ff7b72]">function</span>
                                    <span className="text-[#d2a8ff]"> Welcome</span>
                                    <span>() {'{'}</span>
                                </p>

                                <p>
                                    <span className="text-[#8B949E]">4</span>
                                    <span className="ml-3 sm:ml-4 text-[#ff7b72]">return</span>
                                    <span> (</span>
                                </p>

                                <p className="whitespace-nowrap">
                                    <span className="text-[#8B949E]">5</span>
                                    <span className="ml-3 sm:ml-4">{'<div className="welcome">'}</span>
                                </p>

                                <p className="whitespace-nowrap">
                                    <span className="text-[#8B949E]">6</span>
                                    <span className="ml-3 sm:ml-4">{'<h1>'}</span>
                                    Welcome to DevNest
                                    {'</h1>'}
                                </p>

                                <p className="whitespace-nowrap">
                                    <span className="text-[#8B949E]">7</span>
                                    <span className="ml-3 sm:ml-4">{'<button>'}</span>
                                    Get Started
                                    {'</button>'}
                                </p>

                                <p>
                                    <span className="text-[#8B949E]">8</span>
                                    <span className="ml-3 sm:ml-4">{'</div>'}</span>
                                </p>

                                <p>
                                    <span className="text-[#8B949E]">9</span>
                                    <span className="ml-3 sm:ml-4">)</span>
                                </p>

                                <p>
                                    <span className="text-[#8B949E]">10</span>
                                    <span className="ml-3 sm:ml-4">{'}'}</span>
                                </p>
                            </div>
                        </div>

                        {/* RIGHT — PREVIEW */}
                        <div className="p-4 sm:p-6 bg-[#161B22]">
                            <span className="text-xs uppercase tracking-wide text-[#8B949E] font-medium">
                                Preview
                            </span>

                            <div className="mt-3 sm:mt-4 border border-[#30363D] rounded-lg p-4 sm:p-6 md:p-8 min-h-[300px] sm:min-h-[400px] flex items-center justify-center bg-[#0D1117]">
                                <div className="text-center space-y-4 sm:space-y-6 max-w-md px-4">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-[#C9D1D9]">
                                        Welcome to DevNest
                                    </h1>

                                    <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed">
                                        Learn web development the structured way
                                    </p>

                                    <Link to="/signup" className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1F6FEB] text-white rounded-md hover:bg-[#58A6FF] transition-colors text-sm sm:text-base">
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
