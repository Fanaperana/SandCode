import { useState, FC } from "react";
import { GoFileDirectory } from "react-icons/go";

interface Props {
  name?: string;
  classStyle: string;
}

const FolderItem: FC<Props> = ({ name, classStyle }) => {
  return (
    <div className={`flex gap-1 m-1 items-center ${classStyle}`}>
      <GoFileDirectory className="text-slate-400" size="18" />
      <span className="px-1 text-[13px] text-slate-200">{name}</span>
    </div>
  );
};
export default FolderItem;
