import { Editor, EditorHeader } from "./";
import { useState, useEffect, FC, useContext, useMemo } from "react";
import { EditorIndexContext, EditorIndexType } from "./context";
import { uuid } from "./lib";
import { invoke } from "@tauri-apps/api/tauri";
import { LanguageName } from "@uiw/codemirror-extensions-langs";
import { useAppDispatch, useAppSelector } from "./../../hook/core";

interface EditorResType {
  id: number;
  name: string;
  content: string;
  lang_type: LanguageName | string | "plain/text";
}

export const EditorRender: FC = () => {
  let initIndex: EditorIndexType[] = [
    {
      index: uuid(),
    },
  ];

  // const dispatch = useAppDispatch();
  // const eIndex = useAppSelector((state) => state.explorer.explorerIndex);
  const { snippetId } = useAppSelector((state) => state.snippet);

  const [editorIndex, setEditorIndex] = useState(initIndex);
  const [editorList, setEditorList] = useState<Array<EditorResType>>([]);
  const [refreshListEditor, setRefreshListEditor] = useState(false);

  useEffect(() => {
    if (snippetId) {
      invoke("plugin:codes|fetch_codes", {
        sniptId: snippetId,
      })
        .then((res) => {
          const data: Array<EditorResType> = res as Array<EditorResType>;
          setEditorList(data);
        })
        .catch((e) => console.error(e));
    }
  }, [snippetId, refreshListEditor]);

  const memoizedEditors = useMemo(
    () =>
      editorList.map((item) => (
        <Editor
          key={item.id}
          index={item.id.toString()}
          isEditable={false}
          isUpdate={false}
          value={item.content}
          lang={item.lang_type as LanguageName}
          title={item.name}
        />
      )),
    [editorList]
  );

  return (
    <>
      <EditorIndexContext.Provider
        value={{
          editorIndex,
          setEditorIndex,
          refreshListEditor,
          setRefreshListEditor,
        }}
      >
        <div className="grow text-slate-200 bg-[#101718] min-w-[360px] h-full">
          <div className="flex flex-col w-full h-full">
            <div>
              <EditorHeader />
            </div>
            {/* START EDITOR */}
            <div className="grow h-full p-3 overflow-y-auto">
              {memoizedEditors}

              {editorList.length >0 && (
                <div className="text-xs my-5 relative h-1 w-full after:absolute after:left-[45%] after:right-[45%] after:content-['Editor'] after:-top-2 after:bg-gradient-to-r after:from-[#101718] after:via-[#101718] after:to-[#101718] after:px-3 after:text-center after:border-x-2 after:border-slate-700 after:font-mono after:text-slate-500 after:tracking-wide after:rounded-3xl after:min-w-[80px] after:max-w-[80px]">
                  <hr className="border-0 h-[3px] bg-gradient-to-r from-slate-800/10 via-slate-600 to-slate-800/10 relative after:content['Editor'] after:absolute after:top-0 after:text-white" />
                </div>
              )}

              {editorIndex.map((d) => (
                <Editor key={d.index} index={d.index} />
              ))}
              <button
                className="text-sm px-3 py-1 border text-slate-400 rounded-sm border-slate-700 hover:bg-green-500/50 hover:text-white"
                onClick={() =>
                  setEditorIndex([...editorIndex, { index: uuid() }])
                }
              >
                New
              </button>
            </div>
            {/* END EDITOR */}
            <div className="bg-[#000000] text-xs p-1 px-4 text-slate-400 border-t border-slate-800">
              <span>Snippet count: {editorIndex.length} </span>
            </div>
          </div>
        </div>
      </EditorIndexContext.Provider>
    </>
  );
};
