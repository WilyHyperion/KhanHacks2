export default function UploadNotes() {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        id="title"
        placeholder="Title"
        className="w-[200px] h-[30px]"
      />
      <textarea id="notes" className="w-[200px] h-[200px]" />
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
