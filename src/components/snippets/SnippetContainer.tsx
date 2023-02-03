import { useState, useEffect, FC } from "react";
import SeachInput from "./SeachInput";
import SnippetItem from "./SnippetItem";
import "./SnippetContainer.css";

const Snippet: FC = () => {
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      //   event.preventDefault();

      // console.log(event.code);
      if (event.ctrlKey && event.code === "KeyB") {
        event.preventDefault();
        setIsShown(!isShown);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShown]);

  const snippetList = [
    {
      id: 1,
      title: "Vue Application Modal Creation",
      file: "Uncategorized",
      time: "12:00 PM",
    },
    {
      id: 2,
      title: "Tauri APP",
      file: "Rust",
      time: "12/09/22",
    },
    {
      id: 3,
      title: "SQL Reports",
      file: "MySQL",
      time: "01/10/23",
    },
    {
      id: 4,
      title: "My ReactApp",
      file: "Typescript",
      time: "01/01/22",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  const handleActive = (id: number) => {
    setActiveIndex(id);
    console.log(id);
  };

  if (!isShown) {
    return null;
  }
  return (
    <div className="w-[250px]">
      <div className="flex flex-col h-full">
        <div className="shrink block border-b border-[#4d4d4d]">
          <SeachInput />
        </div>
        <div className="grow mb-2" id="snippets">
          <div className="mx-2 py-2 h-full">
            <div className="flex flex-col snippet-list divide-y divide-[rgb(63,63,63)] h-full">
              {snippetList.map((s) => (
                <div key={s.id} onClick={() => handleActive(s.id)}>
                  <SnippetItem
                    title={s.title}
                    fileName={s.file}
                    time={s.time}
                    activeIndex={activeIndex}
                    className={s.id === activeIndex ? "active" : ""}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-1">
          <button className="text-xs text-center transition-colors duration-75 text-slate-400 w-full border rounded-sm border-slate-700 p-1 hover:bg-slate-700/50 active:bg-slate-800/40 hover:text-slate-200 shadow-md">
            New Snippet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snippet;
