import React from "react";

interface TableBody {
  row: string[];
}

interface TableProps {
  tableHeading: string[];
  tableBody: TableBody[];
}

const Table: React.FC<TableProps> = ({ tableBody, tableHeading }) => {
  return (
    <div className=" h-auto w-[450px]   rounded-2xl overflow-auto">
      <div className="container h-auto w-auto bg-[#fff] dark:bg-[#15182e] ">
        <table className="table table-striped w-full   ">
          <thead className="  bg-[#c9dbf8] dark:bg-[#1a1d38] h-12  ">
            <tr className=" border-b  border-[#c9dbf8] dark:border-[#303248]  w-full ">
              {tableHeading.map((heading, index) => {
                return <th key={index} className=" mr-6 text-center">{heading}</th>;
              })}
            </tr>
          </thead>
          <tbody className="  p-12 h-12">
            {tableBody.map((row, rowIndex) => (
              <tr key={rowIndex} className=" h-12 border-b border-[#c9dbf8] dark:border-[#252738]   mx-4">
                {row.row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="  text-center">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
