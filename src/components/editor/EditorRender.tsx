import { useState, useEffect, FC } from "react";
import EditorInputTag from "./EditorInputTag";
import Editor from "./core/Editor";
import { EditorIndexContext, EditorIndexType } from "./context/EditorIndex";


const EditorRender: FC = () => {
    
    
    let initIndex: EditorIndexType[] = [{
        index: Date.now()
    }]

    const [editorIndex, setEditorIndex] = useState(initIndex);

    // useEffect(() => {

    //     console.log("First")
    // }, [editorIndex.length])
    
    return (
        <>
            <EditorIndexContext.Provider value={{editorIndex, setEditorIndex}}>
                <div className="grow text-slate-200 bg-[#1e2625] min-w-[360px] h-full">
                    <div className="flex flex-col w-full h-full">
                        <div className="divide-y divide-slate-700/70">
                            <div className="flex justify-between p-3">
                                <div className="">
                                    <h3 className="text-slate-400">Vue Application Modal Creation</h3>
                                </div>
                                <div>
                                    <button>eye</button>
                                    <button>eye</button>
                                    <button>eye</button>
                                </div>
                            </div>
                            <div>
                                <EditorInputTag />
                            </div>
                        </div>
                        <div className="grow h-full p-3 overflow-y-auto">
                            {
                                editorIndex.map((d) => (
                                    <Editor key={d.index} index={d.index} />
                                ))
                            }
                            <button className="text-sm px-3 py-1 border text-slate-400 rounded-sm border-slate-700 hover:bg-green-500/50 hover:text-white" onClick={() => setEditorIndex([...editorIndex, { index: Date.now()}])}>New</button>
                        </div>
                        <div className="bg-[#323534] text-xs p-1 text-slate-400">
                            <span>Snippet count: 0 </span>
                        </div>
                    </div>
                </div>
            </EditorIndexContext.Provider>
        </>
    );
}
export default EditorRender;