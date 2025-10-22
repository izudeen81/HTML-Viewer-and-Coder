
import React, { useState, useCallback } from 'react';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import GeminiControls from './components/GeminiControls';
import { editHtmlCode } from './services/geminiService';
import { INITIAL_HTML } from './constants';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [htmlCode, setHtmlCode] = useState<string>(INITIAL_HTML);
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!editPrompt.trim()) {
      setError('Please enter an edit instruction.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const updatedCode = await editHtmlCode(htmlCode, editPrompt);
      setHtmlCode(updatedCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [htmlCode, editPrompt]);

  return (
    <div className="flex flex-col h-screen bg-dark-bg text-light-text font-sans">
      <header className="flex items-center justify-between p-4 bg-card-bg border-b border-border-color shadow-md">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <h1 className="text-xl font-bold text-header-text">Gemini HTML Editor</h1>
        </div>
      </header>
      
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        <div className="flex flex-col gap-4 overflow-hidden">
          <GeminiControls
            prompt={editPrompt}
            onPromptChange={setEditPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          {error && <div className="p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-md text-sm">{error}</div>}
          <CodeEditor value={htmlCode} onChange={setHtmlCode} />
        </div>
        <div className="flex flex-col rounded-lg bg-card-bg border border-border-color overflow-hidden">
           <div className="p-3 bg-gray-900/50 border-b border-border-color">
            <h2 className="font-semibold text-header-text">Live Preview</h2>
          </div>
          <Preview htmlCode={htmlCode} />
        </div>
      </main>
    </div>
  );
};

export default App;
