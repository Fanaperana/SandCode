import { createContext, Dispatch, SetStateAction } from 'react';
import { LanguageName } from '@uiw/codemirror-extensions-langs';

export interface LanguageContextType {
    language: LanguageName | null;
    setLanguage: Dispatch<SetStateAction<LanguageName | null>>;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);