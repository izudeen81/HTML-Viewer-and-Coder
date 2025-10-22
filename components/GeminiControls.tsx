import React from 'react';
import { MagicWandIcon, SpinnerIcon, UndoIcon } from './Icons';

/**
 * @interface GeminiControlsProps
 * @property {string} prompt - The current value of the user's prompt.
 * @property {(prompt: string) => void} onPromptChange - Callback function to update the prompt state.
 * @property {() => void} onSubmit - Callback function to trigger the Gemini API call.
 * @property {boolean} isLoading - Flag indicating whether an API call is in progress.
 * @property {boolean} canUndo - Flag indicating if there is a previous state to undo to.
 * @property {() => void} onUndo - Callback function to trigger an undo action.
 */
interface GeminiControlsProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  canUndo: boolean;
  onUndo: () => void;
}

/**
 * A component that provides the UI for user interaction with the Gemini API.
 * It includes an input field for the prompt and a submission button that shows a loading state.
 * @param {GeminiControlsProps} props - The props for the GeminiControls component.
 * @returns {React.FC<GeminiControlsProps>} The user input controls for Gemini.
 */
const GeminiControls: React.FC<GeminiControlsProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  isLoading,
  canUndo,
  onUndo,
}) => {
  /**
   * Handles the 'keydown' event on the input field, submitting the form on 'Enter'.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-card-bg rounded-lg border border-gray-200 dark:border-border-color">
      <label htmlFor="prompt-input" className="text-sm font-semibold text-gray-900 dark:text-header-text">
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
          className="flex-grow bg-gray-50 dark:bg-[#0a192f] border border-gray-300 dark:border-border-color rounded-md px-3 py-2 text-gray-900 dark:text-light-text focus:outline-none focus:ring-2 focus:ring-tm-orange"
          disabled={isLoading}
        />
        <button
          onClick={onUndo}
          disabled={!canUndo || isLoading}
          className="flex items-center justify-center p-2.5 border border-gray-300 dark:border-border-color text-gray-700 dark:text-light-text font-semibold rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
          aria-label="Undo last edit"
          title="Undo last edit"
        >
          <UndoIcon />
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-tm-orange text-white font-semibold rounded-md transition-colors hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed whitespace-nowrap"
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
