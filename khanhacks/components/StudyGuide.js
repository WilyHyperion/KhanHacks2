

export default function StudyGuide(props) {
    console.log(props.props);
    
    return (
        <div>
            <h1>Study Guide</h1>
                  {props.props.output.split("Answer:")[0]}
                    <span style={{
                        color: "gray",
                        marginLeft: "10px",
                        background: "gray",
                        cursor: "pointer"
                    }} onClick={(e) => {
                        e.target.style.background = e.target.style.background === "gray" ? "white" : "gray";
                    }}>{props.props.output.split('Answer:')[1]}</span>
                   
        </div>
    );
}