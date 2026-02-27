import { AuthLayout } from '../components/auth/AuthLayout';
import { Copy, Play, RotateCcw, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const defaultCode = `// Try editing this code!
const greeting = "Hello, DevNest!";
console.log(greeting);

function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 10);
console.log("Sum:", result);`;

export function Playground() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    let consoleOutput = [];
    
    // Override console.log to capture output
    const originalLog = console.log;
    console.log = (...args) => {
      consoleOutput.push(args.join(' '));
    };

    try {
      // Execute the code
      eval(code);
      setOutput(consoleOutput.join('\n'));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      // Restore console.log
      console.log = originalLog;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
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

  const handleReset = () => {
    setCode(defaultCode);
    setOutput('');
  };

  return (
    <AuthLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[#C9D1D9] text-[32px] font-bold mb-2">
            JavaScript Playground
          </h1>
          <p className="text-[#8B949E]">
            Write and test JavaScript code in real-time
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
          {/* Controls Bar */}
          <div className="bg-[#0D1117] border-b border-[#30363D] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <span className="ml-4 text-sm text-[#8B949E]">
                playground.js
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="px-4 py-2 border border-[#30363D] text-[#C9D1D9] rounded-md hover:border-[#58A6FF] transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-[#30363D] text-[#C9D1D9] rounded-md hover:border-[#58A6FF] transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              <button
                onClick={handleRun}
                className="px-4 py-2 bg-[#1F6FEB] text-white rounded-md hover:bg-[#58A6FF] transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <Play size={16} />
                Run Code
              </button>
            </div>
          </div>

          {/* Split Screen Content */}
          <div className="grid lg:grid-cols-2 h-[600px]">
            {/* Left - Code Editor */}
            <div className="bg-[#0D1117] border-r border-[#30363D] flex flex-col">
              <div className="border-b border-[#30363D] px-4 py-2">
                <span className="text-[#8B949E] text-[12px] font-semibold tracking-wide uppercase">
                  Code Editor
                </span>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 p-6 font-mono text-sm focus:outline-none resize-none bg-[#0D1117] text-[#C9D1D9]"
                spellCheck={false}
              />
            </div>

            {/* Right - Output */}
            <div className="bg-[#161B22] flex flex-col">
              <div className="border-b border-[#30363D] px-4 py-2">
                <span className="text-[#8B949E] text-[12px] font-semibold tracking-wide uppercase">
                  Console Output
                </span>
              </div>

              <div className="bg-[#0D1117] flex-1 p-6 overflow-auto">
                {output ? (
                  <pre className="text-[#C9D1D9] text-[14px] font-mono whitespace-pre-wrap">
                    {output}
                  </pre>
                ) : (
                  <p className="text-[#8B949E] text-[14px] italic">
                    Click "Run Code" to see output here...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 mt-6">
          <h3 className="text-[#C9D1D9] text-[16px] font-semibold mb-3">
            💡 Playground Tips
          </h3>
          <ul className="text-[#8B949E] text-[14px] leading-[1.8] list-disc list-inside space-y-2">
            <li>Use <code className="text-[#1F6FEB]">console.log()</code> to see output</li>
            <li>Click "Run Code" to execute your JavaScript</li>
            <li>Use "Reset" to restore the default code</li>
            <li>Errors will be displayed in the console output</li>
          </ul>
        </div>
      </div>
    </AuthLayout>
  );
}
