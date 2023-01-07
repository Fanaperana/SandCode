import { FC, useContext } from "react";
import FavoritItem from './FavoritItem';
import { ActiveContext } from '../contexts/ActiveContext';
import { GoPlus } from "react-icons/go";


const FavoritContainer: FC = () => {

    const favorites = [
        {
            id: 1,
            name: "All Snippets",
        },
        {
            id: 2,
            name: "Uncategorized",
        },
        {
            id: 3,
            name: "Other Categories",
        },  
    ];

    const FAVORIT: string = "favorit";

    const activeContext = useContext(ActiveContext);

    const handleActive = (id: number) => {
        activeContext?.setActive({ index: id, type: FAVORIT });
    } 

    return (
        <details className="open:grow ease-in-out transition-all duration-200 open:mb-6" open>
            <summary className="cursor-pointer text-xs px-1 flex justify-between items-center hover:border-l-2 hover:border-orange-600/75 bg-[#313842] select-none">
                <div>
                    Favorites
                </div>
                <div className="pt-1">
                    <button className="hover:text-slate-400 text-slate-500" >
                        <GoPlus className="rounded-full border border-slate-500 hover:border-slate-400" size="15"/>
                    </button>
                </div>
            </summary>
            <div className="h-full overflow-y-auto min-h-20">
                <ul className="list-none list text-slate-200 text-sm h-5 max-h-full">
                    {
                        favorites.map((f) => (
                            <li key={f.id} onClick={() => handleActive(f.id)}>
                                <FavoritItem name={f.name} classStyle={`${((activeContext?.active.index === f.id) && (activeContext?.active.type === "favorit")) ? 'active' : '' }`} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </details>
    );
}
export default FavoritContainer;
