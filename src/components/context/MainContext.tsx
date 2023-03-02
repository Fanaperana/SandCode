import { createContext, Dispatch, SetStateAction, FC, useState } from "react";

export interface ExplorerDataType {
  index: number;
  type: "folder" | "favorite" | "tag";
}

export interface SnippetDataType {
  // editor: EditorDataType;
  snippet_id: number;
}

// export interface EditorDataType {
//   snippet: SnippetDataType;
//   index: number;
// }

export interface MainDataType {
  explorer: ExplorerDataType | null;
  setExplorer: Dispatch<SetStateAction<ExplorerDataType>>;
  snippet: SnippetDataType | null;
  setSnippet: Dispatch<SetStateAction<SnippetDataType>>;
//   editor: EditorDataType | null;
//   setEditor: Dispatch<SetStateAction<EditorDataType>>;
}

export const MainContext = createContext<MainDataType | null>(null);

export interface MainContainerProps {
  children?: JSX.Element[] | JSX.Element;
}

export const MainContainer: FC<MainContainerProps> = ({ children }) => {
  const [explorer, setExplorer] = useState<ExplorerDataType>({
    index: 1,
    type: "favorite",
  });

  const [snippet, setSnippet] = useState<SnippetDataType>({
    snippet_id: 0,
  });

//   const [editor, setEditor] = useState<EditorDataType>({
//     index: 0,
//   });

  return (
    <MainContext.Provider
      value={{
        explorer,
        setExplorer,
        snippet,
        setSnippet,
        // editor,
        // setEditor,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

// export default MainContainer;
