import React, { useRef, useEffect, useState } from 'react';
import { ResetIcon } from './Icons';

/**
 * @interface CodeEditorProps
 * @property {string} value - The current HTML code to be displayed in the editor.
 * @property {(value: string) => void} onChange - Callback function that is invoked when the content of the editor changes.
 * @property {() => void} onReset - Callback function to reset the editor content.
 * @property {string | null} selectedCode - A snippet of HTML to be highlighted in the editor.
 * @property {() => void} onClearSelection - Callback function to clear the current selection.
 */
interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
  selectedCode: string | null;
  onClearSelection: () => void;
}

/**
 * A styled textarea component for editing HTML code, enhanced with line numbers.
 * @param {CodeEditorProps} props - The props for the CodeEditor component.
 * @returns {React.FC<CodeEditorProps>} A styled textarea with line numbers for code input.
 */
const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, onReset, selectedCode, onClearSelection }) => {
  const [lineNumbers, setLineNumbers] = useState('');
  const linesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const lineCount = value.split('\n').length;
    const numbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
    setLineNumbers(numbers);
  }, [value]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !selectedCode) return;

    // 1. Get the tag name and attributes from the outerHTML provided by the preview.
    const openingTagMatch = selectedCode.match(/^<([a-z0-9\-]+)([^>]*)>/i);
    if (!openingTagMatch) return;

    const tagName = openingTagMatch[1];
    const attrsString = openingTagMatch[2];

    // 2. Parse attributes from the attributes string into a more usable format.
    const attrs = [];
    const attrRegex = /([a-zA-Z0-9\-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
    let match;
    while ((match = attrRegex.exec(attrsString)) !== null) {
      // The value is in capture group 2 (for double quotes) or 3 (for single quotes).
      attrs.push({ name: match[1].toLowerCase(), value: match[2] || match[3] });
    }

    // 3. Construct a robust regex to find this tag in the source code.
    // This regex is insensitive to whitespace and attribute order.
    let searchRegexString = `<${tagName}`;
    for (const attr of attrs) {
      // Add a positive lookahead for each attribute to ensure it exists, regardless of order.
      // We escape characters in the value that have special meaning in regex.
      const escapedValue = attr.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      searchRegexString += `(?=[^>]*?\\s${attr.name}\\s*=\\s*["']${escapedValue}["'])`;
    }
    searchRegexString += '[^>]*>';

    const searchRegex = new RegExp(searchRegexString, 'is');
    const result = value.match(searchRegex);

    if (result && typeof result.index === 'number') {
      const startIndex = result.index;
      // The match is the full opening tag, so its length is the length of our selection.
      const endIndex = startIndex + result[0].length;
      
      textarea.focus();
      textarea.setSelectionRange(startIndex, endIndex);

      // Scroll the selection into view
      const textLines = value.substring(0, startIndex).split('\n');
      const lineNumber = textLines.length;
      const lineHeight = 24; // Corresponds to 1.5rem line-height from CSS
      const visibleLines = Math.floor(textarea.clientHeight / lineHeight);
      textarea.scrollTop = Math.max(0, (lineNumber - Math.floor(visibleLines / 2)) * lineHeight);
    } else {
        console.warn('Inspector could not find the selected element in the code. This can happen with very simple tags (e.g., <p>) without unique attributes.');
    }
  }, [selectedCode, value]);

  const handleScroll = () => {
    if (linesRef.current && textareaRef.current) {
      linesRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onClearSelection();
    onChange(event.target.value);
  };
  
  const handleClick = () => {
    onClearSelection();
  };

  return (
    <div className="flex flex-col flex-grow bg-white dark:bg-card-bg rounded-lg border border-gray-200 dark:border-border-color overflow-hidden">
      <div className="p-3 bg-gray-100 dark:bg-gray-900/50 border-b border-gray-200 dark:border-border-color flex justify-between items-center">
        <h2 className="font-semibold text-gray-900 dark:text-header-text">HTML Code</h2>
        <button
          onClick={onReset}
          className="p-1 text-gray-600 dark:text-light-text hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-tm-orange"
          aria-label="Reset to initial code"
          title="Reset to initial code"
        >
          <ResetIcon />
        </button>
      </div>
      <div className="flex-grow flex font-mono text-sm relative bg-gray-50 dark:bg-[#1a1b26]">
        <div 
          ref={linesRef} 
          className="p-2.5 bg-gray-100 dark:bg-[#1f202e] text-right text-gray-400 dark:text-gray-500 select-none overflow-y-hidden"
          style={{ lineHeight: '1.5rem' }}
          aria-hidden="true"
        >
          <pre className="m-0 -mr-2">{lineNumbers}</pre>
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          onScroll={handleScroll}
          className="flex-grow w-full h-full bg-transparent text-gray-900 dark:text-light-text p-2.5 pl-3 resize-none focus:outline-none"
          style={{ lineHeight: '1.5rem' }}
          spellCheck="false"
          aria-label="HTML Code Editor"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
