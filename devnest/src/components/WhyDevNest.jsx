import { BookOpen, Code, Zap, Moon } from "lucide-react";

const features = [
    {
        icon: BookOpen,
        title: "Structured Learning Paths",
        description:
            "Follow carefully designed curricula that take you from beginner to advanced developer step by step.",
    },
    {
        icon: Code,
        title: "Real-World Code Examples",
        description:
            "Learn with practical, production-ready code examples that you can use in your own projects.",
    },
    {
        icon: Zap,
        title: "Developer-Focused Experience",
        description:
            "Built by developers, for developers. Clean interface, clear documentation, zero distractions.",
    },
    {
        icon: Moon,
        title: "Dark Mode Optimized",
        description:
            "Easy on your eyes with a carefully crafted dark theme designed for extended coding sessions.",
    },
];

export function WhyDevNest() {
    return (
        <section className="bg-[#0D1117] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2
                        data-aos="fade-up"
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#C9D1D9] mb-3 sm:mb-4"
                    >
                        Why DevNest?
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-base sm:text-lg text-[#8B949E] px-4"
                    >
                        A learning platform designed with developers in mind
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                                className="border border-[#30363D] rounded-lg p-5 sm:p-6 md:p-7 lg:p-8 hover:border-[#1F6FEB] transition-all duration-300"
                            >

                                {/* Icon */}
                                <div className="inline-flex p-2.5 sm:p-3 bg-[#161B22] border border-[#30363D] rounded-lg mb-3 sm:mb-4">
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F6FEB]" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg sm:text-xl font-semibold text-[#C9D1D9] mb-2 sm:mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed">
                                    {feature.description}
                                </p>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
