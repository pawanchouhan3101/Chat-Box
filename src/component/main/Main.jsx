import {
  CompassIcon,
  Lightbulb,
  MessageCircle,
  CodeIcon,
  MicIcon,
  Send,
  UserIcon,
  Hand
} from "lucide-react";
import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../../context/context";

export default function Main() {
  const {
    onsent,
    recentprompt,
    showresult,
    loading,
    resultdata,
    setinput,
    input
  } = useContext(Context);

  const resultRef = useRef(null);

 
  useEffect(() => {
    if (showresult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultdata, showresult]);

  const handleSend = () => {
    if (input.trim() !== "") {
      onsent();
    }
  };

  const cards = [
    { icon: CompassIcon, label: "Explore topics", bg: "bg-red-100", text: "text-red-800" },
    { icon: Lightbulb, label: "Get ideas", bg: "bg-yellow-100", text: "text-yellow-800" },
    { icon: MessageCircle, label: "Ask questions", bg: "bg-green-100", text: "text-green-800" },
    { icon: CodeIcon, label: "Coding help", bg: "bg-blue-100", text: "text-blue-800" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-200 p-6">

      
      <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow mb-8">
        <div className="flex items-center gap-3 font-semibold text-lg">
          <UserIcon size={24} color="red" />
          <span>Pawan's AI</span>
        </div>
      </div>

    
      {!showresult ? (
        <>
         
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-4xl font-semibold flex items-center justify-center gap-2">
              Hello, User <Hand size={40} />
            </h2>
            <p className="text-2xl text-gray-500 mt-2">How can I assist you today?</p>
          </div>

         
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {cards.map(({ icon: Icon, label, bg, text }, idx) => (
              <div
                key={idx}
                className={`${bg} ${text} flex items-center gap-3 p-5 rounded-lg shadow hover:brightness-95 cursor-pointer transition`}
              >
                <Icon size={24} />
                <p className="text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        
        <div
          ref={resultRef}
          className="bg-white p-6 rounded-lg shadow mb-8 overflow-y-auto max-h-[60vh]"
        >
          <p className="font-semibold mb-4">{recentprompt}</p>
          {loading ? (
            <p className="text-gray-500">AI is thinking...</p>
          ) : (
            <p
              dangerouslySetInnerHTML={{ __html: resultdata }}
              className="text-gray-700 whitespace-pre-line"
            />
          )}
        </div>
      )}

      
      <div className="mt-auto bg-white p-5 rounded-lg shadow">
        <div className="flex items-center border rounded-lg px-4 py-3 gap-3">
          <input
            onChange={(e) => setinput(e.target.value)}
            value={input}
            type="text"
            placeholder="Ask anything..."
            className="flex-1 outline-none text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <MicIcon size={24} className="cursor-pointer text-gray-500" />
          <Send
            onClick={handleSend}
            size={24}
            className="cursor-pointer text-blue-500"
          />
        </div>

        <p className="text-xs text-gray-400 mt-2">
          AI may generate inaccurate information. Verify important details.
        </p>
      </div>
    </div>
  );
}