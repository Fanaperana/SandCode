import { FC, useState, useContext, useEffect } from "react";
import { FavoriteContainer, FolderContainer, TagContainer } from "./";
import { ExplorerToolbar } from "./misc";
import { ActiveContext } from "./contexts";
import { ActiveType, ExplorerType } from "./types";
import { MainContext } from "../context";
import "./utils";

export const ExplorerContainer: FC = () => {
  // Initial state use to the side explorer
  const toActive: ActiveType = {
    index: 1,
    type: ExplorerType.FAVORITE,
  };

  const [isShown, setIsShown] = useState(true);

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
  }, [isShown]);

  const mainContext = useContext(MainContext);
  const [active, setActive] = useState<ActiveType>(toActive);

  useEffect(() => {
    mainContext?.setExplorer(active as ActiveType);
    mainContext?.setSnippet({snippet_id: 0});
  }, [active]);

  return isShown ? (
    <div
      className="flex flex-col min-w-[200px] max-w-[200px] text-slate-400 text-sm bg-[#151515] h-full"
      id="explorer"
    >
      <ActiveContext.Provider
        value={{
          active,
          setActive,
        }}
      >
        <ExplorerToolbar />
        <FavoriteContainer />
        <FolderContainer />
        <TagContainer />
      </ActiveContext.Provider>
    </div>
  ) : null;
};
