import { useState, useEffect } from "react";

export default function Menu() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("hash")) {
      window.location.href = "/login";
    }
    setUsername(localStorage.getItem("username"));
  }, []);
  return (
    <>
      <style>{`
      .listitem{
        transition: 0.2s ease-out;
        opacity:0.5;
        highlight:none;
        cursor:pointer;
      }
      .listitem:hover{
        opacity:0.8;
        filter:drop-shadow(0px 1px 1px #36413E61);
      }
      .listitem:active{
        opacity:1;
        filter:drop-shadow(0px 0px 1px #36413E61);
      }
      .listSVG{
        display:inline-block;
        width:1.5vw;
        height:1.5vw;
        margin-right:3px;
        cursor:pointer;
      }

      `}</style>
      <div className="relative block top-[15vh] left-[5vw] z-[4] max-w-[30%]">
        <div className="font-black text-6xl">Welcome</div>
        {username && <div className="font-extralight text-4xl">{username}</div>}
        <div className="font-extralight text-4xl"></div>
        <div className="font-semibold text-2xl grid grid-cols-[20vw] grid-rows-[repeat(4,2xl)] text-[#36413E]">
          <div className="listitem">
              <img src="/search.svg" alt="Search Icon" className="listSVG" />
              <a href = "/explorenotes">
              Explore your notes
            </a>
          </div>
          <div className="listitem">
            <a href = "/create">
            <img src="/pencil.svg" alt="Pencil" className="listSVG" />
            Create a note
            </a>
          </div>
          <div className="listitem">
            <a href = "/upload">
            <img src="/upload.svg" alt="Upload" className="listSVG" />
            Upload a note
            </a>
          </div>
          <div className="listitem">
            <a href = "/scan">
            <img src="/camera.svg" alt="Camera" className="listSVG" />
            Scan a note
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
