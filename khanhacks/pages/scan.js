import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Menu from '@/components/Menu'; // Adjust the import path as per your project structure

export default function Scan() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [title, setTitle] = useState(''); // State to hold the title text

  const capture = (callback) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const retakePhoto = () => {
    setCapturedImage(null); // Reset captured image to null to show webcam again
  };

  return (
    <>
      <Menu page = {4} />

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

          <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
            {capturedImage ? (
              <>
                {/* Show captured image */}
                <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', position: 'relative' }}>
                  <button 
                    onClick={retakePhoto} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '10px 20px',
                      backgroundColor: '#EDF2D4',
                      border: '0px solid #ccc',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      marginRight: '10px',
                      className: "hover:scale-105 hover:drop-shadow-sm"
                    }}
                  >
                    <img
                      src="/refresh.svg" // Ensure you have an appropriate retake icon, or you can reuse the camera icon
                      alt="Retake Icon"
                      className="w-9 h-9"
                    />
                    <span style={{ marginLeft: '8px', color: '#342A21', fontSize: '20px' }}>Retake Photo</span>
                  </button>
                  <button 
                    onClick={() => 
                        fetch('/api/imagetotext', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            data: capturedImage,
                          }),
                        }).then((res) => {
                          return res.json();
                        }).then((data) => {
                          fetch('/api/addnotes', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              hash: localStorage.getItem('hash'),
                              username: localStorage.getItem('username'),
                              note: data.text,
                              title: title,
                            }),
                          }).then(() => {
                            window.location.href = '/explorenotes';
                          });
                        })
                    }
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '10px 20px',
                      backgroundColor: '#EDF2D4',
                      border: '0px solid #ccc',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      className: "hover:scale-105 hover:drop-shadow-sm"
                    }}
                  >
                    <img
                      src="/upload.svg" // Ensure you have an appropriate submit icon
                      alt="Submit Icon"
                      className="w-9 h-9"
                    />
                    <span style={{ marginLeft: '8px', color: '#342A21', fontSize: '20px' }}>Submit</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Show webcam */}
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                  height="auto"
                />
                {/* Combined Button with Icon and Text */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', position: 'relative' }}>
                  <button 
                    onClick={capture} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '10px 20px',
                      backgroundColor: '#EDF2D4',
                      border: '0px solid #ccc',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      className: "hover:scale-105 hover:drop-shadow-sm"
                    }}
                  >
                    <img
                      src="/camera.svg"
                      alt="Camera Icon"
                      className="w-9 h-9"
                    />
                    <span style={{ marginLeft: '8px', color: '#342A21', fontSize: '20px' }}>Capture Image</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
