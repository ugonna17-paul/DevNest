import { Clock, CheckCircle2 } from "lucide-react";
import { Link } from 'react-router-dom';

const learningPaths = [
    {
        title: "Frontend Foundations",
        description:
            "Build a solid foundation in modern frontend development. Master the core technologies that power every web application.",
        technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
        duration: "8-10 weeks",
        level: "Beginner to Intermediate",
    },
    {
        title: "Full-Stack Developer",
        description:
            "Become a complete full-stack developer with frontend and backend skills. Build and deploy production applications.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
        duration: "12-16 weeks",
        level: "Intermediate to Advanced",
    },
    {
        title: "Modern UI Developer",
        description:
            "Master modern UI development with component-based architecture and styling frameworks. Create beautiful, responsive interfaces.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Styled Components"],
        duration: "6-8 weeks",
        level: "Intermediate",
    },
];

export function LearningPaths() {
    return (
        <section className="bg-[#0D1117] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2
                        data-aos="fade-up"
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#C9D1D9] mb-3 sm:mb-4"
                    >
                        Learning Paths
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-base sm:text-lg text-[#8B949E] px-4"
                    >
                        Choose a structured path tailored to your goals
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {learningPaths.map((path, index) => (
                        <div
                            key={path.title}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="border border-[#30363D] rounded-lg p-5 sm:p-6 md:p-7 lg:p-8 hover:border-[#1F6FEB] hover:-translate-y-1 transition-all duration-300 bg-[#161B22]/30"
                        >

                            {/* Title & Description */}
                            <div className="mb-5 sm:mb-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-[#C9D1D9] mb-2 sm:mb-3">
                                    {path.title}
                                </h3>

                                <p className="text-xs sm:text-sm text-[#8B949E] leading-relaxed">
                                    {path.description}
                                </p>
                            </div>

                            {/* Technologies */}
                            <div className="mb-5 sm:mb-6">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <CheckCircle2 className="w-4 h-4 text-[#238636]" />
                                    <span className="text-xs sm:text-sm font-medium text-[#C9D1D9]">
                                        Technologies
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {path.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 sm:px-3 py-1 text-xs bg-[#161B22] text-[#8B949E] rounded-md"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-[#30363D] pt-3 sm:pt-4">
                                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#8B949E]">
                                    <Clock className="w-4 h-4" />
                                    <span className="hidden sm:inline">{path.duration}</span>
                                    <span className="sm:hidden">{path.duration.replace(' weeks', 'w')}</span>
                                </div>

                                <span className="text-xs font-medium text-[#1F6FEB]">
                                    {path.level}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div
                    className="text-center mt-8 sm:mt-10 lg:mt-12"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <Link to="/signup" className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 border border-[#30363D] text-[#C9D1D9] rounded-md hover:border-[#1F6FEB] hover:text-[#1F6FEB] transition-all text-sm sm:text-base">
                        View All Learning Paths
                    </Link>
                </div>

            </div>
        </section>
    );
}
