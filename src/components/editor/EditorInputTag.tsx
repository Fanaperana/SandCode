import { FC } from "react";



const EditorInputTag: FC = () => {
    return (
        <>
            <div className="flex gap-2 p-2">
                <span className="text-[10px] border rounded-lg px-2 py-[1px]">Mysql <button className="ml-1 hover:text-slate-500">X</button></span>
            </div>
            <div className="border-b border-[#2e3c3a]">
                <input type="text" className="form-input text-xs px-3 w-full text-slate-300 p-1 bg-[#1e2625] border-0 focus:ring-0 focus:ring-[#2e3c3a] focus:border-0" placeholder="Tag here..." />
            </div>
        </>
    )
}

export default EditorInputTag;