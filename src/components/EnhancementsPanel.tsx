import { BarChart3, Lock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface EnhancementsPanelProps {
  questionCount: number;
}

export function EnhancementsPanel({ questionCount }: EnhancementsPanelProps) {
  const qualityScore = Math.min(95, 70 + questionCount * 3);
  const toneScore = 88;
  const contentScore = 82;

  return (
    <div className="h-full bg-gray-50 border-l border-gray-200">
      <div className="h-full flex flex-col p-8 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Enhancements</h2>
        </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Survey Quality</h3>
                  <span className="text-2xl font-bold text-blue-600">{qualityScore}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${qualityScore}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600">
                  Your survey is performing well. Consider the suggestions below to improve further.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Scoring</h3>

                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Tone Quality</span>
                    <span className="text-sm font-semibold text-gray-900">{toneScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${toneScore}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Content Clarity</span>
                    <span className="text-sm font-semibold text-gray-900">{contentScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${contentScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Free Suggestions</h3>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Question Balance</h4>
                      <p className="text-xs text-gray-600">
                        Good mix of question types. Consider adding one more text entry field for detailed feedback.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Length Optimization</h4>
                      <p className="text-xs text-gray-600">
                        Survey length is ideal for engagement. Keep it under 10 questions for best completion rates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Premium Features</h3>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Lock className="text-purple-600" size={14} />
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <Sparkles className="text-purple-600 shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">AI Bias Detection</h4>
                      <p className="text-xs text-gray-600 mb-3">
                        Automatically detect and eliminate leading questions, biased language, and double-barreled questions.
                      </p>
                      <button className="text-xs font-medium text-purple-700 hover:text-purple-800 transition-colors">
                        Upgrade to unlock →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Lock className="text-purple-600" size={14} />
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <Sparkles className="text-purple-600 shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Response Predictions</h4>
                      <p className="text-xs text-gray-600 mb-3">
                        See predicted response patterns and completion rates based on similar surveys.
                      </p>
                      <button className="text-xs font-medium text-purple-700 hover:text-purple-800 transition-colors">
                        Upgrade to unlock →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Lock className="text-purple-600" size={14} />
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <Sparkles className="text-purple-600 shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Accessibility Checker</h4>
                      <p className="text-xs text-gray-600 mb-3">
                        Ensure your survey meets WCAG standards and is accessible to all respondents.
                      </p>
                      <button className="text-xs font-medium text-purple-700 hover:text-purple-800 transition-colors">
                        Upgrade to unlock →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}
