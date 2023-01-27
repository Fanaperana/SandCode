import { FC, useState } from "react";
import ExplorerToolbar from "./misc/ExplorerToolbar";
import FavoritContainer from "./favorit-components/FavoritContainer";
import FolderContainer from "./folder-components/FolderContainer";
import TagContainer from "./tag-components/TagContainer";
import { ActiveContext } from "./contexts/ActiveContext";
import { ActiveType } from './types/Active';
import "./utils/styles.css";


const ExplorerContainer: FC = () => {

    // Initial state use to the side explorer
    const toActive: ActiveType = {
        index: 1,
        type: "favorit"
    };

    const [active, setActive] = useState <ActiveType>(toActive);

    return (
        <div className="flex flex-col min-w-[200px] max-w-[200px] text-slate-400 text-sm bg-[#1b1a1a] h-full" id="explorer">
            <ActiveContext.Provider
                value={{
                    active,
                    setActive
                }}
            >
                <ExplorerToolbar />
                <FavoritContainer />
                <FolderContainer />
                <TagContainer />
            </ActiveContext.Provider>
        </div>
    );
}


export default ExplorerContainer;