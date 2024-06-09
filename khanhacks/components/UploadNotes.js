  export default function UploadNotes() {
  return (
    <div className="flex flex-col">
      <style>{
      `
      .titleText{
        background-color: #FFFEEA; 
        border: none;
        // border-bottom: 2px solid #28312E; 
        border-radius: 0px; 
        padding: 10px; 
        margin-bottom: 10px; 
        font-size: 3vh; 
        font-family: 'Inter', sans-serif; 
        font-weight: 800; 
        color: #333; 
        transition: 0.1s; 
        outline: none;
        word-wrap: break-word;
        word-break: break-all;
      }
      .titleText::placeholder{
        color: #28312E; 
        opacity: 0.5;
      }
      
     

      .textBody{
        background-color: #FFFEEA; 
        border: none; 
        border-radius: 0px; 
        padding: 10px; 
        margin-bottom: 10px; 
        font-size: 2vh; 
        font-family: 'Inter', sans-serif; 
        font-weight: 400; 
        color: #333; 
        transition: 0.1s; 
        outline: none;
      }
      .textBody::placeholder{
        color: #28312E; 
        opacity: 0.5;
      }

      #upload{
        background-color: #EDF2D4; 
        border: none; 
        border-radius: 0px; 
        padding: 10px; 
        font-size: 2vh; 
        font-family: 'Inter', sans-serif; 
        font-weight: 800; 
        color: #28312E; 
        transition: 0.1s; 
        cursor: pointer;
        border-radius: 10px;
      }

      #upload:hover{
        filter:drop-shadow(0px 0px 5px #EDF2D4);
      }

      #upload:active{
        transform: scaleY(0.95);
      }

      `}</style>
      <input
        type="text"
        id="title"
        placeholder="Title"
        className="w-[40vw] h-[6vh] titleText"
        maxlength="34"
      />
      <textarea id="notes" className="w-[40vw] h-[60vh] resize-none textBody" placeholder="Start typing here..." />
      <button id="upload" onClick={() => {
       
        fetch("/api/addnotes", {
          method: "POST",
          body: JSON.stringify({
            hash: localStorage.getItem("hash"),
            username: localStorage.getItem("username"),
            title: document.getElementById("title").value,
            note: document.getElementById("notes").value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            window.location.href = "/explorenotes"
          });
      }}>
        Upload
      </button>
    </div>
  );
}
