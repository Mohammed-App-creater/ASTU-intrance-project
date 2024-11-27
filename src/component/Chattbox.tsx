interface ChatMessage {
  role: string;
  parts: Part[];
}

interface Part {
  text?: string;
  image?: {
    url: string;
  };
}

interface ChattboxProps {
  chatHistory: ChatMessage[];
}

function Chattbox(props: ChattboxProps) {
  const { chatHistory } = props;
  console.log(chatHistory);
  return (
    <div className=" w-[80%] lg:w-[45%] h-[87%] ">
      <div className=" w-full h-full bg-slate-400 px-4 pt-6">
        <div className=" USER w-[98%] h-auto bg-slate-800 flex items-start justify-between p-4 gap-6 dark:text-[#b5b8c5]">
          <div className=" flex-none w-9 h-9 rounded-full bg-slate-500"></div>
          <p>
          </p>
        </div>
        <div className=" ASTU w-[98%] h-auto bg-slate-800 flex items-start justify-between p-4 gap-6 dark:text-[#b5b8c5]">
          <div className=" flex-none w-9 h-9 rounded-full bg-slate-500"></div>
          <p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chattbox;
