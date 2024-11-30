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
  const hd = formattedText[0] || [];
  console.log(formattedText);
  console.log(hd);

  return (
    <div className={""}>
      {formattedText.map((item, index) => {
        const { type, text } = item;

        switch (type) {
          case "code":
            return (
              <CreateCodeBlock
                key={index}
                codeLanguage={item.codeLanguage || ""}
                codeBlock={item.text.slice(1)}
              />
            );
          case "pre":
            return <PreFormattedText key={index} text={text} />;
          case "table":
            console.log(hd);
            return <Tables key={index} tableBody={item.tableBody || []} />;
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
