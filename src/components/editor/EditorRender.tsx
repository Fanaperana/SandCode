import { useState, useEffect, FC } from "react";
import Editor from "./core/Editor";
import EditorHeader from "./EditorHeader";
import { EditorIndexContext, EditorIndexType } from "./context/EditorIndex";

const EditorRender: FC = () => {
  let initIndex: EditorIndexType[] = [
    {
      index: Date.now(),
    },
  ];

  const [editorIndex, setEditorIndex] = useState(initIndex);

  // useEffect(() => {

  //     console.log("First")
  // }, [editorIndex.length])

  return (
    <>
      <EditorIndexContext.Provider value={{ editorIndex, setEditorIndex }}>
        <div className="grow text-slate-200 bg-[#1e2625] min-w-[360px] h-full">
          <div className="flex flex-col w-full h-full">
            <div>
              <EditorHeader />
            </div>
            <div className="grow h-full p-3 overflow-y-auto">
              {editorIndex.map((d) => (
                <Editor key={d.index} index={d.index} />
              ))}
              <button
                className="text-sm px-3 py-1 border text-slate-400 rounded-sm border-slate-700 hover:bg-green-500/50 hover:text-white"
                onClick={() =>
                  setEditorIndex([...editorIndex, { index: Date.now() }])
                }
              >
                New
              </button>
            </div>
            <div className="bg-[#323534] text-xs p-1 text-slate-400">
              <span>Snippet count: 0 </span>
            </div>
          </div>
        </div>
      </EditorIndexContext.Provider>
    </>
  );
};
export default EditorRender;
