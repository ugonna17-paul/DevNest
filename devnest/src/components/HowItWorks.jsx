import { ChevronRight } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Pick a Technology",
        description:
            "Choose from HTML, CSS, JavaScript, React, Node.js, or Tailwind CSS based on your learning goals.",
    },
    {
        number: "02",
        title: "Follow Structured Lessons",
        description:
            "Work through carefully designed lessons that build on each other, from basics to advanced concepts.",
    },
    {
        number: "03",
        title: "Build Real Projects",
        description:
            "Apply what you learn by building production-ready projects that you can add to your portfolio.",
    },
];

export function HowItWorks() {
    return (
        <section className="bg-[#161B22] py-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2
                        data-aos="fade-up"
                        className="text-4xl font-bold tracking-tight text-[#C9D1D9] mb-4"
                    >
                        How It Works
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-lg text-[#8B949E]"
                    >
                        Start learning in three simple steps
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 relative">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative">

                            <div
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                                className="flex flex-col items-center md:items-start text-center md:text-left"
                            >
                                {/* Large Step Number */}
                                <span className="text-5xl font-bold text-[#1F6FEB]/30 mb-4">
                                    {step.number}
                                </span>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-[#C9D1D9] mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[#8B949E] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Arrow (Desktop Only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-10 -right-6">
                                    <ChevronRight
                                        size={24}
                                        className="text-[#30363D]"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div
                    className="text-center mt-12"
                    data-aos="fade-up"
                    data-aos-delay="450"
                >
                    <button className="px-8 py-3 bg-[#1F6FEB] text-white rounded-md hover:bg-[#58A6FF] transition-colors">
                        Start Learning Today
                    </button>
                </div>

            </div>
        </section>
    );
}
