import { useState } from 'react';
import { Check, Pencil } from 'lucide-react';

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
      // Parse the edited text back into signals (simple parsing)
      // For now, keep the original signals structure but could be enhanced
      onGenerate(signals);
    } else {
      onGenerate(signals);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-[10%] py-12">
        <div className="max-w-3xl">
          <div className="mb-6">
            {!isEditing ? (
              <button
                onClick={handleTextClick}
                className="text-left group w-full"
              >
                <p className="text-3xl font-medium text-gray-900 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {currentSentence}
                  <span className="inline-flex items-center ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil size={20} className="text-gray-400" />
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
                  className="w-full text-3xl font-medium text-gray-900 leading-relaxed bg-white border-2 border-green-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows={3}
                />
              </div>
            )}
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            We've prepared a personalized survey based on your profile. Review and customize the questions below, then deploy when ready.
          </p>

          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
          >
            {hasChanges ? (
              <>
                <Check size={22} />
                <span>Generate Modified Survey</span>
              </>
            ) : (
              <span>Review Survey</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
