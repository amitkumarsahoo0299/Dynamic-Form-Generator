import React from 'react';
import Editor from '@monaco-editor/react';

interface JsonEditorProps {
  jsonSchema: string;
  onJsonChange: (json: string) => void;
  isValid: boolean;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonSchema, onJsonChange, isValid }) => {
  return (
    <div className="flex-1 p-4 border-r border-gray-300">
      <h2 className="text-lg font-bold mb-4">JSON Editor</h2>
      <Editor
        height="80vh"
        defaultLanguage="json"
        value={jsonSchema}
        onChange={(value) => onJsonChange(value || '')}
        options={{ minimap: { enabled: false } }}
      />
      {!isValid && <p className="text-red-500 mt-2">Invalid JSON format!</p>}
    </div>
  );
};

export default JsonEditor;
