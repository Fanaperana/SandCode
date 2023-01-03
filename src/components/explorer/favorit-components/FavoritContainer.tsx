import { FC, useContext } from "react";
import FavoritItem from './FavoritItem';
import { ActiveContext } from '../contexts/ActiveContext';
import { GoDiffAdded } from "react-icons/go";


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
        <div className="">
            <div className="text-xs p-1 flex justify-between">
                <div>
                    Favorites
                </div>
                <div>
                    <button className="hover:text-slate-200" >
                        <GoDiffAdded size="15"/>
                    </button>
                </div>
            </div>
            <ul className="list-none list text-slate-200 text-sm">
                {
                    favorites.map((f) => (
                        <li key={f.id} onClick={() => handleActive(f.id)}>
                            <FavoritItem name={f.name} classStyle={`${((activeContext?.active.index === f.id) && (activeContext?.active.type === "favorit")) ? 'active' : '' }`} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
export default FavoritContainer;
