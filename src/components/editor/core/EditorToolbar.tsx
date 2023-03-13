import {
  FC,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  FocusEvent,
  ReactNode,
  useCallback,
} from "react";
import { GoTrashcan } from "react-icons/go";
import {
  HiOutlineCubeTransparent,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import { FiEdit3 } from "react-icons/fi";
import {
  //   loadLanguage,
  //   langNames,
  //   langs,
  LanguageName,
} from "@uiw/codemirror-extensions-langs";
import { EditorContext } from "../context";
import { EditorIndexContext, EditorIndexType } from "../context";
import * as langext from "../lib/languages";

interface EditorToolbarType {
  index: string;
  title: string;
}

export const EditorToolbar: FC<EditorToolbarType> = ({ index, title }) => {
  const editorContext = useContext(EditorContext);
  const IndexContext = useContext(EditorIndexContext);
  const [fileName, setFileName] = useState("");

  const setFileExtension = useCallback(
    (_file: string) => {
      if (_file.length) {
        const fileExtension: string = _file
          .toLowerCase()
          .slice(_file.lastIndexOf("."));
        langext.default.map((l) => {
          if (l.extension.includes(fileExtension)) {
            editorContext?.setLanguage(l.name as LanguageName);
          }
        });
      } else {
        editorContext?.setLanguage("plain/text" as LanguageName);
      }
    },
    [fileName]
  );

  /**
   * Delete current editor based on index Date.now()
   */
  const handleDiscard = () => {
    console.log(IndexContext?.editorIndex);
    IndexContext?.setEditorIndex(
      IndexContext?.editorIndex.filter((d) => d.index !== index)
    );
  };

  const handleFileName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value as string);
    setFileExtension(event.target.value as string);
  }, []);

  //   const handleFileNameBlur = useCallback(
  //     (event: FocusEvent<HTMLInputElement>) => {
  //       setFileExtension(event.target.value as string);
  //     },
  //     []
  //   );

  return (
    <div className="flex justify-between p-2 bg-[#2d333b] border-b border-[#444c55]">
      {editorContext?.isEditable ? (
        <div className="flex">
          <input
            type="text"
            className="form-input px-2 w-[200px] text-xs bg-[#22272e] border-[#444c56] rounded-sm focus:border-slate-500 focus:ring-1 focus:ring-[#444c56]"
            placeholder="Filename including extension..."
            value={fileName}
            onChange={handleFileName}
            //   onBlur={handleFileNameBlur}
          />
          {IndexContext?.editorIndex?.length !== 1 ? (
            <button
              onClick={handleDiscard}
              className="text-[#e5534b] bg-[#373e47] border border-slate-600 rounded-r-md px-2 hover:bg-[#bd3f38] hover:text-slate-100"
            >
              <GoTrashcan size="" />
            </button>
          ) : null}
        </div>
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <HiOutlineCubeTransparent size={19} />
          <div className="text-xs text-blue-400">
            {title.length ? title : "new_file"}
          </div>
        </div>
      )}
      <div>
        {editorContext?.isEditable ? (
          <select className="form-select pr-3 pl-0 w-[70px] text-xs text-center bg-[#22272e] border-[#444c56] rounded-md focus:border-slate-500 focus:ring-1 focus:ring-[#444c56]">
            <option
              disabled
              value=""
              className="disabled:font-bold disabled:text-[#b3b3b3] selection:bg-transparent border-b"
            >
              Indent Size
            </option>
            {[2, 4, 8].map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        ) : (
          <div className="flex gap-2 items-center justify-center text-slate-500">
            <FiEdit3 className="hover:text-slate-300" title="Edit" />
            <HiOutlineArrowDownTray
              className="hover:text-slate-300"
              title="Download"
            />
          </div>
        )}
      </div>
    </div>
  );
};
