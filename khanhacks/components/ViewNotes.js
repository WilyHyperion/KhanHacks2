import React, { useState, useEffect } from "react"; 

export default function ViewNotes() {
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
            <h1>View Notes</h1>
            <div className="flex flex-col ">
            {notes && notes.map((note) => (
                <div>
                    <h2>{note.title}</h2>
                    <p>{note.note}</p>
                </div>
                
            ))}
            </div>
        </div>
    )
}