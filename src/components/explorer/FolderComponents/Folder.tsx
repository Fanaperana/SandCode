import { useState, FC } from "react";
import { GoFileDirectory } from "react-icons/go";

interface Props {
    name?: string;
}


const Folder : FC<Props> = ({name}) => {
    return (
        <div
            className="flex gap-1 m-1"
        >
            <GoFileDirectory className="text-slate-400" size="19" />
            <span className="px-1 text-[14px] text-slate-200">{ name }</span>
        </div>
    );
}

export default Folder;