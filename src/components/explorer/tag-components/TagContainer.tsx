import { FC, useContext } from "react";
import { GoDiffAdded } from "react-icons/go";
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
        <div className="">
            <div className="text-xs p-1 flex justify-between">
                <div>
                    Tags
                </div>
                <div>
                    <button className="hover:text-slate-200" >
                        <GoDiffAdded size="15"/>
                    </button>
                </div>
            </div>
            <ul className="list-none text-slate-300 text-sm">
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
    );
}
export default TagContainer;