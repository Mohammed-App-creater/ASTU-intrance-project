import { useState, useEffect, useRef } from "react";
//import Table from "./Table";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
  //const [copy, setCopy] = useState(false);
  

  const codeBlock: string[] = [];
  const preText: string[] = [];
  let table: string = "";
  const plaintext: string[] = [];




  


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


  if (aiResponse) {
    const AILine = aiResponse.split("\n");
    let checker: boolean = false;
    

    

    // Excretions
    const Code = new RegExp(/```(\w+)/);
    const codeorPreText = new RegExp(/```/);
    const Table = new RegExp(/^\|/);

    for (let i = 0; i < AILine.length; i++) {

      if(checker){
        console.log("in checker");
        console.log(AILine[i]);
        
        if (!AILine[i].match(table) || AILine.length - 1 === i ){
            checker = false;
            tableModifrer(table);
            table = ""
            console.log("close cheker");
        } 
      }


      if (AILine[i].match(Code)) {
        const language: string = AILine[i].substring(3);
        console.log(language);

        i++;
        while (!AILine[i].match(/```/)) {
          codeBlock.push(AILine[i]);
          i++;
        }
        //code to add the all the next line to the code block until the next ```
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
        }
      } else if (AILine[i].match(Table)) {
        table += AILine[i] + "\n";
        checker = true;
        console.log("in table");
        
      } else {
          plaintext.push(AILine[i]);
      }
    }
    
  }

  useEffect(() => {
    if (userMassage && userMassage !== prevUserMessageRef.current) {
      setChatHistory((prevHistory) => [...prevHistory, userMassage]);
      prevUserMessageRef.current = userMassage;
    } else if (aiResponse) {
      setChatHistory((prevHistory) => [...prevHistory, aiResponse]);
    }
  }, [userMassage, aiResponse]);

  // const copied = () => {
  //   setCopy(true);
  //   //navigator.clipboard.writeText(copyString);
  //   setTimeout(() => {
  //     setCopy(false);
  //   }, 1000);

  // };

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
