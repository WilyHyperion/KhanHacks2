export default function UploadNotes() {
  return (
    <div className="flex flex-col">
      <style>{`
      titleText{
      background-color: #f5f5f5; 
      border: 1px solid #e0e0e0; 
      border-radius: 5px; 
      padding: 10px; 
      margin-bottom: 10px; 
      font-size: 1.5rem; 
      font-family: 'Poppins', sans-serif; 
      font-weight: 500; 
      color: #333; 
      transition: 0.3s; 
      outline: none;
      }
      `}</style>
      <input
        type="text"
        id="title"
        placeholder="Title"
        className="w-[40vw] h-[6vh] titleText"

      />
      <textarea id="notes" className="w-[40vw] h-[60vh] resize-none" />
      <button onClick={() => {
        if(localStorage.getItem("hash") === null){
            window.location.href = "/login"
            return
        }
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
            console.log(res);
          });
      }}>
        Upload
      </button>
    </div>
  );
}
