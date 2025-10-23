import React, { useState, useCallback, useEffect, useRef } from 'react';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import GeminiControls from './components/GeminiControls';
import ApiKeyModal from './components/ApiKeyModal';
import { editHtmlCode, GeminiError } from './lib/gemini';
import type { GeminiErrorType } from './lib/gemini';
import { INITIAL_HTML } from './constants';
import { LogoIcon, ExpandIcon, CollapseIcon, RetryIcon, SunIcon, MoonIcon, PencilIcon, InspectIcon, KeyIcon } from './components/Icons';
import { useTheme } from './hooks/useTheme';
import { usePersistentStringState } from './hooks/usePersistentStringState';
import { useResizablePanes } from './hooks/useResizablePanes';
import { useApiKey } from './hooks/useApiKey';


const MIN_SUBMIT_TIME_MS = 2000; // 2 seconds

/**
 * The main application component. It orchestrates the entire UI, including
 * the code editor, live preview, and Gemini controls, and manages the application's state.
 * @returns {React.FC} The rendered application component.
 */
const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [htmlCode, setHtmlCode] = usePersistentStringState('gemini-html-editor-code', INITIAL_HTML);
  const { editorPaneRef, handleResizeMouseDown } = useResizablePanes();
  const [apiKey, setApiKey] = useApiKey();
  
  const [previousHtmlCode, setPreviousHtmlCode] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string; type: GeminiErrorType } | null>(null);
  const [isPreviewFullScreen, setIsPreviewFullScreen] = useState<boolean>(false);
  const [isWysiwygEnabled, setIsWysiwygEnabled] = useState<boolean>(false);
  const [isInspectorEnabled, setIsInspectorEnabled] = useState<boolean>(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const formLoadTime = useRef(Date.now());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPreviewFullScreen) {
        setIsPreviewFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPreviewFullScreen]);

  const handleSubmit = useCallback(async () => {
    // Anti-spam: Honeypot check
    if (honeypot) {
      console.warn('Honeypot field filled. Possible bot detected.');
      setError({ message: 'Submission blocked due to unusual activity. Please try again.', type: 'UNKNOWN' });
      return;
    }

    // Anti-spam: Timestamp check
    if (Date.now() - formLoadTime.current < MIN_SUBMIT_TIME_MS) {
      console.warn('Form submitted too quickly. Possible bot detected.');
      setError({ message: 'Submission blocked due to unusual activity. Please try again.', type: 'UNKNOWN' });
      return;
    }

    if (!editPrompt.trim()) {
      setError({ message: 'Please enter an edit instruction.', type: 'UNKNOWN' });
      return;
    }
    setIsLoading(true);
    setError(null);
    setSelectedCode(null);
    setPreviousHtmlCode(htmlCode); // Save current code for undo
    try {
      const updatedCode = await editHtmlCode(htmlCode, editPrompt);
      setHtmlCode(updatedCode);
    } catch (err) {
      if (err instanceof GeminiError) {
        setError({ message: err.message, type: err.type });
        if (err.type === 'API_KEY') {
            setIsApiKeyModalOpen(true); // Open modal on invalid key error
        }
      } else if (err instanceof Error) {
        setError({ message: err.message, type: 'UNKNOWN' });
      } else {
        setError({ message: 'An unknown error occurred.', type: 'UNKNOWN' });
      }
    } finally {
      setIsLoading(false);
    }
  }, [htmlCode, editPrompt, honeypot, setHtmlCode]);

  const handleUndo = useCallback(() => {
    if (previousHtmlCode !== null) {
      setHtmlCode(previousHtmlCode);
      setPreviousHtmlCode(null);
      setSelectedCode(null);
    }
  }, [previousHtmlCode, setHtmlCode]);
  
  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the code to its initial state?')) {
      setHtmlCode(INITIAL_HTML);
      setPreviousHtmlCode(null);
      setError(null);
      setSelectedCode(null);
    }
  }, [setHtmlCode]);
  
  const handleLoadTemplate = useCallback((templateHtml: string) => {
    setPreviousHtmlCode(htmlCode); // Save current code to make this undoable
    setHtmlCode(templateHtml);
    setError(null);
    setSelectedCode(null);
  }, [htmlCode, setHtmlCode]);

  const handleToggleFullScreen = useCallback(() => {
    setIsPreviewFullScreen(prev => !prev);
  }, []);
  
  const handleWysiwygChange = useCallback((newBodyHtml: string) => {
    setHtmlCode(currentHtml => {
        const bodyRegex = /(<body[^>]*>)([\s\S]*)(<\/body>)/is;
        if (bodyRegex.test(currentHtml)) {
            return currentHtml.replace(bodyRegex, `$1${newBodyHtml}$3`);
        }
        console.warn("Could not find <body> tag to update from WYSIWYG editor.");
        return currentHtml;
    });
  }, [setHtmlCode]);

  const toggleWysiwyg = useCallback(() => {
    setIsWysiwygEnabled(prev => {
        const newState = !prev;
        if (newState) {
            setIsInspectorEnabled(false);
        }
        return newState;
    });
    setSelectedCode(null);
  }, []);

  const toggleInspector = useCallback(() => {
    setIsInspectorEnabled(prev => {
        const newState = !prev;
        if (newState) {
            setIsWysiwygEnabled(false);
        }
        return newState;
    });
    setSelectedCode(null);
  }, []);

  const handleElementSelect = useCallback((elementHtml: string) => {
    setSelectedCode(elementHtml);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedCode(null);
  }, []);

  const previewPaneClasses = isPreviewFullScreen
    ? "fixed inset-0 z-50 bg-white dark:bg-card-bg flex flex-col"
    : "flex flex-col flex-grow bg-white dark:bg-card-bg border border-gray-200 dark:border-border-color overflow-hidden m-4 ml-0 rounded-lg";

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-light-text font-sans transition-colors duration-300">
      <header className="flex items-center justify-between p-4 bg-white dark:bg-card-bg border-b border-gray-200 dark:border-border-color shadow-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <h1 className="text-xl font-bold text-gray-900 dark:text-header-text">IZU's Gemini HTML Editor</h1>
        </div>
        {!isPreviewFullScreen && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="p-2 rounded-full text-gray-600 dark:text-light-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tm-orange dark:focus:ring-offset-card-bg"
              aria-label="Manage API Key"
              title="Manage API Key"
            >
              <KeyIcon />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-light-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tm-orange dark:focus:ring-offset-card-bg"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        )}
      </header>
      
      <main className={`flex-grow ${isPreviewFullScreen ? '' : 'flex'} overflow-hidden`}>
        {!isPreviewFullScreen && (
          <>
            <div ref={editorPaneRef} className="flex flex-col gap-4 overflow-auto p-4 flex-shrink-0" style={{ width: '50%'}}>
              <GeminiControls
                prompt={editPrompt}
                onPromptChange={setEditPrompt}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                canUndo={previousHtmlCode !== null}
                onUndo={handleUndo}
                honeypotValue={honeypot}
                onHoneypotChange={setHoneypot}
              />
              {error && (
                <div className="p-3 bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700 rounded-md text-sm flex justify-between items-center gap-4">
                  <span>{error.message}</span>
                  <div className="flex gap-2">
                    {error.type === 'RATE_LIMIT_EXCEEDED' && !isLoading && (
                       <button
                         onClick={() => setIsApiKeyModalOpen(true)}
                         className="flex items-center gap-1.5 px-3 py-1 bg-red-200 hover:bg-red-300 text-red-900 font-semibold dark:bg-red-800/70 dark:hover:bg-red-700 dark:text-light-text rounded-md text-xs whitespace-nowrap"
                         aria-label="Enter API Key"
                       >
                         Enter API Key
                       </button>
                    )}
                    {['NETWORK', 'UNKNOWN'].includes(error.type) && !isLoading && (
                      <button
                        onClick={handleSubmit}
                        className="flex items-center gap-1.5 px-3 py-1 bg-red-200 hover:bg-red-300 text-red-900 font-semibold dark:bg-red-800/70 dark:hover:bg-red-700 dark:text-light-text rounded-md text-xs whitespace-nowrap"
                        aria-label="Retry request"
                      >
                        <RetryIcon />
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              )}
              <CodeEditor 
                value={htmlCode} 
                onChange={setHtmlCode} 
                onReset={handleReset}
                selectedCode={selectedCode}
                onClearSelection={handleClearSelection}
                onLoadTemplate={handleLoadTemplate}
              />
            </div>
          
            <div 
              onMouseDown={handleResizeMouseDown}
              className="w-2 cursor-col-resize bg-gray-200 dark:bg-border-color transition-colors hover:bg-tm-orange flex-shrink-0"
              aria-hidden="true"
            />
          </>
        )}

        <div className={previewPaneClasses}>
           <div className="p-3 bg-gray-100 dark:bg-gray-900/50 border-b border-gray-200 dark:border-border-color flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-header-text">Live Preview</h2>
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleInspector}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-sm transition-colors ${
                        isInspectorEnabled
                        ? 'bg-tm-blue text-white hover:bg-blue-700'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-light-text hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    aria-label={isInspectorEnabled ? "Disable inspect mode" : "Enable inspect mode"}
                    title={isInspectorEnabled ? "Disable inspect mode" : "Enable inspect mode"}
                >
                    <InspectIcon />
                    <span>Inspect</span>
                </button>
                <button
                    onClick={toggleWysiwyg}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-sm transition-colors ${
                        isWysiwygEnabled
                        ? 'bg-tm-blue text-white hover:bg-blue-700'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-light-text hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    aria-label={isWysiwygEnabled ? "Disable live editor" : "Enable live editor"}
                    title={isWysiwygEnabled ? "Disable live editor" : "Enable live editor"}
                >
                    <PencilIcon />
                    <span>Edit</span>
                </button>
                <button
                onClick={handleToggleFullScreen}
                className="p-1 text-gray-600 dark:text-light-text hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-tm-orange"
                aria-label={isPreviewFullScreen ? "Exit full screen" : "View full screen"}
                >
                {isPreviewFullScreen ? <CollapseIcon /> : <ExpandIcon />}
                </button>
            </div>
          </div>
          <Preview 
            htmlCode={htmlCode} 
            isWysiwygEnabled={isWysiwygEnabled}
            isInspectorEnabled={isInspectorEnabled}
            onWysiwygChange={handleWysiwygChange}
            onElementSelect={handleElementSelect}
          />
        </div>
      </main>
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        currentKey={apiKey}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={setApiKey}
      />
    </div>
  );
};

export default App;