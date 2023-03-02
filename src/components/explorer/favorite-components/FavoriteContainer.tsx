import { FC, useContext } from "react";
import { FavoriteItem } from "./FavoriteItem";
import { ActiveContext } from "../contexts/ActiveContext";
import { GoPlus } from "react-icons/go";
import { ActiveType } from "../types/";
import { ExplorerType } from "../types/";

export const FavoriteContainer: FC = () => {
  const favorites = [
    {
      id: 1,
      name: "All Snippets",
      icon: "GoPackage",
    },
    {
      id: 2,
      name: "Uncategorized",
      icon: "GoBookmark",
    },
    {
      id: 3,
      name: "Other Categories",
      icon: "GoArchive",
    },
  ];

  const activeContext = useContext(ActiveContext);

  const handleActive = (id: number) => {
    activeContext?.setActive({ index: id, type: ExplorerType.FAVORITE });
  };

  return (
    <details
      className="open:grow ease-in-out transition-all duration-200 open:mb-6"
      open
    >
      <summary className="cursor-pointer text-xs px-1 flex justify-between items-center hover:border-l-2 hover:border-orange-600/75 bg-[#313842] select-none">
        <div>Favorites</div>
        <div className="flex gap-2 p-1 justify-center items-center">
          <button className="hover:text-slate-400 text-slate-500">
            <GoPlus
              className="rounded-full border border-slate-500 hover:border-slate-400"
              size="15"
            />
          </button>
        </div>
      </summary>
      <div className="h-full overflow-y-auto min-h-20">
        <ul className="list-none list text-slate-200 text-sm h-5 max-h-full">
          {favorites.map((f) => (
            <li key={f.id} onClick={() => handleActive(f.id)}>
              <FavoriteItem
                name={f.name}
                icon={f.icon}
                classStyle={`${
                  activeContext?.active.index === f.id &&
                  activeContext?.active.type === "favorite"
                    ? "active"
                    : ""
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
};
