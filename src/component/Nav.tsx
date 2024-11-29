import { MouseEventHandler } from "react";

const Nav = (props: {
  menuBtn?: MouseEventHandler<HTMLDivElement>, isSidebarOpen?: boolean;
}) => {
  return (
    <nav className=" w-full h-16 absolute top-1 flex items-center  justify-between  pl-2 pr-6   bg-transparent ">
      <div className=" h-full flex items-center gap-12 z-20 ">
        <div
          className=" h-3/4 w-12 flex items-center justify-center rounded-full hover:bg-[#09172c] active:bg-opacity-5 "
          onClick={props.menuBtn}
        >
          <svg
            className=" dark:fill-[#b5b8c5]  "
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>
        <a className={`dark:text-[#b5b8c5] font-semibold text-xl transition-all ease-in-out ${props.isSidebarOpen ? " lg:translate-x-60" : ""} `}>ASTUChat</a>
      </div>
      <div className="flex gap-14 items-center ">
        <svg
          className=" dark:fill-[#b5b8c5]"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
        </svg>
        <div className=" w-9 h-9 rounded-full bg-slate-500"></div>
      </div>
    </nav>
  );
};

export default Nav;
