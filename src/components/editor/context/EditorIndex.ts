import { createContext, Dispatch, SetStateAction } from 'react';

export interface EditorIndexType {
    index: string;
}

export interface EditorIndexContextProps {
    editorIndex: EditorIndexType[];
    setEditorIndex: Dispatch<SetStateAction<EditorIndexType[]>>;
}

export const EditorIndexContext = createContext<EditorIndexContextProps|null>(null)