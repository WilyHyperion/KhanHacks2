  export default function UploadNotes() {
  return (
    <div className="flex flex-col">
      <style>{
      `
      
      

     
      `}</style>
      <input
        type="text"
        id="title"
        placeholder="Title"
        className="w-[40vw] h-[6vh] titleText transition-all color-[#333] font-bold text-[3vh] mb-2  p-5 border-none bg-[#FFFEEA]"
        maxlength="34"
      />
      <textarea id="notes" className="w-[40vw] h-[60vh] resize-none textBody" placeholder="Start typing here..." />
      <button className="hover:scale-105 hover:drop-shadow-sm" id="upload" onClick={() => {
       
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
