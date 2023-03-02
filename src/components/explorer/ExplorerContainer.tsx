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

  const mainContext = useContext(MainContext);
  const [active, setActive] = useState<ActiveType>(toActive);

  useEffect(() => {
    mainContext?.setExplorer(active as ActiveType);
  }, [active]);

  return (
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
  );
};
