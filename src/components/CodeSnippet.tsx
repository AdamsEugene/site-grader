import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "javascript",
}) => {
  return (
    <SyntaxHighlighter
      customStyle={{ margin: 0, textAlign: "left" }}
      language={language}
      style={nightOwl}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
