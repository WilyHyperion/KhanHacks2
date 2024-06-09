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
    

    <Menu page = {0} />
    {/* align content to the right side of the page */}
    
    
    </>
    
  );
}
