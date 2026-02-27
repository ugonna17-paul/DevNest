import { X, Code, Paintbrush, FileCode } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal on every page load
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#161B22] border border-[#30363D] rounded-lg max-w-2xl w-full p-6 sm:p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#C9D1D9] mb-3">
            Welcome to DevNest! 🎉
          </h2>
          <p className="text-[#8B949E] text-sm sm:text-base">
            Your journey to mastering web development starts here
          </p>
        </div>

        {/* Available Courses */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#C9D1D9] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Currently Available Courses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4 hover:border-[#58A6FF] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#F97316]/10 rounded-lg flex items-center justify-center">
                  <Code className="text-[#F97316]" size={20} />
                </div>
                <h4 className="text-[#C9D1D9] font-semibold">HTML</h4>
              </div>
              <p className="text-[#8B949E] text-xs">Complete course with 32 lessons</p>
            </div>

            <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4 hover:border-[#58A6FF] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center">
                  <Paintbrush className="text-[#3B82F6]" size={20} />
                </div>
                <h4 className="text-[#C9D1D9] font-semibold">CSS</h4>
              </div>
              <p className="text-[#8B949E] text-xs">Complete course with 28 lessons</p>
            </div>

            <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4 hover:border-[#58A6FF] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center">
                  <FileCode className="text-[#F59E0B]" size={20} />
                </div>
                <h4 className="text-[#C9D1D9] font-semibold">JavaScript</h4>
              </div>
              <p className="text-[#8B949E] text-xs">Complete course with 30 lessons</p>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#C9D1D9] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Coming in Version 2.0
          </h3>
          <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'React', 'TypeScript', 'MongoDB', 'Express', 'Next.js', 'Tailwind CSS', 'And more...'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#161B22] border border-[#30363D] text-[#8B949E] text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleClose}
            className="bg-[#1F6FEB] text-white px-8 py-3 rounded-md hover:bg-[#58A6FF] transition-all font-medium w-full sm:w-auto"
          >
            Start Learning Now
          </button>
          <p className="text-[#8B949E] text-xs mt-4">
            Stay tuned for more courses and features!
          </p>
        </div>
      </div>
    </div>
  );
}
