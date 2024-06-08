import Image from "next/image";
import { Inter } from "next/font/google";
import UploadNotes from "../components/UploadNotes";
import React, { useEffect } from "react";
import Webcam from "react-webcam";
import ViewNotes from "@/components/ViewNotes";
import Menu from "@/components/Menu";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
    mirrored: false,
  };
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const capture = React.useCallback(
    (t) => {
      console.log(t);
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
      switch (t) {
        case 1:
          fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ data: imageSrc }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
            });
          break;
        case 2:
          fetch("/api/imagetotext", {
            method: "POST",
            body: JSON.stringify({ data: imageSrc }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
            });
          break;
      }
      setImgSrc(imageSrc);
    },
    [webcamRef, setImgSrc]
  );
  return (
    <>
    <Menu></Menu>
      <div className="w-full h-full absolute left-0 top-0 text-center ">
        <a href="/login">Login</a>
        <input type="file"  onChange={
          (e) => {
            console.log(e.target.files[0]);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
              console.log(e.target.result);
              fetch("/api/imagetotext", {
                method: "POST",
                body: JSON.stringify({ data: e.target.result }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((res) => {
                  console.log(res);
                });
            };
            reader.readAsDataURL(file);m
          }
        
        }/>
        {/* <Webcam ref={webcamRef} videoConstraints={videoConstraints} /> */}
        <button
          onClick={() => {
            capture(1);
          }}
        >
          Capture
        </button>
        <button
          onClick={() => {
            capture(2);
          }}
        >
          textocr
        </button>
        {imgSrc && <img src={imgSrc} alt="captured image" />}
        <div className="relative left-[50vw]">
        <UploadNotes>

        </UploadNotes>
        </div>
        <div className="absolute left-[60%] bottom-[30%] text-xs ">
        <ViewNotes>

        </ViewNotes>
        </div>
      </div>
      </>
    
  );
}
