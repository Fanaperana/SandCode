import { useContext, FC } from "react";
import { GoKebabHorizontal } from "react-icons/go";
// import { ActiveClass } from "../utils/ActiveClass";
import { ActiveContext } from "../contexts/ActiveContext";

export const ExplorerToolbar: FC = () => {
  const myActive = useContext(ActiveContext);

  return (
    <div className="flex justify-between w-full text-slate-500 font-bold border-b border-slate-700 p-1 pb-0 bg-black">
      <div className="text-[10px]">EXPLORER</div>
      <button className="px-1 mb-1 border border-slate-700/50 rounded hover:text-slate-400 hover:bg-slate-700/50">
        <GoKebabHorizontal size="15" />
      </button>
    </div>
  );
};
