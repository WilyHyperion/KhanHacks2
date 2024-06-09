import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Menu from '@/components/Menu'; // Adjust the import path as per your project structure

export default function Scan() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [title, setTitle] = useState(''); // State to hold the title text

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const retakePhoto = () => {
    setCapturedImage(null); // Reset captured image to null to show webcam again
  };

  return (
    <>
      <Menu />

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '125px', marginTop: '-200px' }}>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          {/* Editable title box */}
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 mb-2 text-gray-800 rounded-lg focus:outline-none bg-transparent text-3xl"
          />

          {capturedImage ? (
            <div style={{ margin: '20px 0' }}>
              {/* Show captured image */}
              <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
              <button onClick={retakePhoto} style={{ marginTop: '10px' }}>
                Retake Photo
              </button>
            </div>
          ) : (
            <div style={{ margin: '20px 0' }}>
              {/* Show webcam */}
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                height="auto"
              />
              {/* Combined Button with Icon and Text */}
              <button onClick={capture} style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', padding: '0px 4px' }}>
                <img
                  src="/camera.svg"
                  alt="Camera Icon"
                  className="w-9 h-9 ml-2 mt-2"
                />
                <span style={{ marginLeft: '8px', color: '#342A21', fontSize: '30px' }}>Capture Image</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
