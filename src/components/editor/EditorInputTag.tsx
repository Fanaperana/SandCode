import { FC } from "react";

const EditorInputTag: FC = () => {
  return (
    <>
      <div className="flex gap-2 p-2">
        <span className="text-[10px] border rounded-lg px-2 py-[1px] text-[#e17c60] border-[#89280d]">
          Mysql <button className="ml-1 hover:text-slate-500">X</button>
        </span>
      </div>
      <div className="border-b border-[#2e3c3a]">
        <input
          type="text"
          className="form-input text-xs px-3 w-full text-slate-300 p-1 bg-[#101718] border-0 focus:ring-0 focus:ring-[#2e3c3a] focus:border-0"
          placeholder="Tag here..."
        />
      </div>
    </>
  );
};

export default EditorInputTag;
