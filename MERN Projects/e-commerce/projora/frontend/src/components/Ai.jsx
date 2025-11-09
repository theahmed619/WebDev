import React, { useState } from "react";
import ai from "../assets/ai.png";
import { useNavigate } from "react-router-dom";
import open from "../assets/open.mp3"; // Assuming this path is correct
import toast from 'react-hot-toast';

function Ai() {
  let navigate = useNavigate();
  let [activeAi, setActiveAi] = useState(false);

  // This audio file will play when the AI is activated
  let openingSound = new Audio(open);

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  // Check if browser supports speech recognition
  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!speechRecognition) {
    console.log("Speech recognition not supported in this browser.");
    // Don't render the button if the browser can't support it
    return null; 
  }
  
  const recognition = new speechRecognition();

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();

    if (transcript.includes("open") && transcript.includes("search")) {
      speak("opening search");
      navigate("/search");
    } 
    // --- UPDATED COMMAND ---
    // Changed "reel" to "project"
    else if (transcript.includes("project") || transcript.includes("projects")) {
      speak("opening projects page");
      navigate("/projects");
    } 
    // --- END UPDATE ---
    else if (transcript.includes("profile")) {
      speak("opening profile page");
      navigate("/profile");
    } else if (transcript.includes("home") || transcript.includes("homepage")) {
      speak("opening home page");
      navigate("/");
    } else {
      speak("I didn't understand that. Please try again.");
      console.log("Try Again");
      toast.error("I didn't understand that. Please try again.");
    }
  };

  recognition.onend = () => {
    setActiveAi(false); // Reset animation when listening stops
  };

  const startListening = () => {
    try {
      recognition.start();
      openingSound.play();
      setActiveAi(true);
    } catch (error) {
      // Handle error if recognition is already running
      console.log("Speech recognition already active.");
      setActiveAi(false);
    }
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] z-40" // Added z-index
      onClick={startListening}
    >
      <img
        src={ai}
        alt="AI Assistant"
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