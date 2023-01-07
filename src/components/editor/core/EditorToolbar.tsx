import { FC, useContext, useEffect, ReactNode, useCallback } from "react";
import { GoTrashcan } from "react-icons/go";
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import { EditorIndexContext, EditorIndexType } from "../context/EditorIndex";


interface EditorToolbarType {
    index: number;
}

const EditorToolbar: FC<EditorToolbarType> = ({ index }) => {
    
    const IndexContext = useContext(EditorIndexContext);

    const handleDiscard = () => {
        IndexContext?.setEditorIndex(IndexContext?.editorIndex.filter(d => d.index !== index))
    }

    return (
        <div className="flex justify-between p-2 bg-[#2d333b] border-b border-[#444c55]">
            <div className="flex">
                <input 
                    type="text"
                    className="form-input px-2 w-[200px] text-xs bg-[#22272e] border-[#444c56] rounded-sm focus:border-slate-500 focus:ring-1 focus:ring-[#444c56]"
                    placeholder="Filename including extension..."
                    />
                { (IndexContext?.editorIndex?.length !== 1) ?
                    (
                        <button
                            onClick={handleDiscard}
                            className="text-[#e5534b] bg-[#373e47] border border-slate-600 rounded-r-md px-2 hover:bg-[#bd3f38] hover:text-slate-100">
                            <GoTrashcan size=""/>
                        </button>
                    )
                :
                    (<></>)
                }
            </div>
            <div>
                <select v-model="indent_size" name="" id="" className="form-select pr-3 pl-0 w-[70px] text-xs text-center bg-[#22272e] border-[#444c56] rounded-md focus:border-slate-500 focus:ring-1 focus:ring-[#444c56]">
                    <option disabled value="" className="disabled:font-bold disabled:text-[#b3b3b3] selection:bg-transparent border-b">Indent Size</option>
                    {
                        [2, 4, 8].map((d, i) => (
                            <option key={i} value={d}>
                                {d}
                            </option>
                        ))
                    }
                    
                </select>
            </div>
        </div>
    )
}

export default EditorToolbar;