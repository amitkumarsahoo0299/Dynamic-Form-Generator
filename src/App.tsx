import React, { useState } from 'react';
import Editor from './components/Editor';
import FormPreview from './components/FormPreview';

const App: React.FC = () => {
  const [schema, setSchema] = useState<object | null>(null);

  

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-auto bg-white text-black">
      <div className="w-1/2 border-r">
        <Editor onSchemaChange={setSchema} />
      </div>

      <div className="w-1/2">
        <FormPreview schema={schema} />
      </div>
    </div>
  );
};

export default App;
