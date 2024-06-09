import Highlighter from "react-highlight-words";
import { useState } from "react";
import StudyGuide from "./StudyGuide";
export default function NotePopUp(props) { 
    
    const [summary, setSummary] = useState(""); 
    const [questions, setQuestions] = useState([]);
    let visible = props.visible;
    if(!visible) return (<></>);
    let title = props.title;
    let content = props.content;
    return (
        
    <div className="absolute w-[100vw] h-[100vh] bg-[#0000009c] z-10">
        <style>{`
        pre::{
            
        }
        `}</style>
        <div className="w-[80vw] h-[80vh] absolute left-[10vw] top-[10vh]   z-20 bg-[#EDF2D4] rounded-3xl drop-shadow-[0_0_20px_#EDF2D49c] " >
            <button className="w-[50px] h-[50px] absolute right-0 top-0" onClick={() => {
                setQuestions([]);
                setSummary("");
                props.setVisible(false);

            }}>X</button>
            <h1 className="text-4xl w-full text-center pt-5 font-black  text-[#36413E]">{title}</h1>
            <div className="w-[70%] h-[90%] mx-auto text-xl text-[#36413E] overflow-y-scroll   ">
            <pre className=" whitespace-pre-wrap mt-10">
            <Highlighter  searchWords={[props.searchWords]} textToHighlight={content}></Highlighter>
            </pre>
            <hr className=" border-black my-5 "></hr>
            {questions.map((question) =>  {
                return <div className="text-md">  
                {question.split("Answer:")[0]}
                <span style={{
                            color: "gray",
                            marginLeft: "10px",
                            background: "gray",
                            cursor: "pointer"
                        }} onClick={(e) => {
                            e.target.style.background = e.target.style.background === "gray" ? "white" : "gray";
                        }}><br/>{question.split("Answer:")[1]}</span>
                </div>
            })}
            <button className="w-[100%] h-[8vh] bg-[#36413E] text-[#EDF2D4] font-semibold rounded-[21px] mt-5" onClick={async () => {
                let newq = await props.createnewQuestion(content, title, questions);
                console.log(questions);
                setQuestions([...questions, newq]);
            }}>Add Study Question</button>
            <hr className=" border-black my-5 "></hr>
            {summary}
             <button className="w-[100%] h-[8vh] bg-[#36413E] text-[#EDF2D4] font-semibold rounded-[21px] mt-5" onClick={async () => {
                let s = await ( await fetch("/api/createSummary", { 
                    method: "POST",
                    body: JSON.stringify({
                        content: content,
                        title: title,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })).json();
                console.log(s);
                setSummary(s.choices[0].message.content)
            }}>Create Summary</button>  

            </div>
        </div>
    </div>)
}