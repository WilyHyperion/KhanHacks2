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
        className="w-[40vw] h-[6vh] p-0 color-[#36413E] 
        font-bold text-[3vh] mb-2  border-none bg-[#FFFEEA]
        focus:outline-none placeholder:text-[#36413E] placeholder:opacity-50
        "
        maxlength="34"
      />
      <textarea id="notes" className="w-[40vw] h-[60vh] p-0 resize-none textBody  placeholder:text-[#36413E] placeholder:opacity-50" placeholder="Start typing here..." />
      <button className="transition-[0.1s] hover:scale-[101%] hover:drop-shadow-sm focus:scale-[97%]"  id="upload" onClick={() => {
       
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
