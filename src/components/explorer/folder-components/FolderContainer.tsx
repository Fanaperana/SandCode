import { FC, useContext } from "react";
import { GoPlus } from "react-icons/go";
import FolderItem from "./FolderItem";
import { ActiveContext } from '../contexts/ActiveContext';


const FolderContainer: FC = () => {
    const folders = [
        {
            id: 1,
            name: "GOLand",
        },
        {
            id: 2,
            name: "CharlyBrown",
        },
        {
            id: 3,
            name: "Snoopydoo",
        },
        {
            id: 4,
            name: "SleepyHead",
        },  
    ];

    const activeContext = useContext(ActiveContext);

    const handleActive = (id: number) => {
        activeContext?.setActive({ index: id, type: "folder" });
    }

    return (
        <div className="">
            <div className="text-xs p-1 flex justify-between">
                <div>
                    Folders
                </div>
                <div>
                    <button className="hover:text-slate-400 text-slate-500" >
                        <GoPlus className=" rounded-full border border-slate-500 hover:border-slate-400" size="15"/>
                    </button>
                </div>
            </div>
            <ul className="list-none text-slate-300 text-sm">
                {folders.map(f => (
                    <li key={f.id} onClick={() => handleActive(f.id)}>
                        <FolderItem name={f.name} classStyle={`${((activeContext?.active.index === f.id) && (activeContext?.active.type === "folder")) ? 'active' : '' }`} />
                    </li>
                ))
                }
            </ul>
        </div>
    );
}

export default FolderContainer;