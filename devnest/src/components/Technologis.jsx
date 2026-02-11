import { Code2, Layout, FileJson, Blocks, Server, Palette } from 'lucide-react';

const technologies = [
    {
        name: 'HTML',
        icon: Code2,
        description: 'Structure your web applications with semantic HTML5',
    },
    {
        name: 'CSS',
        icon: Palette,
        description: 'Style modern interfaces with advanced CSS techniques',
    },
    {
        name: 'JavaScript',
        icon: FileJson,
        description: 'Master ES6+ and modern JavaScript fundamentals',
    },
    {
        name: 'React',
        icon: Blocks,
        description: 'Build dynamic UIs with the most popular framework',
    },
    {
        name: 'Node.js',
        icon: Server,
        description: 'Create scalable backends with JavaScript runtime',
    },
    {
        name: 'Tailwind CSS',
        icon: Layout,
        description: 'Rapidly build custom designs with utility-first CSS',
    },
];

export function Technologies() {
    return (
        <section className="bg-[#161B22] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2
                        data-aos="fade-up"
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#C9D1D9] mb-3 sm:mb-4"
                    >
                        Technologies We Teach
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-base sm:text-lg text-[#8B949E] px-4"
                    >
                        Master the essential tools for modern web development
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {technologies.map((tech, index) => {
                        const Icon = tech.icon;

                        return (
                            <div
                                key={tech.name}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4 sm:p-5 md:p-6 hover:border-[#1F6FEB] transition-all duration-300"
                            >
                                <div className="flex items-start gap-3 sm:gap-4">

                                    {/* Icon */}
                                    <div className="p-2 sm:p-3 bg-[#1C2128] border border-[#30363D] rounded-lg flex-shrink-0">
                                        <Icon size={20} className="text-[#1F6FEB] sm:w-6 sm:h-6" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-[#C9D1D9] mb-1.5 sm:mb-2">
                                            {tech.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#8B949E] leading-relaxed">
                                            {tech.description}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
