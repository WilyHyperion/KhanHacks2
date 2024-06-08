import Menu from "@/components/Menu";
import StudyGuide from "@/components/StudyGuide";
import { useState, useEffect, createElement } from "react";
import Highlighter from "react-highlight-words";
import Image from "next/image";
export default function Explorenotes() {
  const [guides, setGuides] = useState([]);
  const [search, setSearch] = useState("");

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
        const updatedNotes = res.notes.map((note) => ({
          ...note,
          isOpen: false,
        }));
        setNotes(updatedNotes);
      });
  }, []);
  return (
    <div>
      <Menu></Menu>
      <div className="w-[80%] absolute left-[25%] top-[0]">
        <div className="w-[100%] flex items-center  justify-center pt-14">
          <div className="w-[50%] flex items-center justify-center">
            <input
              type="text"
              id="search"
              placeholder="Enter search..."
              className=" bg-[#EDF2D4] w-[90%] p-3 pl-10 rounded-2xl font-bold "
              onChange={() => {
                setSearch(document.getElementById("search").value);
              }}
            ></input>
            <Image
              src={"/search.svg"}
              alt="Search Icon"
              width={20}
              height={20}
              className="absolute left-[29%]"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col mx-auto w-[70%]">
          {notes &&
            notes.map((note) => {
              if (!shouldDisplay(note)) return null;
              return (
                <div>
                  <h2 className=" text-3xl text-[#868D83]">
                    <Highlighter
                      searchWords={[search]}
                      caseSensitive={false}
                      textToHighlight={note.title}
                    ></Highlighter>
                  </h2>
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
                  <button
                    onClick={() => {
                      fetch("/api/practicetest", {
                        method: "POST",
                        body: JSON.stringify({
                          username: localStorage.getItem("username"),
                          title: note.title,
                          note: note.note,
                          other: guides.map((guide) => {
                            return guide.questions.split("Answer:")[0];
                          }),
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                        .then((res) => res.json())
                        .then((res) => {
                          console.log(res);
                          console.log(guides);
                          setGuides(
                            guides.concat({
                              title: note.title,
                              note: note.note,
                              questions: res.choices[0].message.content,
                            })
                          );
                        });
                    }}
                  >
                    Create Practice Test
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
