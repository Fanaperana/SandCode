import { FC, useState, useEffect, useContext } from "react";
import { EditorInputTag } from "./EditorInputTag";
import { invoke } from "@tauri-apps/api";
import { MainContext } from "./../context/MainContext";
import {
  GoListUnordered,
  GoCloudDownload,
  GoFold,
  GoRepo,
  GoPencil,
} from "react-icons/go";

interface SnippetType {
  id: number;
  folder_id: number;
  name: string;
  timestamo: string;
}

export const EditorHeader: FC = () => {
  const [headerTitle, setHeaderTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const mainContext = useContext(MainContext);

  useEffect(() => {
    if (mainContext?.snippet?.snippet_id) {
      invoke("plugin:snippets|fetch_snippet", {
        snippetId: mainContext?.snippet.snippet_id,
      }).then((res) => {
        const data: SnippetType = res as SnippetType;

        if (data) {
          setHeaderTitle(data.name as string);
        }
      });
    } else {
      setHeaderTitle("");
    }
  }, [mainContext?.snippet, mainContext?.explorer]);

  return (
    <div className="divide-y divide-slate-700/70 w-full">
      <div className="flex flex-row p-3 w-full items-center">
        <h3 className="grow truncate text-gray-400 hover:text-gray-300/90 font-bold w-full cursor-pointer">
          <GoRepo size="20" className="inline-block mr-3 text-gray-500" />
          {headerTitle ? headerTitle : "New Snippet Draft"}
        </h3>
        <div className="shrink">
          <div className="flex gap-2">
            <button
              title="Fold all snippets"
              className="border border-slate-600/20 p-1 rounded-sm text-slate-600 hover:text-slate-200 hover:bg-slate-700/50 active:text-slate-300 active:bg-slate-700/30"
            >
              <GoPencil />
            </button>
            <button
              title="Fold all snippets"
              className="border border-slate-600/20 p-1 rounded-sm text-slate-600 hover:text-slate-200 hover:bg-slate-700/50 active:text-slate-300 active:bg-slate-700/30"
            >
              <GoFold />
            </button>
            <button
              title="Download all snippets"
              className="border border-slate-600/20 p-1 rounded-sm text-slate-600 hover:text-slate-200 hover:bg-slate-700/50 active:text-slate-300 active:bg-slate-700/30"
            >
              <GoCloudDownload />
            </button>
            <button
              title="View all snippets"
              className="border border-slate-600/20 p-1 rounded-sm text-slate-600 hover:text-slate-200 hover:bg-slate-700/50 active:text-slate-300 active:bg-slate-700/30"
            >
              <GoListUnordered />
            </button>
          </div>
        </div>
      </div>
      <div>
        <EditorInputTag />
      </div>
    </div>
  );
};
