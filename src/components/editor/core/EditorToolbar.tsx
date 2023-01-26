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
  //   loadLanguage,
  //   langNames,
  //   langs,
  LanguageName,
} from "@uiw/codemirror-extensions-langs";
import { LanguageContext } from "../context/EditorLanguage";
import { EditorIndexContext, EditorIndexType } from "../context/EditorIndex";
import * as langext from "../lib/languages";

interface EditorToolbarType {
  index: number;
}

const EditorToolbar: FC<EditorToolbarType> = ({ index }) => {
  const langContext = useContext(LanguageContext);
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
            langContext?.setLanguage(l.name as LanguageName);
          }
        });
      } else {
        langContext?.setLanguage("plain/text" as LanguageName);
      }
    },
    [fileName]
  );

  const handleDiscard = useCallback(() => {
    IndexContext?.setEditorIndex(
      IndexContext?.editorIndex.filter((d) => d.index !== index)
    );
  }, []);

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
        ) : (
          <></>
        )}
      </div>
      <div>
        <select
          v-model="indent_size"
          name=""
          id=""
          className="form-select pr-3 pl-0 w-[70px] text-xs text-center bg-[#22272e] border-[#444c56] rounded-md focus:border-slate-500 focus:ring-1 focus:ring-[#444c56]"
        >
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
      </div>
    </div>
  );
};

export default EditorToolbar;
