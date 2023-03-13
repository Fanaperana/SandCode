import { useState, FC, Dispatch, SetStateAction, MouseEvent } from "react";
import { GoPrimitiveDot } from "react-icons/go";

interface SnippetProps {
  // id?: number;
  title: string;
  fileName: string;
  time: string;
  activeIndex: number;
  className: string;
}

export const SnippetItem: FC<SnippetProps> = ({
  className,
  title,
  fileName,
  time,
}) => {
  return (
    <>
      <div
        className={`${className} py-2 px-3 text-sm text-slate-200 snippet-item`}
      >
        <h4 className="truncate" title={title}>{title}</h4>
        <div className="flex justify-between items-center text-slate-400 text-[11px] gap-1 mt-1">
          <span
            className="bg-[#1d1d1d] px-2 rounded border border-slate-600/50
          "
          >
            {fileName}
          </span>
          <span className="whitespace-nowrap">{time}</span>
        </div>
      </div>
    </>
  );
};
