import {
  FileQuestionIcon,
  HistoryIcon,
  MenuIcon,
  MessageSquare,
  PlusIcon,
  SettingsIcon
} from "lucide-react";
import React, { useState, useContext } from "react";
import { Context } from "../../context/context";

export default function Sidebar() {

  const [extend, setExtend] = useState(false);

  const { onsent, prevprompt, setrecentprompt, newchat } = useContext(Context);

  const loadprompt = async (prompt) => {
    setrecentprompt(prompt);
    await onsent(prompt);
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-900 text-white p-4 ${extend ? "w-64" : "w-20"}`}>

      <div className="flex flex-col mb-6">

        <MenuIcon
          className="cursor-pointer mb-4"
          onClick={() => setExtend(!extend)}
        />

        <div onClick={newchat} className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
          <PlusIcon size={20} />
          {extend && <p>New Chat</p>}
        </div>

        {/* ✅ FIXED HISTORY */}
        {extend && (
          <div className="mt-4">
            <p className="text-gray-400 text-sm mb-2">Recent</p>

            {prevprompt.length === 0 ? (
              <p className="text-gray-500 text-xs">No history yet</p>
            ) : (
              prevprompt.map((items, index) => (
                <div
                  key={index}
                  onClick={() => loadprompt(items)}
                  className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
                >
                  <MessageSquare size={20} />
                  <p>{items.slice(0, 18)}...</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-3">

        <div className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
          <FileQuestionIcon size={20} />
          {extend && <p>Help</p>}
        </div>

        <div className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
          <HistoryIcon size={20} />
          {extend && <p>Activity</p>}
        </div>

        <div className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
          <SettingsIcon size={20} />
          {extend && <p>Setting</p>}
        </div>

      </div>

    </div>
  );
}