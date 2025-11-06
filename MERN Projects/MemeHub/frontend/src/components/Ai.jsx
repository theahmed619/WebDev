import React, { useState } from "react";
import ai from "../assets/ai.png";
import { useNavigate } from "react-router-dom";
import open from "../assets/open.mp3";
import toast from 'react-hot-toast';

function Ai() {
  let navigate = useNavigate();
  let [activeAi, setActiveAi] = useState(false);

  // 1. --- FIX ---
  // 'open' was not defined. I have commented this out.
  // You can import and use a sound file here if you have one.
  let openingSound = new Audio(open);

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!speechRecognition) {
    console.log("Speech recognition not supported");
    return null; // Don't render the button if the browser can't support it
  }
  const recognition = new speechRecognition();

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim();

    if (
      transcript.toLowerCase().includes("search") &&
      transcript.toLowerCase().includes("open")
    ) {
      speak("opening search");
      navigate("/search");
    }
    // 2. --- FIX ---
    // 'showSearch' was not defined. I have removed this command
    // as it doesn't apply to your app's structure.
    /*
    else if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch){
      speak("closing search")
    }
    */
    else if (
      transcript.toLowerCase().includes("reel") ||
      transcript.toLowerCase().includes("reels")
    ) {
      speak("opening reel page");
      navigate("/reels");
    } else if (transcript.toLowerCase().includes("profile")) {
      speak("opening profile page");
      navigate("/profile");
    } else if (
      transcript.toLowerCase().includes("home") ||
      transcript.toLowerCase().includes("homepage")
    ) {
      speak("opening home page");
      navigate("/");
    } else {
      speak("I didn't understand that. Please try again.");
      console.log("Try Again");
      toast.error("I didn't understand that. Please try again.");
    }
  };

  recognition.onend = () => {
    setActiveAi(false);
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] "
      onClick={() => {
        recognition.start();
        openingSound.play();
        setActiveAi(true);
      }}
    >
      <img
        src={ai}
        alt=""
        className={`w-[100px] cursor-pointer ${
          activeAi
            ? "translate-x-[10%] translate-y-[-10%] scale-125 "
            : "translate-x-[0] translate-y-[0] scale-100"
        } transition-transform`}
        style={{
          filter: ` ${
            activeAi
              ? "drop-shadow(0px 0px 30px #00d2fc)"
              : "drop-shadow(0px 0px 20px black)"
          }`,
        }}
      />
    </div>
  );
}

export default Ai;