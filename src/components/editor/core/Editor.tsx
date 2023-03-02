import { useState, FC, useCallback, useEffect, useContext } from "react";
import {
  loadLanguage,
  langNames,
  langs,
  LanguageName,
} from "@uiw/codemirror-extensions-langs";
import { LanguageContext } from "../context/EditorLanguage";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { EditorToolbar, EditorFooter } from "./";

interface EditorType {
  index: number;
}

export const Editor: FC<EditorType> = ({ index }) => {
  // useEffect(() => {
  //     console.log(index)
  // }, [])

  //   const arr = `[${langNames.map((e) => {
  //     return '\n\t{\n\t\tname: "' + e + '",\n\t\textension: []\n\t}';
  //   })}]`;

  const [editorValue, setEditorValue] = useState("");
  const onChange = useCallback((value: string) => {
    // console.log("value:", value);
  }, []);

  const [language, setLanguage] = useState<LanguageName | null>(null);

  const extensions: any[] = [
    oneDark,
    language ? loadLanguage(language) : null,
  ].filter(Boolean);

  return (
    <>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div className="relative border rounded-sm border-slate-700 my-3">
          <EditorToolbar index={index} />
          <div className="absolute z-50 text-xs bg-[#414851] px-2 m-1 right-0 cursor-pointer rounded-md opacity-0 hover:opacity-75 select-none ease-in transition">
            here
          </div>
          <CodeMirror
            className="focus:border focus:border-slate-500"
            value={editorValue}
            minWidth="0px"
            height="325px"
            extensions={extensions}
            onChange={onChange}
            theme="dark"
          />
          <EditorFooter />
        </div>
      </LanguageContext.Provider>
    </>
  );
};
