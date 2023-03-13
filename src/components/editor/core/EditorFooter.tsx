import { FC, ChangeEvent, useContext, useState, useEffect } from "react";
import { langNames, LanguageName } from "@uiw/codemirror-extensions-langs";
import { EditorContext } from "../context";
import { HiCodeBracket } from "react-icons/hi2";

export const EditorFooter: FC = () => {
  const editorContext = useContext(EditorContext);
  const [selectedLang, setSelectedLang] = useState("plain/text");

  useEffect(() => {
    if (editorContext?.language) {
      setSelectedLang(editorContext?.language);
    }
  }, [editorContext]);

  const handleLang = (event: ChangeEvent<HTMLSelectElement>) => {
    editorContext?.setLanguage(event.target.value as LanguageName);
    setSelectedLang(event.target.value as LanguageName);
  };

  const allLang = langNames.map((lang) => (
    <option key={lang} value={lang}>
      {lang}
    </option>
  ));

  return (
    <>
      <div className="flex justify-between items-center w-full bg-[#394049] text-sm text-slate-400 p-1">
        <div className="flex items-center gap-2">
          {editorContext?.isEditable ? (
            <div className="flex gap-1 items-center pl-2 pr-0 py-[2px] bg-[#2b2b2b] rounded-sm border-[#000]">
              <HiCodeBracket className="text-[#ebc91c]" />
              <select
                id="language_select"
                value={selectedLang ? selectedLang : "plain/text"}
                onChange={handleLang}
                className="form-select text-xs py-0 pl-2 pr-3 bg-[#2b2b2b] border-0 mx-1 rounded-sm focus:ring-2 focus:ring-[#794712]"
              >
                <option value={"plain/text"}>plain/text</option>
                {allLang}
              </select>
            </div>
          ) : (
            <div className="flex gap-2 items-center px-2 py-[1px] bg-[#2b2b2b] rounded-sm border-[#000]">
              <HiCodeBracket className="text-[#ebc91c]" />
              <span className="text-xs">{editorContext?.language}</span>
            </div>
          )}
        </div>
        <div>
          {editorContext?.isEditable ? (
            <button className="px-2 text-slate-200 border rounded-sm border-slate-600 hover:bg-[#485059]">
              Save
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};
