import { Editor, EditorHeader } from "./";
import { useState, useEffect, FC } from "react";
import { EditorIndexContext, EditorIndexType } from "./context";

export const EditorRender: FC = () => {
  let initIndex: EditorIndexType[] = [
    {
      index: Date.now(),
    },
  ];

  const [editorIndex, setEditorIndex] = useState(initIndex);

  useEffect(() => {
    console.log(editorIndex);
  }, [editorIndex]);
  return (
    <>
      <EditorIndexContext.Provider value={{ editorIndex, setEditorIndex }}>
        <div className="grow text-slate-200 bg-[#101718] min-w-[360px] h-full">
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
            <div className="bg-[#000000] text-xs p-1 px-4 text-slate-400 border-t border-slate-800">
              <span>Snippet count: {editorIndex.length} </span>
            </div>
          </div>
        </div>
      </EditorIndexContext.Provider>
    </>
  );
};
