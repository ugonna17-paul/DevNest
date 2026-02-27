import { X, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../config/api';

export function FeedbackModal({ isOpen, onClose }) {
  const [feedback, setFeedback] = useState({
    type: 'suggestion',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedback.message.trim()) {
      toast.error('Please enter your feedback', {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
        }
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: feedback.type,
          message: feedback.message,
          userEmail: user.email,
          userName: user.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit feedback');
      }

      toast.success('Feedback submitted successfully! Thank you!', {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
        }
      });

      setFeedback({ type: 'suggestion', message: '' });
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to submit feedback', {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#161B22] border border-[#30363D] rounded-lg max-w-lg w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#1F6FEB]/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-[#1F6FEB]" size={20} />
            </div>
            <h2 className="text-xl font-bold text-[#C9D1D9]">
              Send Feedback
            </h2>
          </div>
          <p className="text-[#8B949E] text-sm">
            Help us improve DevNest! Share your suggestions or report issues.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Feedback Type */}
          <div>
            <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
              Feedback Type
            </label>
            <select
              value={feedback.type}
              onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
              className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors cursor-pointer"
            >
              <option value="suggestion">💡 Suggestion</option>
              <option value="bug">🐛 Bug Report</option>
              <option value="feature">✨ Feature Request</option>
              <option value="improvement">🚀 Improvement</option>
              <option value="other">💬 Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
              Your Feedback
            </label>
            <textarea
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors resize-none"
              placeholder="Tell us what you think or what you'd like to see..."
              rows={6}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1F6FEB] text-white px-6 py-3 rounded-md hover:bg-[#58A6FF] transition-all flex items-center justify-center gap-2 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            {isSubmitting ? 'Sending...' : 'Send Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
