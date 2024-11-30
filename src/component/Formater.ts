


const tableModifrer = (table: string) => {
    const headerRow: string[] = [];
    const bodyRows: string[][] = [];

    const rows = table.split("\n").filter((row) => row.trim() !== "");

    rows.forEach((row, index) => {
      const cells = row
        .trim()
        .split("|")
        .filter((cell) => cell.trim() !== "");

      if (index === 0) {    
        headerRow.push(...cells);
      } else {
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

  export default fortter;