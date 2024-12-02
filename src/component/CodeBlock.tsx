import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  codeBlock: string[];
  codeLanguage: string;
}

const CreateCodeBlock: React.FC<CodeBlockProps> = ({ codeBlock, codeLanguage,}) => {
  const [copy, setCopy] = useState(false);
  const codeString = codeBlock.join("\n");

  const copied = () => {
    setCopy(true);
    navigator.clipboard.writeText(codeString);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };



  return (
    <div  className=" w-full h-auto bg-[#292d33] rounded-xl overflow-x-hidden my-4 ">
      <div className=" flex justify-between pr-12">
        <p className=" h-12 w-36 pt-3 pl-4 text-[#dfe1e8] font-semibold ">
          {codeLanguage ? codeLanguage : ""}
        </p>
        {!copy ? (
          <button
            onClick={copied}
            className=" flex gap-2 items-center text-sm text-[#b5b8c5]"
          >
            <svg
              className=" dark:fill-[#b5b8c5]"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#FFF"
            >
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
            </svg>
            copy
          </button>
        ) : (
          <button className=" flex  items-center text-sm text-[#b5b8c5]">
            <svg
              className=" dark:fill-[#b5b8c5]"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#FFF"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
            copied !
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language={codeLanguage ? codeLanguage : "python"}
        style={atomOneDark}
        wrapLongLines={true}
        wrapLines={true}
        customStyle={{ width: "100%", minWidth: "100%", height: "auto", paddingLeft: "25px", paddingTop: 0, marginTop: 0}}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CreateCodeBlock;
