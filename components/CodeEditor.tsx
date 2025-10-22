
import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col flex-grow bg-card-bg rounded-lg border border-border-color overflow-hidden">
      <div className="p-3 bg-gray-900/50 border-b border-border-color">
        <h2 className="font-semibold text-header-text">HTML Code</h2>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-4 bg-card-bg text-light-text font-mono text-sm resize-none focus:outline-none placeholder-gray-500"
        placeholder="Enter your HTML code here..."
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;
