import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface EditorProps {
  onSchemaChange: (schema: object | null) => void;
}

const Editor: React.FC<EditorProps> = ({ onSchemaChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [json, setJson] = useState<string>(
    `{
      "formTitle": "Sample Form",
      "fields": []
    }`
  );

  const handleEditorChange = (value: string | undefined) => {
    setJson(value || "");
    try {
      if (value) {
        const parsedSchema = JSON.parse(value);
        onSchemaChange(parsedSchema);
        setError(null);
      }
    } catch (err) {
      setError("Invalid JSON. Please fix the errors.");
      onSchemaChange(null);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
    alert("JSON copied to clipboard!");
  };

  return (
    <div className="h-full p-4">
      <h2 className="text-lg font-bold mb-2">JSON Editor</h2>
      <MonacoEditor
        height="70%"
        defaultLanguage="json"
        value={json}
        onChange={handleEditorChange}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={copyToClipboard}
        className="hover:bg-sky-800 bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Copy Form JSON
      </button>
    </div>
  );
};

export default Editor;
