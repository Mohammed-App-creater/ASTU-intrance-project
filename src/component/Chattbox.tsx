import { useState, useEffect, useRef } from "react";
//import Table from "./Table";


interface ChattboxProps {
  userMassage?: string;
  aiResponse?: string;
  isSidebarOpen: boolean;
}

function Chattbox(props: ChattboxProps) {
  const userMassage = props.userMassage;
  const aiResponse = props.aiResponse;
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const prevUserMessageRef = useRef("");

  const tableModifrer = (table: string) => {
    const headerRow: string[] = [];
    const bodyRows: string[][] = [];

    // Split the table string into rows
    const rows = table.split("\n").filter((row) => row.trim() !== "");

    // Process each row
    rows.forEach((row, index) => {
      const cells = row
        .trim()
        .split("|")
        .filter((cell) => cell.trim() !== "");

      if (index === 0) {
        // First row is the header row
        headerRow.push(...cells);
      } else {
        // Subsequent rows are body rows
        bodyRows.push(cells);
      }
    });

    console.log("Header Row:", headerRow);
    console.log("Body Rows:", bodyRows);
  };

    

 






  const fortter = (aiResponse: string) => {
    const codeBlock: string[] = [];
    let codeLanguage: string = "";
    const preText: string[] = [];
    let table: string = "";
    const plaintext: string[] = [];

    if (aiResponse) {
      const AILine = aiResponse.split("\n");
      let checker: boolean = false;

      // Excretions
      const Code = new RegExp(/```(\w+)/);
      const codeorPreText = new RegExp(/```/);
      const Table = new RegExp(/^\|/);

      for (let i = 0; i < AILine.length; i++) {
        if (checker) {
          console.log("in checker");
          console.log(AILine[i]);

          if (!AILine[i].match(table) || AILine.length - 1 === i) {
            checker = false;
            tableModifrer(table);
            table = "";
            console.log("close cheker");
          }
        }

        if (AILine[i].match(Code)) {
          codeLanguage = AILine[i].substring(3);
          console.log(codeLanguage);

          i++;
          while (!AILine[i].match(/```/)) {
            codeBlock.push(AILine[i]);
            i++;
          }
          console.log(codeBlock);
        } else if (AILine[i].match(codeorPreText)) {
          const codeExp = new RegExp(
            /^(#!|\/\*|\/\/|#include|<|>|public|private|protected|class|interface|enum|import|package|static|final|function| const|let|var|if|else|for|while|do|switch|case|default|def|with|try|except|finally|using namespace|int main|void main|struct|union|enum)/
          );

          if (AILine[i].match(codeExp)) {
            while (!AILine[i].match(/```/)) {
              codeBlock.push(AILine[i]);
              i++;
            }
          } else {
            while (!AILine[i].match(/```/)) {
              preText.push(AILine[i]);
              i++;
            }
            console.log(preText);
          }
        } else if (AILine[i].match(Table)) {
          table += AILine[i] + "\n";
          checker = true;
          console.log("in table");
        } else {
          let x: string = "";

          if (x.startsWith("**")) {
            x = x.replace("**", "");
            x = `<strong>${x}</strong>`;
          } else if (
            AILine[i].startsWith("*") &&
            AILine[i][1] !== "*" &&
            AILine[i][1] !== "~"
          ) {
            x = AILine[i].slice(1).trim();

            // Use a single regular expression to handle all formatting
            x = x.replace(
              /\*\*(.*?)\*\*|\*\*\*(.*?)\*\*\*|\*(.*?)\*|~~(.*?)~~/g,
              (match, strongItalic, strong, italic, strikethrough) => {
                if (strongItalic) {
                  return `<b>${strongItalic}</b>`; // Bold only, no italics
                } else if (strong) {
                  return `<b>${strong}</b>`;
                } else if (italic) {
                  return `<i>${italic}</i>`;
                } else if (strikethrough) {
                  return `<s>${strikethrough}</s>`;
                }
                return match; // If no match, return the original text
              }
            );

            x = `<li>${x}</li>`;
          } else if (x.startsWith("***")) {
            x = x.replace("***", "");
            x = `<strong><i>${x}</i></strong>`;
          } else if (x.startsWith("*")) {
            x = x.replace("*", "");
            x = `<i>${x}</i>`;
          } else if (x.startsWith("~~")) {
            x = x.replace("~~", "");
            x = `<s>${x}</s>`;
          } else if (x.startsWith(">")) {
            x = x.replace(">", "");
            x = `<blockquote>${x}</blockquote>`;
          } else if (x.startsWith("[")) {
            x = x.replace("[", "");
            x = x.replace("]", "");
            x = x.replace("(", "");
            x = x.replace(")", "");
            x = `<a href="${x}">${x}</a>`;
          } else if (x.startsWith("![")) {
            x = x.replace("![", "");
            x = x.replace("]", "");
            x = x.replace("(", "");
            x = x.replace(")", "");
            x = `<div className="max-w-[200px] max-h-[300px] relative">
                  <a href="${x}">
                      <img
                         src="${x}"
                         alt="${x}"
                         className="object-cover w-full h-full"
                       />
                  </a>
              </div>`;
          }

          plaintext.push(x);
          console.log(x);
        }
      }
    }
  };

  useEffect(() => {
    if (userMassage && userMassage !== prevUserMessageRef.current) {
      setChatHistory((prevHistory) => [...prevHistory, userMassage]);
      prevUserMessageRef.current = userMassage;
    } else if (aiResponse) {
      setChatHistory((prevHistory) => [...prevHistory, aiResponse]);
    }
  }, [userMassage, aiResponse]);



  return (
    <div
      className={` w-full  flex justify-center h-[81%] mb-[3rem] overflow-y-auto transition-all ease-linear ${
        props.isSidebarOpen ? " lg:translate-x-48" : ""
      } `}
    >
      <div
        className={`  w-[80%] lg:w-[45%] h-full  px-4  ${
          chatHistory.length === 0
            ? "pb-12 flex justify-center items-center"
            : "pt-6"
        }`}
      >
        {chatHistory.length === 0 ? (
          <div className=" w-fit h-12  ">
            <h1 className=" text-4xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              {" "}
              WellCome ASTUChat
            </h1>
          </div>
        ) : null}
        {chatHistory.length > 0 &&
          chatHistory.map((item, index) => {
            return (
              <div
                className=" w-[98%] h-auto  flex items-start justify-start   p-4 gap-6 dark:text-[#fff]  "
                key={index}
              >
                <div className=" flex-none w-8 h-8 rounded-full bg-slate-500"></div>
                <pre>{item}</pre>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Chattbox;
