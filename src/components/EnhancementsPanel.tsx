import { CheckCircle2, Circle, HelpCircle, Wand2, Crown, Users, TestTube, Target, Briefcase, MapPin, GraduationCap, Building2, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface EnhancementsPanelProps {
  questionCount: number;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  explanation: string;
}

interface ChecklistItem {
  id: number;
  icon: React.ElementType;
  label: string;
  description: string;
  completed: boolean;
  color: string;
}

interface ProfileField {
  id: string;
  icon: React.ElementType;
  label: string;
  value: string;
  placeholder: string;
  color: string;
}

export function EnhancementsPanel({ questionCount }: EnhancementsPanelProps) {
  const [hoveredSuggestion, setHoveredSuggestion] = useState<string | null>(null);

  const surveyChecklistItems: ChecklistItem[] = [
    {
      id: 1,
      icon: Sparkles,
      label: 'Add a question',
      description: 'Create at least one question',
      completed: questionCount > 0,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      icon: Target,
      label: 'Define your audience',
      description: 'Who should take this survey?',
      completed: false,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 3,
      icon: TestTube,
      label: 'Test your survey',
      description: 'Try it yourself before sharing',
      completed: false,
      color: 'text-orange-600 bg-orange-50'
    },
  ];

  const profileFields: ProfileField[] = [
    {
      id: 'role',
      icon: Briefcase,
      label: 'Role',
      value: '',
      placeholder: 'e.g., Product Manager',
      color: 'text-slate-600 bg-slate-50'
    },
    {
      id: 'industry',
      icon: Building2,
      label: 'Industry',
      value: '',
      placeholder: 'e.g., Technology',
      color: 'text-cyan-600 bg-cyan-50'
    },
    {
      id: 'company-size',
      icon: Users,
      label: 'Company Size',
      value: '',
      placeholder: 'e.g., 50-200 employees',
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'location',
      icon: MapPin,
      label: 'Location',
      value: '',
      placeholder: 'e.g., San Francisco, CA',
      color: 'text-rose-600 bg-rose-50'
    },
    {
      id: 'education',
      icon: GraduationCap,
      label: 'Education',
      value: '',
      placeholder: 'e.g., Bachelor\'s Degree',
      color: 'text-amber-600 bg-amber-50'
    },
  ];

  const suggestions: Suggestion[] = [
    {
      id: 'simplify-language',
      title: 'Simplify technical terms',
      description: 'Replace jargon with plain language for better understanding across all audiences.',
      isPremium: false,
      explanation: 'Questions use terms like "optimize" and "leverage" that could be simplified to "improve" and "use" for broader comprehension.',
    },
    {
      id: 'question-length',
      title: 'Shorten long questions',
      description: 'Question 3 is 28 words long. Shorter questions get better completion rates.',
      isPremium: false,
      explanation: 'Research shows questions over 20 words see a 15% drop in response quality. Question 3 could be split or condensed.',
    },
    {
      id: 'bias-detection',
      title: 'Remove leading language',
      description: 'Questions 2 and 5 contain potentially biased language that could influence responses.',
      isPremium: true,
      explanation: 'Question 2 uses "amazing" which suggests a positive answer. Question 5 assumes prior knowledge without checking.',
    },
    {
      id: 'response-order',
      title: 'Randomize answer options',
      description: 'Prevent order bias by shuffling multiple choice answers for each respondent.',
      isPremium: true,
      explanation: 'First options in lists get selected 12% more often due to primacy bias. Randomization ensures fairer data collection.',
    },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 border-l border-gray-200">
      <div className="h-full flex flex-col p-8 overflow-y-auto">
        {/* This Survey Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-900">This Survey</h2>
          </div>
          <div className="space-y-3">
            {surveyChecklistItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg p-4 border-2 transition-all ${
                    item.completed
                      ? 'border-green-200 bg-green-50/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`${item.color} rounded-lg p-2 shrink-0`}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-semibold ${
                          item.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {item.label}
                        </span>
                        {item.completed && (
                          <CheckCircle2 className="text-green-600 shrink-0" size={16} />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* About You Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 bg-violet-600 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-900">About You</h2>
          </div>
          <p className="text-xs text-gray-600 mb-4">
            Help us personalize your experience and provide better insights
          </p>
          <div className="space-y-3">
            {profileFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`${field.color} rounded-lg p-2 shrink-0`}>
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        defaultValue={field.value}
                        className="w-full text-sm text-gray-900 placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Suggestions Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Suggestions</h3>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`${
                  suggestion.isPremium
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-orange-200'
                    : 'bg-white border-gray-200'
                } border rounded-lg p-4 relative`}
              >
                {suggestion.isPremium && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-600 text-white">
                      <Crown size={10} />
                      Premium
                    </span>
                  </div>
                )}
                <div className="mb-2 pr-20">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-gray-600">{suggestion.description}</p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="relative">
                    <button
                      className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                      onMouseEnter={() => setHoveredSuggestion(suggestion.id)}
                      onMouseLeave={() => setHoveredSuggestion(null)}
                    >
                      <HelpCircle size={14} />
                      <span>Why this?</span>
                    </button>
                    {hoveredSuggestion === suggestion.id && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-10">
                        {suggestion.explanation}
                        <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                  <button
                    className={`flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-md text-xs font-medium text-gray-900 transition-colors ml-auto ${
                      suggestion.isPremium
                        ? 'border border-orange-300 hover:bg-orange-50'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Wand2 size={13} />
                    Do this for me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
