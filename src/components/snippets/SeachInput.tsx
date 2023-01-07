import { useState, FC } from 'react';
import { GoPlus } from "react-icons/go";

const SeachInput: FC = () => {
    return (
        <>
            <div className="flex p-1">
                <input type="search" className="form-input text-sm text-slate-300 bg-[#2e313b] border-0 focus:ring-0 w-full placeholder:font-medium placeholder:text-slate-600" placeholder="Search..." />
                <button className="text-slate-300 px-2 my-2 py-0 rounded hover:bg-[#374146]">
                    <GoPlus />
                </button>
            </div>
        </>
    );
}

export default SeachInput;
