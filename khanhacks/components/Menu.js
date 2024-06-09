import { useState, useEffect } from "react";

export default function Menu(props) {
  let page = props.page;
  console.log(page);
  const [username, setUsername] = useState("");
  const [logged, setlogged]= useState(false);

  useEffect(() => {
    setlogged(localStorage.getItem("hash") ? true : false);
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
      }
      .listitem:active{
        opacity:1;
      }
      .selectedList{
        transition: 0.2s ease-out;
        highlight:none;
        cursor:pointer;
        opacity:1;

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
        <div className={` text-2xl grid grid-cols-[20vw] grid-rows-[repeat(4,2xl)] text-[#36413E] ` + page ==1 ? ' font-extrabold' :   '' }>
          <div className={page == 1 ? "selectedList font-extrabold opacity-100 " : "listitem"}>
              <img src="/search.svg" alt="Search Icon" className="listSVG" />
              <a href = "/explorenotes" >
              Explore your notes
            </a>
          </div>
          <div className={page == 2 ? "selectedList font-extrabold opacity-100 " : "listitem"}>
            <a href = "/create">
            <img src="/pencil.svg" alt="Pencil" className="listSVG" />
            Create a note
            </a>
          </div>
          <div className={page == 3 ? "selectedList font-extrabold opacity-100" : "listitem"}>
            <a href = "/upload">
            <img src="/upload.svg" alt="Upload" className="listSVG" />
            Upload a note
            </a>
          </div>
          <div className={page == 4 ? " selectedList font-extrabold opacity-100" : "listitem"}>
            <a href = "/scan">
            <img src="/camera.svg" alt="Camera" className="listSVG" />
            Scan a note
            </a>
          </div>
          <div className="listitem">
           {logged && <a href = "/logout">
            <img src="/person.svg" alt="Camera" className="listSVG" />
            Logout
            </a> } {!logged && <a href = "/logout">
            <img src="/person.svg" alt="Camera" className="listSVG" />
            Login
            </a> }
          </div> 
        </div>
      </div>
    </>
  );
}
