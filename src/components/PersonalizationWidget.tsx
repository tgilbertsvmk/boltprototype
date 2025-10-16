import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

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

  if (!isExpanded) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onToggle}
      />

      <div className="relative max-w-xl w-full animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="text-gray-600" size={20} />
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
            <div className="flex items-center gap-3 justify-center">
              <Sparkles className="text-white" size={24} />
              <h2 className="text-2xl font-bold text-white">Survey Profile</h2>
            </div>
            <p className="text-blue-50 text-center text-sm mt-2">
              Adjust these details to regenerate your survey
            </p>
          </div>

          <div className="p-8">
            <button
              onClick={onOpenProfiler}
              className="w-full mb-6 bg-green-50 text-green-700 border border-green-200 py-3 px-4 rounded-lg font-semibold hover:bg-green-100 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              Create New Survey
            </button>

            <div className="space-y-5">
              {Object.entries(editedSignals).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 capitalize">
                    {key.replace(/_/g, ' ')}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleSignalChange(key, e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              ))}
            </div>

            {hasChanges && (
              <button
                onClick={handleApplyChanges}
                className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                Regenerate Survey
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
