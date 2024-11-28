import Chattbox from "./Chattbox";
import Nav from "./Nav";
import PromtInput from "./PromtInput";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

interface ChatMessage {
  role: string;
  parts: Part[];
}
interface Part {
  text?: string;
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userMassage , setUserMassage] = useState<string>("")
  const [aiRespons , setAiRespons] = useState<string>("")
 
 

  const getResponse: (value: string) => Promise<boolean> = async (value) => {
    console.log(value);
    setUserMassage(value)
    
    if (value.trim() === "") {
      return false; 
    }
    try {
      const option = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          massage: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", option);
      const data = await response.text();
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "user",
          parts: [{ text: value }],
        },
        {
          role: "model",
          parts: [{ text: data }],
        },
      ]
    );

    } catch (error) {
      setChatHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1] = {
          role: "model",
          parts: [{ text: "Error fetching response" }],
        };
        return newHistory;
      });
      console.error("Error fetching response:", error);
    }
    return false; 
  };

  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1]?.parts[0]?.text;
    if (lastMessage) {
      setAiRespons(lastMessage);
    }
  }, [chatHistory]);

  console.log(chatHistory);

  

  return (
    <div className=" w-full h-screen bg-white dark:bg-[#050615] flex items-center justify-center ">
      <Nav menuBtn={toggleSidebar} />
      <aside className=" absolute left-0 top-0 ">
        <SideBar isOpen={isSidebarOpen} />
      </aside>
      <Chattbox userMassage={userMassage} aiRespons={aiRespons} />
      <div className=" absolute w-[85%] lg:w-[50%]  bottom-12  lg:left-1/2 lg:-translate-x-1/2 ">
        <PromtInput getResponse={getResponse} />
      </div>
    </div>
  );
}

export default App;

 // chatHistory.map((item, index) => {
  //   console.log(item.parts[0].text, "from the APP (key:", index, ")");
  // });