import Chattbox from "./Chattbox";
import Nav from "./Nav";
import PromtInput from "./PromtInput";
import SideBar from "./SideBar";
import { useState } from "react";

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
  const handleChatHistory = (newChatHistory: ChatMessage[]) => {
    setChatHistory((prevHistory) => [...prevHistory, ...newChatHistory]);
};

  return (
    <div className=" w-full h-screen bg-white dark:bg-[#050615] flex items-center justify-center ">
      <Nav menuBtn={toggleSidebar} />
      <aside className=" absolute left-0 top-0 ">
        <SideBar isOpen={isSidebarOpen} />
      </aside>
      <Chattbox chatHistory={chatHistory} />
      <div className=" absolute w-[85%] lg:w-[50%]  bottom-12  lg:left-1/2 lg:-translate-x-1/2 ">
        <PromtInput onChatHistory={handleChatHistory} />
      </div>
    </div>
  );
}

export default App;
