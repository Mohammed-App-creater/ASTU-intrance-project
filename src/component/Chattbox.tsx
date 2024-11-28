import { useState, useEffect } from "react";

interface ChattboxProps {
  userMassage?: string;
  aiRespons?: string;
}

function Chattbox(props: ChattboxProps) {
  const userMassage = props.userMassage;
  const aiRespons = props.aiRespons;
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  

  useEffect(() => {
    if (userMassage) {
      setChatHistory((prevHistory) => [...prevHistory, userMassage]);
    }
    if (aiRespons) {
      setChatHistory((prevHistory) => [...prevHistory, aiRespons]);
    }
  }, [userMassage, aiRespons]);

  

  console.log(userMassage, "chattbox");
  return (
    <div className=" w-[80%] lg:w-[45%] h-[87%] ">
      <div className=" w-full h-full bg-slate-400 px-4 pt-6 overflow-scroll">
        {chatHistory.length > 0 &&
          chatHistory.map((item, index) => {
            return (
              <div
                className=" USER w-[98%] h-auto bg-slate-800 flex items-start justify-between p-4 gap-6 dark:text-[#b5b8c5]"
                key={index}
              >
                <div className=" flex-none w-9 h-9 rounded-full bg-slate-500"></div>
                <p>{item}</p>
              </div>
            );
          })}
          
      </div>
    </div>
  );
}

export default Chattbox;
