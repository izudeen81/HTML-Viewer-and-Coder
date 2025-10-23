import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  currentKey: string;
  onClose: () => void;
  onSave: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, currentKey, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState(currentKey);

  useEffect(() => {
    setInputValue(currentKey);
  }, [currentKey, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(inputValue);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apiKeyModalTitle"
    >
      <div 
        className="bg-white dark:bg-card-bg rounded-lg shadow-xl p-6 w-full max-w-lg m-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
      >
        <h2 id="apiKeyModalTitle" className="text-xl font-bold text-gray-900 dark:text-header-text mb-4">Manage API Key</h2>
        
        <p className="text-sm text-gray-600 dark:text-light-text mb-4">
          This app has a limited number of free requests. To continue editing without limits, you can use your own Google Gemini API key.
        </p>

        <div className="text-sm text-gray-600 dark:text-light-text mb-4 p-3 bg-gray-100 dark:bg-gray-900/50 rounded-md">
            <h3 className="font-semibold text-gray-800 dark:text-header-text mb-1">How to get your API key:</h3>
            <ol className="list-decimal list-inside space-y-1">
                <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-tm-blue hover:underline font-semibold">Google AI Studio</a>.</li>
                <li>Click "Create API key" and copy the generated key.</li>
                <li>Paste it in the field below and click Save.</li>
            </ol>
        </div>

        <div>
          <label htmlFor="api-key-input" className="block text-sm font-medium text-gray-700 dark:text-light-text mb-1">
            Your Gemini API Key
          </label>
          <input
            id="api-key-input"
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your API key here"
            className="w-full bg-gray-50 dark:bg-[#0a192f] border border-gray-300 dark:border-border-color rounded-md px-3 py-2 text-gray-900 dark:text-light-text focus:outline-none focus:ring-2 focus:ring-tm-orange"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-light-text font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-tm-blue text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
