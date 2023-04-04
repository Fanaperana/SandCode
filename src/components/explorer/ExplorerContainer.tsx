import { FC, useState, useContext, useEffect } from "react";
import { FavoriteContainer, FolderContainer, TagContainer } from "./";
import { ExplorerToolbar } from "./misc";
import { useAppSelector, useAppDispatch } from "../../hook";
import { snippetIndex } from "../../slice";

import "./utils";

export const ExplorerContainer: FC = () => {
  const [isShown, setIsShown] = useState(true);
  const eIndex = useAppSelector((state) => state.explorer.explorerIndex);
  const sIndex = useAppSelector((state) => state.snippet.snippetId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      //   event.preventDefault();

      // console.log(event.code);
      if (event.ctrlKey && event.shiftKey && event.code === "KeyB") {
        event.preventDefault();
        setIsShown(!isShown);
        event.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShown, setIsShown]);

  useEffect(() => {
    dispatch(snippetIndex(0));
  }, [eIndex]);

  return (
    <>
      {isShown && (
        <div
          className="flex flex-col min-w-[200px] max-w-[200px] text-slate-400 text-sm bg-[#151515] h-full"
          id="explorer"
        >
          <ExplorerToolbar />
          <FavoriteContainer />
          <FolderContainer />
          <TagContainer />
        </div>
      )}
    </>
  );
};
