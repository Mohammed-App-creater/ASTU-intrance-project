import { useState, useEffect, useRef } from "react";
import Formatter from "./Formater";



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
        className={`  w-full lg:w-[45%] h-full  lg:px-4  ${
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
                className=" w-[98%] h-auto  flex flex-col items-start justify-start   p-4 gap-6 dark:text-[#fff]  "
                key={index}
              >
                <div className=" flex-none w-8 h-8 rounded-full bg-slate-500"></div>
                {index % 2 === 0 ? (
                  <pre className=" w-full max-w-[90%] text-wrap text-[1.1rem] pl-1 ">{item}</pre>
                ) : (
                  <Formatter aiResponse={item} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Chattbox;
