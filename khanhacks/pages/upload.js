import Menu from "@/components/Menu";
import { useState } from "react";

export default function Upload() {
  const [title, setTitle] = useState("");

  const submitFiles = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      var file = e.target.files[0];
      if (title == "") {
        setTitle(file.name.split(".")[0]);
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        fetch("/api/imagetotext", {
          method: "POST",
          body: JSON.stringify({ data: reader.result }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            fetch("/api/addnotes", {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                hash: localStorage.getItem("hash"),
                username: localStorage.getItem("username"),
                note: res.text,
                title: title,
              }),
            }).then((res) => (window.location.href = "/explorenotes"));
          });
      };
    };

    input.click();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <style>{`
                .submit-button {
                    filter: drop-shadow(0px 4px 6px rgba(237, 242, 212, 1)); 
                    color: #36413E;
                }
                .title-input {
                    font-size: 1.5rem;
                    color: #FFFEEA;
                }
            `}</style>
      <Menu page = {3} />
      <div className="flex justify-end mr-[10lh]">
        <div className="flex justify-start flex-col .title-input">
          {" "}
          {/* Flex column for aligning items vertically */}
          {/* Title input box */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title..."
            className="p-2 mb-2  text-gray-800 rounded-lg focus:outline-none  bg-transparent text-3xl" // Tailwind CSS classes for styling
          />
          <div className="flex items-center submit-button">
            <button
              className="text-3xl flex items-center"
              onClick={submitFiles}
            >
              Upload Notes Files (.jpg, .pdf, .png)
              <img
                src="/upload.svg"
                alt="Upload Icon"
                className="w-9 h-9 ml-2 mt-2"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
