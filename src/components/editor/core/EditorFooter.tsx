import { FC, ChangeEvent, useContext, useState, useEffect } from "react";
import { langNames, LanguageName } from "@uiw/codemirror-extensions-langs";
import { LanguageContext } from "../context";
export const EditorFooter: FC = () => {
  const LangContext = useContext(LanguageContext);
  const [selectedLang, setSelectedLang] = useState("plain/text");

  useEffect(() => {
    if (LangContext?.language) {
      setSelectedLang(LangContext?.language);
    }
  }, [LangContext]);

  const handleLang = (event: ChangeEvent<HTMLSelectElement>) => {
    LangContext?.setLanguage(event.target.value as LanguageName);
    setSelectedLang(event.target.value as LanguageName);
  };

  const allLang = langNames.map((lang) => (
    <option key={lang} value={lang}>
      {lang}
    </option>
  ));

  return (
    <>
      <div className="flex justify-between w-full bg-[#394049] text-sm text-slate-400 p-1">
        <div className="">
          <span>Lang:</span>
          <select
            value={selectedLang ? selectedLang : "plain/text"}
            onChange={handleLang}
            className="form-select text-xs py-0 px-1 bg-[#394049] border-slate-600/50 mx-2"
          >
            <option value={"plain/text"}>plain/text</option>
            {allLang}
          </select>
        </div>
        <div>
          <button className="px-2 text-slate-200 border rounded-sm border-slate-600 hover:bg-[#485059]">
            Save
          </button>
        </div>
      </div>
    </>
  );
};
