import { FC, useContext, useState } from "react";
import { GoPlus } from "react-icons/go";
import FolderItem from "./FolderItem";
import { ActiveContext } from '../contexts/ActiveContext';
import Modal from '../../misc/modal/Modal';



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

    const [showModal, setShowModal] = useState(false); 

    const handleActive = (id: number) => {
        activeContext?.setActive({ index: id, type: "folder" });
    }

    return (
        <details className="open:grow ease-in-out transition-all duration-200 open:mb-6" open>
            <summary className="cursor-pointer text-xs px-1 flex justify-between items-center hover:border-l-2 hover:border-orange-600/75 bg-[#313842] select-none">
                <div>
                    Folders
                </div>
                <div className="pt-1">
                    <button className="hover:text-slate-400 text-slate-500" onClick={() => setShowModal(true)} >
                        <GoPlus className=" rounded-full border border-slate-500 hover:border-slate-400" size="15"/>
                    </button>

                    <Modal title="Add Folder" isOpen={showModal} onClose={() => setShowModal(false)} >
                        </Modal>
                </div>
            </summary>
            <div className="h-full overflow-y-auto min-h-20">
                <ul className="list-none text-slate-300 text-sm h-5 max-h-full">
                    {folders.map(f => (
                        <li key={f.id} onClick={() => handleActive(f.id)}>
                            <FolderItem name={f.name} classStyle={`${((activeContext?.active.index === f.id) && (activeContext?.active.type === "folder")) ? 'active' : '' }`} />
                        </li>
                    ))
                    }
                </ul>
            </div>
        </details>
    );
}

export default FolderContainer;