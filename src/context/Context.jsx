import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {

  const [input, setinput] = useState("");
  const [recentprompt, setrecentprompt] = useState("");
  const [showresult, setshowresult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultdata, setresultdata] = useState("");
  const [prevprompt, setPrevPrompt] = useState([]); // ✅ fixed

  const delaypara = (index, nextword) => {
    setTimeout(() => {
      setresultdata(prev => prev + nextword + " ");
    }, 50 * index);
  };

  const newchat = () => {
    setloading(false);
    setshowresult(false);
    setrecentprompt("");
    setresultdata("");
  };

  const onsent = async (prompt) => {

    const finalPrompt = prompt || input;

    if (!finalPrompt) return;

    setresultdata("");
    setloading(true);
    setshowresult(true);

   
    setPrevPrompt((prev) => {
      if (prev.includes(finalPrompt)) return prev;
      return [...prev, finalPrompt];
    });

    setrecentprompt(finalPrompt);

    const response = await runChat(finalPrompt);

    let words = response.split(" ");

    words.forEach((word, i) => {
      delaypara(i, word);
    });

    setloading(false);
    setinput("");
  };

  const contextValue = {
    onsent,
    recentprompt,
    showresult,
    loading,
    resultdata,
    setinput,
    input,
    prevprompt,
    setrecentprompt,
    newchat
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;