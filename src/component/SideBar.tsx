type Props = {
  isOpen: boolean;
};

const SideBar: React.FC<Props> = (props) => {
  return (
    <section
      className={`h-screen w-[85%]   absolute top-0 left-0   flex flex-col justify-end gap-3   bg-[#ffffff]   dark:bg-[#040824] rounded-r-2xl lg:rounded-none z-10  ${
        props.isOpen
          ? " max-lg:translate-x-0   transition-all duration-300   pb-32 lg:w-[23.5%] xl:w-[18.5%]  "
          : " max-lg:-translate-x-full  transition-all duration-300  lg:w-[4.6rem] pb-16"
      }`}
    >
      <div className={` h-12 flex items-center gap-4 ${ props.isOpen? "hover:bg-[#09172c]  active:bg-opacity-5 rounded-xl pl-6 " : "pl-3"}`}>
        <div className=" h-full w-12 flex items-center justify-center  rounded-full active:bg-opacity-5 hover:bg-[#09172c]  ">
          <svg
            className=" dark:fill-[#b5b8c5]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </div>
        <p
          className={` dark:text-[#b5b8c5] ${
            props.isOpen
              ? "transition-all duration-300 ease-in-out"
              : " transition-all duration-300 ease-in-out  hidden"
          }`}
        >
          New Chat
        </p>
      </div>
      <div className={` h-12 flex items-center gap-4 ${ props.isOpen? "hover:bg-[#09172c]  active:bg-opacity-5 rounded-xl pl-6 " : "pl-3"}`}>
        <div className=" h-full w-12 flex items-center justify-center  rounded-full active:bg-opacity-5 hover:bg-[#09172c]  ">
          <svg
            className=" dark:fill-[#b5b8c5]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </div>
        <p
          className={` dark:text-[#b5b8c5] ${
            props.isOpen
              ? "transition-all duration-300 ease-in-out"
              : "transition-all duration-300 ease-in-out hidden "
          }`}
        >
          How to use
        </p>
      </div>
    <div className={` h-12 flex items-center gap-4 ${ props.isOpen? "hover:bg-[#09172c]  active:bg-opacity-5 rounded-xl pl-6 " : "pl-3"} `}>
        <div className=" h-full w-12 flex items-center justify-center  rounded-full active:bg-opacity-5 hover:bg-[#09172c]  ">
          <svg
            className=" dark:fill-[#b5b8c5]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
          </svg>
        </div>
        <p
          className={` dark:text-[#b5b8c5] ${
            props.isOpen
              ? "transition-all duration-300 ease-in-out"
              : "transition-all duration-300 ease-in-out hidden"
          }`}
        >
          {" "}
          History
        </p>
      </div>
      <div
        className={`flex items-center h-12 gap-4 ${ props.isOpen? "hover:bg-[#09172c]  active:bg-opacity-5 rounded-xl pl-6 " : "pl-3"} `}
      >
        <div className=" h-full w-12 flex items-center justify-center  rounded-full active:bg-opacity-5 hover:bg-[#09172c]  ">
          <svg
            className=" dark:fill-[#b5b8c5]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </svg>
        </div>
        <p
          className={` dark:text-[#b5b8c5] ${
            props.isOpen
              ? "transition-all duration-300 ease-in-out"
              : "transition-all duration-300 ease-in-out hidden"
          }`}
        >
          Settings
        </p>
      </div>
    </section>
  );
};

export default SideBar;
