import { useState, FC } from "react";
import { GoPlus, GoSearch } from "react-icons/go";

const SeachInput: FC = () => {
  return (
    <>
      <div className="flex p-1 justify-center items-center bg-[#101718]">
        <GoSearch size="25" className="text-slate-400 ml-2" />
        <input
          type="search"
          className="form-input text-sm text-slate-300 bg-[#101718] border-0 focus:ring-0 w-full placeholder:font-medium placeholder:text-slate-600 my-[2.75px]"
          placeholder="Search..."
        />
        <button className="text-slate-300 px-2 my-2 py-1 rounded hover:bg-[#374146]">
          <GoPlus />
        </button>
      </div>
    </>
  );
};

export default SeachInput;
