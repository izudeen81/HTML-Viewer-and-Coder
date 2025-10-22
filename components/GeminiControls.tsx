
import React from 'react';
import { MagicWandIcon, SpinnerIcon } from './Icons';

interface GeminiControlsProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const GeminiControls: React.FC<GeminiControlsProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  isLoading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-card-bg rounded-lg border border-border-color">
      <label htmlFor="prompt-input" className="text-sm font-semibold text-header-text">
        Describe your desired change
      </label>
      <div className="flex gap-2">
        <input
          id="prompt-input"
          type="text"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., 'Make the header text orange and larger'"
          className="flex-grow bg-[#0a192f] border border-border-color rounded-md px-3 py-2 text-light-text focus:outline-none focus:ring-2 focus:ring-tm-orange"
          disabled={isLoading}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-tm-orange text-white font-semibold rounded-md transition-colors hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <SpinnerIcon />
              Editing...
            </>
          ) : (
            <>
              <MagicWandIcon />
              Edit with Gemini
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GeminiControls;
