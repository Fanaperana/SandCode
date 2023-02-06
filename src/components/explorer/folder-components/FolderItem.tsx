import { useState, FC } from "react";
import { GoFileDirectory } from "react-icons/go";

interface Props {
  index: number;
  name?: string;
  classStyle: string;
}

const FolderItem: FC<Props> = ({ index, name, classStyle }) => {
  let c: JSX.Element | null = null;

  if (index !== 0) {
    c = (
      <div
        className={`flex gap-1 m-1 items-center ${classStyle}`}
        style={{
          cursor: "pointer",
        }}
      >
        <GoFileDirectory className="text-[#de9787]" size="18" />
        <span className="px-1 text-[13px] text-slate-200">{name}</span>
      </div>
    );
  } else {
    c = (
      <div
        className={`flex gap-1 m-1 items-center ${classStyle} justify-center italic bg-gray-900/60`}
        style={{
          cursor: "not-allowed",
        }}
      >
        {/* <GoFileDirectory className="text-slate-600" size="18" /> */}
        <span className="px-1 text-[13px] text-slate-500">Empty Folder</span>
      </div>
    );
  }
  return c;
};
// return c;

export default FolderItem;
