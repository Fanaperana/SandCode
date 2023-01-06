import { createContext, Dispatch, SetStateAction } from 'react';

export interface EditorIndexType {
    index: number;
}

export interface EditorIndexContextProps {
    editorIndex: EditorIndexType[];
    setEditorIndex: Dispatch<SetStateAction<EditorIndexType[]>>;
}

export const EditorIndexContext = createContext<EditorIndexContextProps|null>(null)