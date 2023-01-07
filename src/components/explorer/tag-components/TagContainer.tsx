import { FC, useContext } from "react";
import { GoPlus } from "react-icons/go";
import { ActiveContext } from '../contexts/ActiveContext';
import TagItem from "./TagItem";


const TagContainer: FC = () => {

    const tags = [
        {
            id: 1,
            name: "MySQL",
            color: "#913131"
        },
        {
            id: 2,
            name: "Cpp",
            color: "#3b9131"
        },
        {
            id: 3,
            name: "Python",
            color: "#317691"
        },

    ];

    const activeContext = useContext(ActiveContext);

    const handleActive = (id: number) => {
        activeContext?.setActive({ index: id, type: "tag" });
    }

    return (
        <details className="open:grow ease-in-out transition-all duration-200 open:mb-6" open>
            <summary className="cursor-pointer text-xs px-1 flex justify-between items-center hover:border-l-2 hover:border-orange-600/75 bg-[#313842] select-none">
                <div>
                    Tags
                </div>
                <div className="pt-1">
                    <button className="hover:text-slate-400 text-slate-500" >
                        <GoPlus className=" rounded-full border border-slate-500 hover:border-slate-400" size="15"/>
                    </button>
                </div>
            </summary>
            <div className="h-full overflow-y-auto min-h-20">
                <ul className="list-none text-slate-300 text-sm h-5 max-h-full">
                    {tags.map(f => (
                        <li key={f.id} onClick={() => handleActive(f.id)}>
                            <TagItem
                                name={f.name}
                                color={f.color}
                                classStyle={`${((activeContext?.active.index === f.id) && (activeContext?.active.type === "tag")) ? 'active' : ''}`} />
                        </li>
                    ))
                    }
                </ul>
            </div>
        </details>
    );
}
export default TagContainer;