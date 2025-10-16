import { useState, useEffect } from 'react';
import { Send, Plus, Loader2 } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { PersonalizationWidget } from './PersonalizationWidget';
import { EnhancementsPanel } from './EnhancementsPanel';
import { Question, Survey, supabase } from '../lib/supabase';
import { regenerateQuestion } from '../lib/surveyGenerator';

interface SurveyEditorProps {
  survey: Survey;
  questions: Question[];
  onDeploy: () => void;
  onRegenerateAll: (signals: Record<string, string>) => void;
  initialExpanded?: boolean;
}

export function SurveyEditor({ survey, questions: initialQuestions, onDeploy, onRegenerateAll, initialExpanded = false }: SurveyEditorProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [isWidgetExpanded, setIsWidgetExpanded] = useState(initialExpanded);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  const handleUpdateQuestion = async (id: string, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, question_text: text } : q))
    );

    const { error } = await supabase
      .from('questions')
      .update({ question_text: text, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleRegenerateQuestion = async (id: string, style: 'concise' | 'casual') => {
    const question = questions.find((q) => q.id === id);
    if (!question) return;

    const newText = regenerateQuestion(question.question_text, question.question_type, style);

    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, question_text: newText } : q))
    );

    const { error } = await supabase
      .from('questions')
      .update({ question_text: newText, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error regenerating question:', error);
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    await onDeploy();
    setIsDeploying(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <PersonalizationWidget
        signals={survey.personalization_signals}
        onUpdate={(signals) => {
          onRegenerateAll(signals);
        }}
        onGenerate={() => {
          setIsWidgetExpanded(false);
        }}
        isExpanded={isWidgetExpanded}
        onToggle={() => setIsWidgetExpanded(!isWidgetExpanded)}
      />

      <div className="max-w-[1400px] mx-auto flex">
        <div className="w-[60%] pl-[10%] pr-8 py-8">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
              {survey.personalization_signals.use_case || 'Your Survey'}
            </h1>
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Deploy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            Review and customize your questions below
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onUpdate={handleUpdateQuestion}
              onRegenerate={handleRegenerateQuestion}
            />
          ))}
        </div>

        <button className="mt-4 w-full border border-gray-200 rounded-lg py-4 text-gray-400 hover:border-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-medium text-sm">
          <Plus size={16} />
          Add Question
        </button>
        </div>

        <div className="w-[40%] pr-[10%]">
          <EnhancementsPanel questionCount={questions.length} />
        </div>
      </div>
    </div>
  );
}
