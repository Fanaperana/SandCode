import { createContext, Dispatch, SetStateAction } from 'react';
import { LanguageName } from '@uiw/codemirror-extensions-langs';


export interface EditorData {
    index: string;
    value: string;
}
export interface EditorContextType {
    isUpdate: boolean;
    isEditable: boolean;
    editorData: EditorData;
    language: LanguageName | null;
    setLanguage: Dispatch<SetStateAction<LanguageName | null>>;
}

export const EditorContext = createContext<EditorContextType | null>(null);