import React from "react";



interface TableProps {

  tableBody: string[][];
}

const Tables: React.FC<TableProps> = ({ tableBody, }) => {
  
  return (
    <div  className=" h-auto w-[450px]   rounded-2xl overflow-auto">
      <div className="container h-auto w-auto bg-[#fff] dark:bg-[#15182e]">
      <table className="table table-striped w-full">
        <thead>
          <tr className="bg-[#c9dbf8] dark:bg-[#1a1d38] h-12 border-b border-[#c9dbf8] dark:border-[#303248] w-full">
            {tableBody[0].map((heading, index) => (
              <th key={index} className="mr-6 text-center">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="h-12 border-b border-[#c9dbf8] last:border-none dark:border-white mx-4">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Tables;
