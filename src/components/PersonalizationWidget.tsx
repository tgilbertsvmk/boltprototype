import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Briefcase, Target, UserCircle, Users, Building2, Mail, Phone, MapPin } from 'lucide-react';

interface PersonalizationWidgetProps {
  signals: Record<string, string>;
  onUpdate: (signals: Record<string, string>) => void;
  onGenerate: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export function PersonalizationWidget({
  signals,
  onUpdate,
  onGenerate,
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
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-2xl transition-all duration-300 ease-in-out z-50 ${
          isExpanded ? 'w-[420px]' : 'w-16'
        }`}
      >
      {!isExpanded ? (
        <button
          onClick={onToggle}
          className="absolute top-8 left-4 w-8 h-8 flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:text-blue-600 transition-all hover:scale-110"
          aria-label="Expand personalization panel"
        >
          <UserCircle size={20} strokeWidth={2} />
        </button>
      ) : (
        <div className="h-full flex flex-col">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 pb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <UserCircle className="text-white" size={24} strokeWidth={2} />
                </div>
                <h2 className="text-xl font-bold text-white">Profile</h2>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                aria-label="Collapse personalization panel"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <p className="text-blue-100 text-sm font-medium">
              Customize your experience
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-amber-100 p-1.5 rounded-lg">
                    <Sparkles className="text-amber-600" size={16} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">This Survey</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  These settings affect the current survey generation
                </p>
                <div className="space-y-4">
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="text-blue-600" size={16} strokeWidth={2} />
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Industry
                      </label>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-blue-300 transition-colors">
                      <input
                        type="text"
                        value={editedSignals.industry || ''}
                        onChange={(e) => handleSignalChange('industry', e.target.value)}
                        className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                        placeholder="e.g., Technology"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="text-green-600" size={16} strokeWidth={2} />
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Use Case
                      </label>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-blue-300 transition-colors">
                      <input
                        type="text"
                        value={editedSignals.use_case || ''}
                        onChange={(e) => handleSignalChange('use_case', e.target.value)}
                        className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                        placeholder="e.g., Employee Engagement"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="text-orange-600" size={16} strokeWidth={2} />
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Role
                      </label>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-blue-300 transition-colors">
                      <input
                        type="text"
                        value={editedSignals.role || ''}
                        onChange={(e) => handleSignalChange('role', e.target.value)}
                        className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                        placeholder="e.g., HR Manager"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="text-pink-600" size={16} strokeWidth={2} />
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Team Type
                      </label>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-blue-300 transition-colors">
                      <input
                        type="text"
                        value={editedSignals.team_type || ''}
                        onChange={(e) => handleSignalChange('team_type', e.target.value)}
                        className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                        placeholder="e.g., Team"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-100 p-1.5 rounded-lg">
                    <UserCircle className="text-blue-600" size={16} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">About You</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Your permanent profile information
                </p>
                <div className="space-y-4">
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <UserCircle className="text-gray-600" size={16} strokeWidth={2} />
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Full Name
                      </label>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-blue-300 transition-colors">
                      <input
                        type="text"
                        className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                        placeholder="Your name"
                        defaultValue="Alex Thompson"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="text-gray-600" size={16} strokeWidth={2} />
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Email
                      </label>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-blue-300 transition-colors">
                      <input
                        type="email"
                        className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                        placeholder="your@email.com"
                        defaultValue="alex@company.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="text-gray-600" size={16} strokeWidth={2} />
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Phone
                      </label>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-blue-300 transition-colors">
                      <input
                        type="tel"
                        className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                        placeholder="+1 (555) 000-0000"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="text-gray-600" size={16} strokeWidth={2} />
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Location
                      </label>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-blue-300 transition-colors">
                      <input
                        type="text"
                        className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                        placeholder="City, Country"
                        defaultValue="San Francisco, CA"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6">
            {hasChanges && (
              <button
                onClick={handleApplyChanges}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 flex items-center justify-center gap-2"
              >
                <Sparkles size={18} strokeWidth={2} />
                Regenerate Survey
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
