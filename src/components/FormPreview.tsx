import React, { useRef, useState } from "react";

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FormSchema {
  formTitle?: string;
  formDescription?: string;
  fields?: Field[];
}

interface FormPreviewProps {
  schema: FormSchema | null;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const [submittedData, setSubmittedData] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
    );
    setSubmittedData(data);
    console.log("Form Data Submitted:", data);
    alert("Form submitted successfully!");
  };

  const downloadJSON = () => {
    if (Object.keys(submittedData).length === 0) return;
    const jsonStr = JSON.stringify(submittedData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-submission.json";
    a.click();
    URL.revokeObjectURL(url); 
  };

  if (!schema) {
    return (
      <div className="flex-1 p-4 bg-gray-50">
        <h2 className="text-lg font-bold">Form Preview</h2>
        <p className="text-gray-500">Edit the JSON to see the form preview here.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 bg-gray-50">
      <h2 className="text-lg font-bold">{schema.formTitle || "Untitled Form"}</h2>
      <p className="mb-4 text-gray-600">{schema.formDescription}</p>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {schema.fields && schema.fields.length > 0 ? (
          schema.fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block mb-1 font-medium">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === "text" || field.type === "email" ? (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full border px-3 py-2 rounded"
                />
              ) : field.type === "select" ? (
                <select
                  id={field.id}
                  name={field.id}
                  className="w-full border px-3 py-2 rounded"
                  required={field.required}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  className="w-full border px-3 py-2 rounded"
                />
              ) : null}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No fields available in the JSON schema.</p>
        )}
        <button type="submit" className="hover:bg-sky-800 bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      {Object.keys(submittedData).length > 0 && (
        <div className="mt-4 p-4 border rounded bg-green-50">
          <h3 className="font-bold">Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          <button
            onClick={downloadJSON}
            className="hover:bg-sky-800 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download as JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default FormPreview;
