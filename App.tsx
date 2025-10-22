
import React, { useState, useCallback, useEffect, useRef } from 'react';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import GeminiControls from './components/GeminiControls';
import { editHtmlCode, GeminiError } from './services/geminiService';
import type { GeminiErrorType } from './services/geminiService';
import { INITIAL_HTML } from './constants';
import { LogoIcon, ExpandIcon, CollapseIcon, RetryIcon, SunIcon, MoonIcon, PencilIcon, InspectIcon } from './components/Icons';

/**
 * The main application component. It orchestrates the entire UI, including
 * the code editor, live preview, and Gemini controls, and manages the application's state.
 * @returns {React.FC} The rendered application component.
 */
const App: React.FC = () => {
  const [htmlCode, setHtmlCode] = useState<string>(INITIAL_HTML);
  const [previousHtmlCode, setPreviousHtmlCode] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string; type: GeminiErrorType } | null>(null);
  const [isPreviewFullScreen, setIsPreviewFullScreen] = useState<boolean>(false);
  const [theme, setTheme] = useState('dark');
  const [isWysiwygEnabled, setIsWysiwygEnabled] = useState<boolean>(false);
  const [isInspectorEnabled, setIsInspectorEnabled] = useState<boolean>(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSubmit = useCallback(async () => {
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
      } else if (err instanceof Error) {
        setError({ message: err.message, type: 'UNKNOWN' });
      } else {
        setError({ message: 'An unknown error occurred.', type: 'UNKNOWN' });
      }
    } finally {
      setIsLoading(false);
    }
  }, [htmlCode, editPrompt]);

  const handleUndo = useCallback(() => {
    if (previousHtmlCode !== null) {
      setHtmlCode(previousHtmlCode);
      setPreviousHtmlCode(null);
      setSelectedCode(null);
    }
  }, [previousHtmlCode]);
  
  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the code to its initial state?')) {
      setHtmlCode(INITIAL_HTML);
      setPreviousHtmlCode(null);
      setError(null);
      setSelectedCode(null);
    }
  }, []);

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
  }, []);

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

  // --- Resizing Logic ---
  const editorPaneRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const handleResizeMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  }, []);

  const handleResizeMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing.current && editorPaneRef.current) {
      const newWidth = e.clientX;
      const minWidth = 300;
      const maxWidth = window.innerWidth - minWidth;
      if (newWidth > minWidth && newWidth < maxWidth) {
        editorPaneRef.current.style.width = `${newWidth}px`;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleResizeMouseMove);
    window.addEventListener('mouseup', handleResizeMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleResizeMouseMove);
      window.removeEventListener('mouseup', handleResizeMouseUp);
    };
  }, [handleResizeMouseMove, handleResizeMouseUp]);

  const previewPaneClasses = isPreviewFullScreen
    ? "fixed inset-0 z-50 bg-white dark:bg-card-bg flex flex-col"
    : "flex flex-col flex-grow bg-white dark:bg-card-bg border border-gray-200 dark:border-border-color overflow-hidden m-4 ml-0 rounded-lg";

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-light-text font-sans transition-colors duration-300">
      <header className="flex items-center justify-between p-4 bg-white dark:bg-card-bg border-b border-gray-200 dark:border-border-color shadow-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <h1 className="text-xl font-bold text-gray-900 dark:text-header-text">Gemini HTML Editor</h1>
        </div>
        {!isPreviewFullScreen && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-light-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tm-orange dark:focus:ring-offset-card-bg"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
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
              />
              {error && (
                <div className="p-3 bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700 rounded-md text-sm flex justify-between items-center gap-4">
                  <span>{error.message}</span>
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
              )}
              <CodeEditor 
                value={htmlCode} 
                onChange={setHtmlCode} 
                onReset={handleReset}
                selectedCode={selectedCode}
                onClearSelection={handleClearSelection}
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
    </div>
  );
};

export default App;
