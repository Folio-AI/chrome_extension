
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
// import Image from 'next/image'
// import LogoImg from '../public/icons/folio_ai_logo_transparent_bg.png'

type PopupProps = {
  stylesheetUrl?: string;
};

const Popup: React.FC<PopupProps> = ({ stylesheetUrl }) => {
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility

  // Function to toggle visibility
  const togglePopupVisibility = () => {
    setIsVisible(!isVisible);

    console.log('togglePopupVisibility', isVisible);

    // Send message to content script
    window.parent.postMessage({ action: "TOGGLE_IFRAME", state: !isVisible }, "*");
  };

  const IFrameContent = () => {
    return (
      <>
      {stylesheetUrl && <link rel="stylesheet" href={stylesheetUrl} />}
      <div
        id="sidebar"
        className={`main-popup p-4 shadow-2xl bg-white h-screen fixed top-0 right-0 w-full transition-transform duration-500 z-[1000000000000] ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >

      <h1 className="text-3xl font-extrabold leading-tighter tracking-tighter mb-2 "> 
        {/* <img className="w-20 h-20" src="icons/folio_ai_logo_transparent_bg.png" alt="Folio AI Logo" /> */}
        {/* <Image className="w-20 h-20" src="icons/folio_ai_logo_transparent_bg.png" alt="Folio AI Logo" /> */}
        Folio <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">AI</span>
     </h1>

     <hr />

      <div className="mt-2 space-y-4">
        <input placeholder="Job Title" className="p-2 w-full border rounded border-teal-400 focus:ring-green-400" />
        <input placeholder="Company" className="p-2 w-full border rounded border-teal-400 focus:ring-green-400" />
        <input placeholder="Location" className="p-2 w-full border rounded border-teal-400 focus:ring-green-400" />
        <textarea placeholder="Job Description" className="p-2 w-full h-40 border rounded border-teal-400 focus:ring-green-400"></textarea>

        <button className="p-3 w-full rounded-lg text-white font-bold bg-teal-400">Next</button> 
      </div>
    </div>
    </>
    );
  };

  const iframeContent = ReactDOMServer.renderToString(<IFrameContent />);

  return (
    // <div id="sidebar" className="main-popup p-4 shadow-2xl bg-white h-screen fixed right-0 top-0 w-1/4">
    <>

    {!isVisible && (
      <div 
        onClick={togglePopupVisibility} 
        className="fixed top-0 right-0 m-4 p-4 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-700 text-white rounded-full cursor-pointer shadow-lg z-[10000]"
      >
        Folio AI
      </div>
    )}
    
    {/* iFrame setup */}
    <iframe
        srcDoc={iframeContent}
        style={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '25vw',
          height: '100vh',
          border: 'none',
          zIndex: 9999999,
          boxShadow: '-10px 0px 15px rgba(0, 0, 0, 0.3)',
          transform: isVisible ? 'translateX(0%)' : 'translateX(100%)',
          transition: 'transform 0.5s ease'
        }}
    />

    <button onClick={togglePopupVisibility} className="fixed top-0 right-0 m-4 z-[1000000000]">
        {isVisible &&
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-teal-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
        }
    </button>
    
    </>
  );
};

export default Popup;

