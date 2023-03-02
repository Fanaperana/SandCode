import { invoke } from "@tauri-apps/api";
import { useState, useEffect, FC, useContext } from "react";
import { SnippetItem, SeachInput } from "./";
import { ExplorerType } from "../explorer/types";
import { MsgType, Notify } from "../misc/notification";
import { MainContext } from "./../context";
import "./SnippetContainer.css";

interface SnippetProps {
  id: number;
  title: string;
  file: string;
  time: string;
}

export const SnippetContainer: FC = () => {
  const [isShown, setIsShown] = useState(true);
  const mainContext = useContext(MainContext);

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

  useEffect(() => {
    console.log(mainContext?.explorer);
  }, [mainContext?.explorer]);

  const sList: SnippetProps[] = [
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
      title: "Tauri APP",
      file: "Rust",
      time: "12/09/22",
    },
    {
      id: 4,
      title: "Tauri APP",
      file: "Rust",
      time: "12/09/22",
    },
  ];

  const [snippetList, setSnippetList] = useState<SnippetProps[]>(sList);

  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    // console.log(mainContext?.explorer);
    if (mainContext?.explorer) {
      invoke("plugin:snippets|fetch_all")
        .then((res) => {
          // console.log(typeof res);
          if (typeof res === "object") {
            const data = res;

            // res.map(data => {

            // })
          }
        })
        .catch((err) => {
          Notify(MsgType.ERROR, err);
        });
      if (mainContext?.explorer.type === ExplorerType.FAVORITE) {
      } else if (mainContext?.explorer.type === ExplorerType.FOLDER) {
      } else if (mainContext?.explorer.type === ExplorerType.TAG) {
      }
    }
  }, [mainContext?.explorer]);

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
        <div className="shrink block border-b border-[#313842]">
          <SeachInput />
        </div>
        <div className="grow bg-[#1f2228]" id="snippets">
          <div className="mx-2 py-2 h-full">
            <div className="flex flex-col snippet-list gap-1 divide-[#262626] h-full">
              {snippetList.length ? (
                snippetList.map((s) => (
                  <div key={s.id} onClick={() => handleActive(s.id)}>
                    <SnippetItem
                      title={s.title}
                      fileName={s.file}
                      time={s.time}
                      activeIndex={activeIndex}
                      className={s.id === activeIndex ? "active" : ""}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center flex flex-1 items-center justify-center font-thin italic text-slate-400 rounded bg-[#2f3841] border border-slate-700 shadow-sm shadow-slate-900">
                  <div className="">Empty folder</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-2 border-t border-slate-800 bg-[#0c0c0c]">
          <button className="text-xs text-center bg-[#151e21] transition-colors duration-75 text-slate-400 w-full border rounded-sm border-slate-700 p-1 hover:bg-slate-700/50 active:bg-slate-800/40 hover:text-slate-200 shadow-md my-1">
            New Snippet
          </button>
        </div>
      </div>
    </div>
  );
};
