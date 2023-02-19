import { FC, useState, useContext, useEffect } from "react";
import ExplorerToolbar from "./misc/ExplorerToolbar";
import FavoriteContainer from "./favorite-components/FavoriteContainer";
import FolderContainer from "./folder-components/FolderContainer";
import TagContainer from "./tag-components/TagContainer";
import { ActiveContext } from "./contexts/ActiveContext";
import { ActiveType } from "./types/Active";
import "./utils/styles.css";
import { MainContext } from "../context/MainContext";

const ExplorerContainer: FC = () => {
  // Initial state use to the side explorer
  const toActive: ActiveType = {
    index: 1,
    type: "favorite",
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

export default ExplorerContainer;
