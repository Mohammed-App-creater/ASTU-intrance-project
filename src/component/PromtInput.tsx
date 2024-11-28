import React, { useRef, useEffect, useState } from "react";

interface PromptInputProps {
  getResponse: (value: string) => Promise<boolean>;
}

const PromptInput: React.FC<PromptInputProps> = ({ getResponse }) => {
  const maxHeight: number = 200;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState(0);
  //----------------------------------
  const [value, setValue] = useState(" ");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      const initialHeight = textarea.scrollHeight;
      setTextareaHeight(Math.min(initialHeight, maxHeight));

      textarea.addEventListener("input", () => {
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        setTextareaHeight(newHeight);
      });
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("input", () => {});
      }
    };
  }, [textareaRef, maxHeight]);

  //---------------- ------------------

  const sendPromtp = () => {
    getResponse(value).then((result) => {
      setIsDisabled(result);
    });
    setValue("");
    setIsDisabled(true);
  };

  return (
    <div
      className="relative h-full min-h-16 w-full flex items-center justify-evenly bg-[#ffffff] dark:bg-[#040824] shadow-all-around scroll-smooth focus:scroll-auto rounded-2xl"
      style={{ height: textareaHeight }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        name="inputPromt"
        id="textFiled"
        className="inputPromt text-[#b5b8c5] bg-transparent w-[90%] pl-6 pr-4 resize-none place-content-center scroll-smooth focus:scroll-auto focus:outline-none"
        placeholder="I'm feeling chatty! Ask me anything."
        style={{ height: textareaHeight }}
      />
      <button
        onClick={sendPromtp}
        disabled={isDisabled}
        className=" w-11 h-11 hover:bg-[#09172c] active:bg-opacity-5 rounded-full flex justify-center items-center"
      >
        <svg
          className={`${isDisabled? "dark:fill-[#606166]": "dark:fill-[#b5b8c5]"}`}
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
