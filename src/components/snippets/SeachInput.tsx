import { useState, FC } from 'react';

const SeachInput: FC = () => {
    return (
        <>
            <div className="flex p-2">
                <input type="search" className="form-input text-slate-300 bg-[#2e313b] border-0 focus:ring-1 focus:ring-slate-500 w-full placeholder:font-medium placeholder:text-slate-600" placeholder="Search..." />
                <button className="text-slate-300 p-1 border border-[#3c3a3a] bg-[#374146] hover:bg-[#4e5c62]">+</button>
            </div>
        </>
    );
}

export default SeachInput;
