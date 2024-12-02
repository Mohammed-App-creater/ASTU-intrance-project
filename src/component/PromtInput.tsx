import React, { useRef, useEffect, useState } from "react";

interface PromptInputProps {
  getResponse: (value: string) => Promise<boolean>;
  isSidebarOpen: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ getResponse, isSidebarOpen, }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleKeyDown = (event: {
    shiftKey: boolean;
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "Enter" && event.shiftKey) {
      setValue(value + "\n");
      event.preventDefault();
    } else if (event.key === "Enter") {
      event.preventDefault();
      sendPromtp();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const resizeTextarea = () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      };

      textarea.addEventListener("input", resizeTextarea);

      return () => {
        textarea.removeEventListener("input", resizeTextarea);
      };
    }
  }, [textareaRef]);

  const sendPromtp = () => {
    getResponse(value).then((result) => {
      setIsDisabled(!result);
    });
    setValue("");
    setIsDisabled(true);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "54px";
    }
  };
  
  //---------------- ------------------

  return (
    <div
      className={`relative h-full min-h-16 w-full flex items-end justify-evenly pb-1 bg-[#ffffff] dark:bg-[#040824] shadow-all-around  rounded-2xl transition-all ease-linear ${
        isSidebarOpen ? " lg:translate-x-48" : ""
      }`}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        name="inputPromt"
        id="textFiled"
        className="inputPromt text-[#b5b8c5] bg-transparent w-[90%] max-h-[200px] min-h-[54px]  pl-6 pr-4 resize-none place-content-center scroll-smooth focus:scroll-auto focus:outline-none"
        placeholder="I'm feeling chatty! Ask me anything."
      />
      <button
        onClick={sendPromtp}
        disabled={isDisabled}
        className=" w-11 h-11 hover:bg-[#09172c] active:bg-opacity-5 rounded-full flex justify-center items-center mb-1"
      >
        <svg
          className={`${
            isDisabled ? "dark:fill-[#606166]" : "dark:fill-[#b5b8c5]"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        </svg>
      </button>
    </div>
  );
};

export default PromptInput;
