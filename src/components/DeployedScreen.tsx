import { CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface DeployedScreenProps {
  surveyId: string;
  onCreateNew: () => void;
}

export function DeployedScreen({ surveyId, onCreateNew }: DeployedScreenProps) {
  const [copied, setCopied] = useState(false);
  const surveyUrl = `https://surveymonkey.com/r/${surveyId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(surveyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6 animate-bounce">
            <CheckCircle className="text-white" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Survey Deployed!</h1>
          <p className="text-lg text-gray-600">
            Your survey is live and ready to collect responses
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Share your survey link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={surveyUrl}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-mono text-sm"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
              >
                <Copy size={18} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">0</div>
              <div className="text-sm text-gray-600">Responses</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">0%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <a
              href={surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
            >
              <ExternalLink size={20} />
              Preview Survey
            </a>
            <button
              onClick={onCreateNew}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:border-green-600 hover:text-green-600 transition-all"
            >
              Create Another Survey
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            You can view detailed analytics and manage your survey from your dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
