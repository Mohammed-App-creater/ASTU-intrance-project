import FormattedTexts from "./FormatedText";
import formatText from "./formatText";

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
        return;
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
    const codeBlockRegex = /^```(\w+)/;
    const codeOrPreText = /```/;
    const Table = /^\|/;

    for (let i = 0; i < AILine.length; i++) {
      if (checker) {
        if (!Table.test(AILine[i]) || AILine.length - 1 === i) {
          checker = false;
          tableModifier(table);
        }
      }

      if (AILine[i].match(codeBlockRegex)) {
        codeLanguage = AILine[i].substring(3);

        i++;
        codeBlock = [];
        while (!/```/.test(AILine[i]))  {
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
          while (!/```/.test(AILine[i]))  {
            codeBlock.push(AILine[i]);
            i++;
          }
          codeModifier(codeBlock, codeLanguage);
        } else {
          preText = [];
          while (!/```/.test(AILine[i])) {
            preText.push(AILine[i]);
            i++;
          }
          preModifier(preText);
        }
      } else if (AILine[i].match(Table)) {
        table += AILine[i] + "\n";
        checker = true;
      } else {
        const x: string = formatText(AILine[i]);
        plaintext.push(x);
        plaintextModifier(plaintext);
        plaintext = [];
      }
    }
  }

  return <FormattedTexts formattedText={FormateTextArray} />;
};

export default Formatter;
