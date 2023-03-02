import { useState, FC, ChangeEvent, useContext } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Dialog, Transition } from "@headlessui/react";

import { EditorRender } from "./components/editor";
import { SnippetContainer } from "./components/snippets";
import { ExplorerContainer } from "./components/explorer";
import { Modal } from "./components/misc/modal";
import { CmdPalette } from "./components/misc";
import { ActiveContext } from "./components/explorer/contexts/ActiveContext";
import { ActiveType, ExplorerType } from "./components/explorer/types/Active";
import { MainContext, MainContainer } from "./components/context/MainContext";
import ToastContainer from "./components/misc/notification/ToastContainer";

function App() {
  /**
   * Set the default selected index:
   * 1: All Snippets
   * 2: Uncategorized
   * 3: Other Categories
   */
  const toActive: ActiveType = {
    index: 1,
    type: ExplorerType.FAVORITE,
  };

  const [active, setActive] = useState<ActiveType>(toActive);
  const mainContext = useContext(MainContext);

  return (
    <>
      <MainContainer>
        <div className="flex flex-row h-full dark:bg-[#2e313b] divide-x divide-slate-700">
          <ExplorerContainer />
          <SnippetContainer />
          <EditorRender />
        </div>
        <CmdPalette />
        <ToastContainer />
      </MainContainer>
    </>
  );
}

export default App;
