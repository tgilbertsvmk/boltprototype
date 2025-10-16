import { useState } from 'react';
import { Pencil } from 'lucide-react';

interface ProfileIntroProps {
  signals: Record<string, string>;
  onGenerate: (signals: Record<string, string>) => void;
}

export function ProfileIntro({ signals, onGenerate }: ProfileIntroProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const generateSentence = (s: Record<string, string>) => {
    const role = s.role || 'professional';
    const industry = s.industry || 'your industry';
    const useCase = s.use_case || 'survey';

    return `Create a survey for ${role} at ${industry} creating ${useCase === 'an' || useCase.match(/^[aeiou]/i) ? 'an' : 'a'} ${useCase} survey.`;
  };

  const currentSentence = generateSentence(signals);

  const handleTextClick = () => {
    setIsEditing(true);
    setEditedText(currentSentence);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
    setHasChanges(e.target.value !== currentSentence);
  };

  const handleBlur = () => {
    if (editedText.trim() === '') {
      setEditedText(currentSentence);
      setIsEditing(false);
      setHasChanges(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleGenerate = () => {
    if (hasChanges) {
      onGenerate(signals);
    } else {
      onGenerate(signals);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/20 z-30" />
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-40">
        <div className="max-w-[1400px] mx-auto px-[10%] py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                We've prepared a personalized survey based on your profile
              </p>
              {!isEditing ? (
                <button
                  onClick={handleTextClick}
                  className="text-left group"
                >
                  <p className="text-lg text-gray-900 group-hover:text-gray-600 transition-colors">
                    {currentSentence}
                    <span className="inline-flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Pencil size={14} className="text-gray-400" />
                    </span>
                  </p>
                </button>
              ) : (
                <div className="relative">
                  <textarea
                    value={editedText}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    autoFocus
                    className="w-full text-lg text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={2}
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleGenerate}
              className="flex-shrink-0 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              {hasChanges ? 'Generate Modified Survey' : 'Review Survey'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
