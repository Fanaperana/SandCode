import { useState, FC, useCallback, useEffect, useContext } from "react";
import { loadLanguage, langNames, langs, LanguageName } from '@uiw/codemirror-extensions-langs';
import { LanguageContext } from "../context/EditorLanguage";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from '@uiw/react-codemirror';
import EditorToolbar from "./EditorToolbar";
import EditorFooter from "./EditorFooter";

interface EditorType {
    index: number;
}

const Editor: FC<EditorType> = ({ index }) => {
    useEffect(() => {
        console.log(index)
    }, [])


    const onChange = useCallback((value: string) => {
        console.log('value:', value);
    }, []);
    
    const [language, setLanguage] = useState<LanguageName | null>(null);
    
    const extensions : any[] = [
        oneDark,
        language ? loadLanguage(language) : null
    ].filter(Boolean);

    return (
        <>
            <LanguageContext.Provider
                value={{ language, setLanguage }}
                >
                <div className="border rounded-sm border-slate-700 my-3">
                    <EditorToolbar index={index} />
                    <CodeMirror
                        className="focus:border focus:border-slate-500"
                        value=""
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
}
export default Editor;