import { useState, useRef, useEffect } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { Question } from '../lib/supabase';

interface QuestionCardProps {
  question: Question;
  onUpdate: (id: string, text: string) => void;
  onRegenerate: (id: string, style: 'concise' | 'casual') => void;
}

export function QuestionCard({ question, onUpdate, onRegenerate }: QuestionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(question.question_text);
  const [showRegenerateMenu, setShowRegenerateMenu] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(editedText.length, editedText.length);
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowRegenerateMenu(false);
      }
    };

    if (showRegenerateMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showRegenerateMenu]);

  const handleBlur = () => {
    if (editedText !== question.question_text && editedText.trim()) {
      onUpdate(question.id, editedText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditedText(question.question_text);
      setIsEditing(false);
    }
  };

  const handleRegenerate = async (style: 'concise' | 'casual') => {
    setIsRegenerating(true);
    setShowRegenerateMenu(false);

    setTimeout(() => {
      onRegenerate(question.id, style);
      setIsRegenerating(false);
    }, 800);
  };

  const getQuestionTypeLabel = () => {
    const labels = {
      multiple_choice: 'Multiple Choice',
      text_entry: 'Text Entry',
      dropdown: 'Dropdown',
    };
    return labels[question.question_type];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-all group">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full text-base font-medium text-gray-900 border-2 border-blue-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={Math.max(2, Math.ceil(editedText.length / 60))}
            />
          ) : (
            <div className="relative">
              <h3
                onClick={() => setIsEditing(true)}
                className={`text-base font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors ${
                  isRegenerating ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {question.question_text}
              </h3>
              {isRegenerating && (
                <div className="absolute inset-0 flex items-center">
                  <div className="flex items-center gap-2 text-blue-600 animate-pulse">
                    <Sparkles size={18} />
                    <span className="text-base font-medium">Regenerating...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {question.ai_generated && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium shrink-0">
            <Sparkles size={11} />
            <span>AI</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{getQuestionTypeLabel()}</span>
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            Edit
          </button>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowRegenerateMenu(!showRegenerateMenu)}
              className="flex items-center gap-0.5 text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              Regenerate
              <ChevronDown size={12} />
            </button>
            {showRegenerateMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[160px]">
                <button
                  onClick={() => handleRegenerate('concise')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Make more concise
                </button>
                <button
                  onClick={() => handleRegenerate('casual')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Make more casual
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {question.options.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {question.options.map((option, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-sm text-gray-500 pl-1"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
