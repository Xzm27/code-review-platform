"use client";
import { Editor } from "@monaco-editor/react";
import React from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
}) => {
  return (
    <Editor
      height="500px"
      language={language}
      value={value}
      onChange={(newValue) => onChange(newValue || "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 16,
      }}
    />
  );
};


export default CodeEditor;
