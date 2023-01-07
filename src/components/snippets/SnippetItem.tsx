import { useState, FC, Dispatch, SetStateAction, MouseEvent } from "react";
import { GoPrimitiveDot } from "react-icons/go";

interface SnippetProps {
    // id?: number;
    title: string;
    fileName: string;
    time: string;
    activeIndex: number;
    className: string;
};

const SnippetItem: FC<SnippetProps> = ({ className, title, fileName, time }) => {
    return (
        <>
            <div className={`${className} py-2 px-3 text-sm text-slate-200 snippet-item`}>
                <h4 className="truncate">{title}</h4>
                <div className="flex justify-between text-slate-400 text-[11px]">
                    <span className="">{fileName}</span>
                    <span className="">{time}</span>
                </div>
            </div>
        </>
    );
}


export default SnippetItem;