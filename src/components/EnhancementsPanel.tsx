import { CheckCircle2, Circle, HelpCircle, Wand2, Crown } from 'lucide-react';
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

export function EnhancementsPanel({ questionCount }: EnhancementsPanelProps) {
  const [hoveredSuggestion, setHoveredSuggestion] = useState<string | null>(null);

  const checklistItems = [
    { id: 1, label: 'Add a question', completed: questionCount > 0 },
    { id: 2, label: 'Make the language simpler', completed: false },
    { id: 3, label: 'Set up your survey audience', completed: false },
    { id: 4, label: 'Take a test survey', completed: false },
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
    <div className="h-full bg-gray-50 border-l border-gray-200">
      <div className="h-full flex flex-col p-8 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Before you send</h2>
          <div className="space-y-2">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                {item.completed ? (
                  <CheckCircle2 className="text-green-600 shrink-0" size={18} />
                ) : (
                  <Circle className="text-gray-300 shrink-0" size={18} />
                )}
                <span
                  className={`text-sm ${
                    item.completed ? 'text-gray-900 line-through' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

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
