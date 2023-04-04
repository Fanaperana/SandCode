import { invoke } from "@tauri-apps/api";
import { useState, useEffect, FC, useContext } from "react";
import { SnippetItem, SeachInput } from "./";
import { ExplorerType } from "../explorer/types";
import { MsgType, Notify } from "../misc/notification";
import "./SnippetContainer.css";
import { useAppSelector } from "../../hook";
import { snippetIndex } from "../../slice";
import { useAppDispatch } from "./../../hook/core";

interface SnippetProps {
  id: number;
  title: string;
  file: string;
  time: string;
}

interface SnippetResProps {
  id: number;
  folder_id: number;
  name: string;
  timestamp: string;
}

export const SnippetContainer: FC = () => {
  const dispatch = useAppDispatch();
  const eIndex = useAppSelector((state) => state.explorer.explorerIndex);
  const sIndex = useAppSelector((state) => state.snippet.snippetId);
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      //   event.preventDefault();

      // console.log(event.code);
      if (event.ctrlKey && !event.shiftKey && event.code === "KeyB") {
        event.preventDefault();
        setIsShown(!isShown);
        event.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShown]);

  const [snippetList, setSnippetList] = useState<SnippetResProps[]>([]);

  useEffect(() => {
    if (eIndex) {
      if (eIndex.type === ExplorerType.FAVORITE) {
        switch (eIndex.index) {
          // Fetch all snippets
          case 1: {
            invoke("plugin:snippets|fetch_all")
              .then((res) => {
                if (typeof res === "object") {
                  const data: Array<SnippetResProps> =
                    res as Array<SnippetResProps>;
                  setSnippetList(data);
                }
              })
              .catch((err) => {
                Notify(MsgType.ERROR, err);
              });
            break;
          }
          case 2: {
            // Uncategorized
            setSnippetList([]);
            break;
          }
          case 3: {
            setSnippetList([]);
            // Other Categories
            break;
          }
        }
      } else if (eIndex.type === ExplorerType.FOLDER) {
        invoke("plugin:snippets|fetch_snippet_by_folder", {
          folderId: eIndex.index,
        })
          .then((res) => {
            if (typeof res == "object") {
              const data: Array<SnippetResProps> =
                res as Array<SnippetResProps>;
              if (data.length === 0) {
                setSnippetList([]);
              } else {
                if (data.length === 1) {
                  if (data[0].folder_id === 0) {
                    setSnippetList([]);
                  } else {
                    setSnippetList(data);
                  }
                } else {
                  setSnippetList(data);
                }
              }
            }
          })
          .catch((err) => {
            Notify(MsgType.ERROR, err);
          });
      } else if (eIndex.type === ExplorerType.TAG) {
      }
    }
    handleActive(0);
  }, [eIndex]);

  const handleActive = (id: number) => {
    dispatch(snippetIndex(id));
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
                      title={s.name}
                      fileName={eIndex.type || ""}
                      time={s.timestamp.split(" ")[0]}
                      activeIndex={sIndex}
                      className={s.id === sIndex ? "active" : ""}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center flex flex-1 items-center justify-center font-thin italic text-slate-400 rounded bg-[#2f3841] border border-slate-700 shadow-sm shadow-slate-900 opacity-50">
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
