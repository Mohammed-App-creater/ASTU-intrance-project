import React from "react";
import Tables from "./Tables";
import PreFormattedText from "./PreFormattedText";
import CreateCodeBlock from "./CodeBlock";

interface FormattedText {
  type: string;
  text: string[];
  codeLanguage?: string;
  tableBody?: string[][];
}

interface FormattedTextProps {
  formattedText: FormattedText[];
}

const FormattedText: React.FC<FormattedTextProps> = ({ formattedText }) => {
  
  return (
    <div>
      {formattedText.map((item, index) => {
        const { type, text } = item;

        switch (type) {
          case "code":
            return (
              <div key={index}>
              <CreateCodeBlock
                codeLanguage={item.codeLanguage || ""}
                codeBlock={item.text}
              />
              </div>
            );
          case "pre":
            return <div key={index}><PreFormattedText text={text} /></div>;
          case "table":
            return <div key={index}><Tables tableBody={item.tableBody || []} /></div>;
          default:
            return (
              <p
                className="dark:text-white text-warp text-[1.1rem] pl-1 mb-8 w-full"
                key={index}
                dangerouslySetInnerHTML={{ __html: text.join("\n") }}
              />
            );
        }
      })}
    </div>
  );
};

export default FormattedText;
