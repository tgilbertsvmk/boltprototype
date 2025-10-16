import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ProfilerFlowProps {
  onComplete: (data: {
    industry: string;
    useCase: string;
    role: string;
    teamType: string;
  }) => void;
  onDismiss: () => void;
}

export function ProfilerFlow({ onComplete, onDismiss }: ProfilerFlowProps) {
  const [industry, setIndustry] = useState('');
  const [useCase, setUseCase] = useState('');
  const [role, setRole] = useState('');
  const [teamType, setTeamType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (industry && useCase && role && teamType) {
      onComplete({ industry, useCase, role, teamType });
    }
  };

  const isValid = industry && useCase && role && teamType;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onDismiss}
      />

      <div className="relative max-w-2xl w-full">
        <button
          onClick={onDismiss}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="text-gray-600" size={20} />
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 py-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-3">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Your Survey</h1>
            <p className="text-green-50">
              Tell us about your needs to generate a personalized survey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What industry do you work in?
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900"
                required
              >
                <option value="">Select your industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Finance">Finance</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What's your primary use case?
              </label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900"
                required
              >
                <option value="">Select your use case</option>
                <option value="Employee Engagement">Employee Engagement</option>
                <option value="Customer Satisfaction">Customer Satisfaction</option>
                <option value="Market Research">Market Research</option>
                <option value="Event Feedback">Event Feedback</option>
                <option value="Product Feedback">Product Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What's your role?
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900"
                required
              >
                <option value="">Select your role</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Marketing Manager">Marketing Manager</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Executive">Executive</option>
                <option value="Operations">Operations</option>
                <option value="Researcher">Researcher</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Are you working solo or with a team?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTeamType('Solo')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    teamType === 'Solo'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Solo
                </button>
                <button
                  type="button"
                  onClick={() => setTeamType('Team')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    teamType === 'Team'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Team
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                isValid
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Generate My Survey
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
