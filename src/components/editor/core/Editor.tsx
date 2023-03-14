import {
  useState,
  FC,
  useCallback,
  useEffect,
  useContext,
  FocusEvent,
} from "react";
import {
  loadLanguage,
  langNames,
  langs,
  LanguageName,
} from "@uiw/codemirror-extensions-langs";
import { EditorContext } from "../context/EditorContext";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { EditorToolbar, EditorFooter } from "./";
// import * as events from "@uiw/codemirror-extensions-events";
// import { uuid } from "../lib";

interface EditorTypeProps {
  index: string;
  title?: string;
  value?: string;
  isUpdate?: boolean;
  isEditable?: boolean;
  lang?: LanguageName | null;
}

export const Editor: FC<EditorTypeProps> = ({
  index,
  value = "",
  title = "",
  isEditable = true,
  isUpdate = false,
  lang = null,
}) => {
  const [editorValue, setEditorValue] = useState(value);
  const [titleValue, setTitleValue] = useState(title);
  const onChange = useCallback((value: string) => {
    setEditorValue(value);
  }, []);

  const [language, setLanguage] = useState<LanguageName | null>(lang);
  // const eventExtension = events.content({
  //   blur: (event: any) => {
  //     const data: FocusEvent<HTMLDivElement> = event;
  //     const content = data.currentTarget.innerText as string;
  //     console.log("HEllo");
  //     setEditorValue(content);
  //   },
  // });

  const extensions: any[] = [
    oneDark,
    // eventExtension,
    language ? loadLanguage(language) : null,
  ].filter(Boolean);

  return (
    <>
      <EditorContext.Provider
        value={{
          isUpdate,
          isEditable,
          editorData: { index: index, title: titleValue, value: editorValue },
          language,
          setLanguage,
          setTitleValue,
          setEditorValue,
        }}
      >
        <div className="relative border rounded-sm border-slate-700 my-3">
          <EditorToolbar index={index} title={titleValue} />
          <div className="absolute z-50 text-xs bg-[#414851] px-2 m-1 right-0 cursor-pointer rounded-md opacity-0 hover:opacity-75 select-none ease-in transition">
            here
          </div>
          <CodeMirror
            className="focus:border focus:border-slate-500"
            theme="dark"
            minWidth="0px"
            height={isEditable ? "325px" : "auto"}
            value={editorValue}
            extensions={extensions}
            onChange={onChange}
            editable={isEditable}
          />
          <EditorFooter />
        </div>
      </EditorContext.Provider>
    </>
  );
};
