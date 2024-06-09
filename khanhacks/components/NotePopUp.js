import Highlighter from "react-highlight-words";
import { useState } from "react";
import StudyGuide from "./StudyGuide";
export default function NotePopUp(props) {  
    const [questions, setQuestions] = useState([]);
    let visible = props.visible;
    if(!visible) return (<></>);
    let title = props.title;
    let content = props.content;
    
    return (<div className="w-[99vw] h-[99vh] absolute left-[0.5vw] top-[0.5vh]   z-20 bg-[#EDF2D4] rounded-3xl">
        <button className="w-[50px] h-[50px] absolute right-0 top-0" onClick={() => {
            setQuestions([]);
            props.setVisible(false);

        }}>X</button>
        <h1 className="text-4xl w-full text-center pt-5  text-[#36413E]">{title}</h1>
        <div className="w-[70%] h-[90%] mx-auto text-xl text-[#36413E] overflow-y-scroll">
        <Highlighter  searchWords={[props.searchWords]} textToHighlight={content}></Highlighter>
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
        <button className="w-[100%] h-[15%] bg-[#36413E] text-white rounded-xl mt-5" onClick={async () => {
            let newq = await props.createnewQuestion(content, title, questions);
            console.log(questions);
            setQuestions([...questions, newq]);
        }}>Add Study Question</button>

        </div>
    </div>)
}