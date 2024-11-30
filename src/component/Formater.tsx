import FormattedTexts from "./FormatedText";

interface FormattedText {
  type: string;
  text: string[];
  codeLanguage?: string;
  tableHeading?: string[];
  tableBody?: string[][];
}

interface FormattedProps {
  aiResponse: string;
}

const Formatter: React.FC<FormattedProps> = ({ aiResponse }) => {
  let codeBlock: string[] = [];
  let codeLanguage: string = "";
  let preText: string[] = [];
  let table: string = "";
  let plaintext: string[] = [];

  //--------------------------------------------------------------
  const FormateTextArray: FormattedText[] = [];

  const tableModifier = (table: string) => {
    const bodyRows: string[][] = [];

    const rows = table.split("\n").filter((row) => row.trim() !== "");

    rows.forEach((row, index) => {
      const cells = row
        .trim()
        .split("|")
        .filter((cell) => cell.trim() !== "");

      if (index === 1) {
        return
      } else {
        bodyRows.push(cells);
      }
    });

    
    const FormateText = {
      type: "table",
      text: [],
      tableBody: bodyRows,
    };
    FormateTextArray.push(FormateText);
  };

  const codeModifier = (codeBlock: string[], codeLanguage: string) => {
    const FormateText = {
      type: "code",
      text: codeBlock,
      codeLanguage: codeLanguage,
    };
    FormateTextArray.push(FormateText);
  };

  const preModifier = (preText: string[]) => {
    const FormateText = {
      type: "pre",
      text: preText,
    }; 
    FormateTextArray.push(FormateText);
  };

  const plaintextModifier = (plaintext: string[]) => {
    const FormateText = {
      type: "plaintext",
      text: plaintext,
    };
    FormateTextArray.push(FormateText);
  };
  //--------------------------------------------------------------

  if (aiResponse) {
    const AILine = aiResponse.split("\n");
    let checker: boolean = false;

    // Excretions
    const Code = new RegExp(/```(\w+)/);
    const codeOrPreText = new RegExp(/```/);
    const Table = new RegExp(/^\|/);

    for (let i = 0; i < AILine.length; i++) {
      if (checker) {
        if (!AILine[i].match(table) || AILine.length - 1 === i) {
          checker = false;
          tableModifier(table);
        }
      }

      if (AILine[i].match(Code)) {
        codeLanguage = AILine[i].substring(3);

        i++;
        codeBlock = [];
        while (!AILine[i].match(/```/)) {
          codeBlock.push(AILine[i]);
          i++;
        }
        codeModifier(codeBlock, codeLanguage);
      } else if (AILine[i].match(codeOrPreText)) {
        const codeExp = new RegExp(
          /^(#!|\/\*|\/\/|#include|<|>|public|private|protected|class|interface|enum|import|package|static|final|function| const|let|var|if|else|for|while|do|switch|case|default|def|with|try|except|finally|using namespace|int main|void main|struct|union|enum)/
        );

        i++;
        if (AILine[i].match(codeExp)) {
          codeLanguage = "";

          codeBlock = [];
          while (!AILine[i].match(/```/)) {
            codeBlock.push(AILine[i]);
            i++;
          }
          codeModifier(codeBlock, codeLanguage);
        } else {
          preText = [];
          while (!AILine[i].match(/```/)) {
            preText.push(AILine[i]);
            i++;
          }
          preModifier(plaintext);
        }
      } else if (AILine[i].match(Table)) {
        table += AILine[i] + "\n";
        checker = true;
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
        }else if (x.includes("`")) {
          x = x.replace("`", "");
          x = `<code>${x}</code>`;
          
        } else {
          x = AILine[i];  
        }
       
        console.log(x);

        if(x == ""){
          continue;
        }
      
        
        plaintext.push(x);
        plaintextModifier(plaintext);
        plaintext = [];
      }
    }
  }

  return <FormattedTexts formattedText={FormateTextArray} />;
};

export default Formatter;
