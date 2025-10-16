import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface PersonalizationWidgetProps {
  signals: Record<string, string>;
  onUpdate: (signals: Record<string, string>) => void;
  onGenerate: () => void;
  onOpenProfiler: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export function PersonalizationWidget({
  signals,
  onUpdate,
  onGenerate,
  onOpenProfiler,
  isExpanded,
  onToggle,
}: PersonalizationWidgetProps) {
  const [editedSignals, setEditedSignals] = useState(signals);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSignalChange = (key: string, value: string) => {
    const newSignals = { ...editedSignals, [key]: value };
    setEditedSignals(newSignals);
    setHasChanges(true);
  };

  const handleApplyChanges = () => {
    onUpdate(editedSignals);
    setHasChanges(false);
    onGenerate();
  };

  const handleClose = () => {
    if (hasChanges) {
      handleApplyChanges();
    } else {
      onToggle();
    }
  };

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-xl transition-all duration-300 ease-in-out z-50 ${
          isExpanded ? 'w-80' : 'w-14'
        }`}
      >
      {!isExpanded ? (
        <button
          onClick={onToggle}
          className="absolute top-8 left-3.5 w-7 h-7 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Expand personalization panel"
        >
          <Sparkles size={14} />
          <ChevronRight size={14} />
        </button>
      ) : (
        <div className="h-full flex flex-col p-5">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Collapse personalization panel"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            <p className="text-xs text-gray-500 mb-3">
              Adjust these details to regenerate your survey
            </p>

            <button
              onClick={onOpenProfiler}
              className="w-full mb-4 bg-green-50 text-green-700 border border-green-200 py-2.5 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              Create New Survey
            </button>

            {Object.entries(editedSignals).map(([key, value]) => (
              <div key={key} className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600 capitalize">
                  {key.replace(/_/g, ' ')}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleSignalChange(key, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            ))}
          </div>

          {hasChanges && (
            <button
              onClick={handleApplyChanges}
              className="mt-5 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Regenerate Survey
            </button>
          )}
        </div>
      )}
      </div>
    </>
  );
}
