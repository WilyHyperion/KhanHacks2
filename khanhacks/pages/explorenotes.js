
import { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
export default function Explorenotes() {
    const [search , setSearch] = useState("");
    function shouldDisplay(note) {
        console.log('test' + search + 'test');
        return note.title.toLowerCase().includes(search.toLowerCase()) || note.note.toLowerCase().includes(search.toLowerCase()) || search === "";
    }
    const [notes, setNotes] = useState([]);
    console.log(notes);
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
                console.log(res);
                setNotes(res.notes);
            });
    }, []);
    return (
        <div>
            <h1 className=" text-3xl">Explore Notes</h1>
            <input type="text" id="search" placeholder="Search" className="w-[200px] h-[30px]" onChange = {
                () => {
                    setSearch(document.getElementById("search").value);
                }
            }/>
            <div className="flex flex-col mx-auto w-[70%]   ">
            {notes && notes.map((note) => {
                if(!shouldDisplay(note)) return null;
                return <div>
                    <h2 className=" text-3xl">
                    <Highlighter 
                    searchWords  = {
                        [search]
                    } 
                    caseSensitive = {false}
                    textToHighlight={note.title} >
                    </Highlighter>
                    </h2>  
                    <Highlighter searchWords  = {
                        [search]
                    } 
                    
                    caseSensitive = {false}
                    textToHighlight= {note.note}
                    >
                    </Highlighter>
                    <button onClick = {
                        () => {
                            fetch("/api/practicetest", {
                                method: "POST",
                                body: JSON.stringify({
                                    username: localStorage.getItem("username"),
                                    title: note.title,
                                    note: note.note,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                                .then((res) => res.json())
                                .then((res) => {
                                    console.log(res);
                                });
                        }
                    }>Create Practice Test</button>
                </div>
            }
            )}
            </div>
        </div>
    );
}