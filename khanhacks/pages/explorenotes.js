import Menu from "@/components/Menu";
import StudyGuide from "@/components/StudyGuide";
import { useState, useEffect, createElement } from "react";
import Highlighter from "react-highlight-words";
import Image from "next/image";
import NotePopUp from "@/components/NotePopUp";
export default function Explorenotes() {
  const [guides, setGuides] = useState([]);
  const [search, setSearch] = useState("");
  const toggleNote = (id) => {
    setNotes(notes.map(note => note.title === id ? { ...note, isOpen: !note.isOpen } : note));
  }
  function shouldDisplay(note) {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.note.toLowerCase().includes(search.toLowerCase()) ||
      search === ""
    );
  }
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("/api/getnote", {
      method: "POST",
      body: JSON.stringify({
        username: localStorage.getItem("username"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(!res.notes){
          return
        }
        const updatedNotes = res.notes.map((note) => ({
          ...note,
          isOpen: false,
        }));
        setNotes(updatedNotes);
      });
  }, []);
  const [visible, setVisible] = useState(false);
  const [curnote, setNote] = useState({title: "", note: ""});
 async function createnewQuestion(note, title){
    let b = await (await fetch("/api/practicetest", {
      method: "POST",
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        title: title,
        note: note,
        other: guides.map((guide) => {
          return guide.questions.split("Answer:")[0];
        }),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })).json();
    console.log(b.choices[0].message.content)
    return b.choices[0].message.content;
  }
  return (

    <div className="">
      <style>{`
        .searchBar {
          filter: drop-shadow(0px 0px 2px #EDF2D4);
          transition: 0.1s;
        }
        .searchBar:hover{
          filter: drop-shadow(0px 0px 5px #EDF2D4);
        }
        .searchPlaceholder:focus {
          outline: none;
        }
        .searchPlaceholder::placeholder {
          font-weight: bold;
          font-size: 1.5rem;
          color: #868D83;
        }
      `}</style>
      <NotePopUp visible = {visible}  title = {curnote.title} content = {curnote.content} setVisible = {setVisible} searchWords = {search} createnewQuestion = {createnewQuestion}>
      </NotePopUp>
      <Menu></Menu>
      <div className="w-[80%] absolute left-[28vw] top-[10vh]">
        <div className="w-[80%] flex items-center justify-center">
            <div className="searchBar bg-[#EDF2D4] w-[80%] pt-4 pb-[0.5rem] pl-[2vw] rounded-2xl font-bold inline-block align-middle">
            <Image
                src={"/search.svg"}
                alt="Search Icon"
                width={20}
                height={20}
                className="inline-block opacity-50 mt-[-10px]"
                
              ></Image>
              <input
                type="text"
                id="search"
                placeholder="Enter search..."
                className="inline-block bg-[transparent] w-[80%] font-bold text-2xl outline-none searchPlaceholder mt-[-10px] ml-2"
                onChange={() => {
                  setSearch(document.getElementById("search").value);
                }}
              ></input>
              
            </div>
          </div>
        <div className="flex flex-col mx-auto w-[80%] mt-5">
          {notes &&
            notes.map((note) => {
              if (!shouldDisplay(note)) return null;
              return (
               
                

                <div className="flex flex-row items-center" onClick= {() => {
                  setNote({title: note.title, content: note.note});
                  setVisible(true);
                }}>
                  
                  <Image className="mt-[0]pt-2" src="/bars.svg" width={30} height={30}></Image>
                  <h2 className=" ml-3 text-3xl text-[#36413E] font-semibold opacity-60">
                    <Highlighter
                      searchWords={[search]}
                      caseSensitive={false}
                      textToHighlight={note.title !== "" ? note.title : "Untitled"}
                    ></Highlighter>
                  </h2>
                  {note.isOpen && (<div >
                  <Highlighter
                    searchWords={[search]}
                    caseSensitive={false}
                    textToHighlight={note.note}
                  ></Highlighter>
                  
                  {guides.map((guide) => {
                    if (guide.title === note.title) {
                      return (
                        <StudyGuide
                          props={{
                            title: note.title,
                            note: note.note,
                            output: guide.questions,
                          }}
                        />
                      );
                    }
                  })}
                  
                  </div>)}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
