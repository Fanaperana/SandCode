import { useState, FC, ChangeEvent, useContext } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Dialog, Transition } from "@headlessui/react";

import EditorRender from "./components/editor/EditorRender";
import SnippetContainer from "./components/snippets/SnippetContainer";
import ExplorerContainer from "./components/explorer/ExplorerContainer";
import Modal from "./components/misc/modal/Modal";
import CmdPalette from "./components/misc/command-palette/CmdPalette";
import { ActiveContext } from "./components/explorer/contexts/ActiveContext";
import { ActiveType } from "./components/explorer/types/Active";
import { MainContext, MainContainer } from "./components/context/MainContext";
import ToastContainer from "./components/misc/notification/ToastContainer";

function App() {
  const toActive: ActiveType = {
    index: 1,
    type: "favorite",
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
