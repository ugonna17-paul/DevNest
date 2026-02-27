import { AuthLayout } from '../components/auth/AuthLayout';
import { FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Projects() {
  return (
    <AuthLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-[#C9D1D9] text-[24px] md:text-[32px] font-bold mb-2">
            Projects
          </h1>
          <p className="text-[#8B949E] text-sm md:text-base">
            Build real-world projects to practice your skills
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-8 md:p-12 text-center">
          <div className="bg-[#0D1117] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <FolderKanban size={32} className="md:hidden text-[#8B949E]" />
            <FolderKanban size={40} className="hidden md:block text-[#8B949E]" />
          </div>
          
          <h2 className="text-[#C9D1D9] text-[20px] md:text-[24px] font-bold mb-3">
            No Projects Yet
          </h2>
          
          <p className="text-[#8B949E] text-[14px] md:text-[16px] leading-[1.6] mb-6 max-w-md mx-auto">
            Complete more lessons to unlock project challenges. Projects help you apply what you've learned by building real applications.
          </p>

          <Link to="/dashboard">
            <button className="bg-[#1F6FEB] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-md hover:bg-[#58A6FF] transition-all cursor-pointer text-sm md:text-base">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
