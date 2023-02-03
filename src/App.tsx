import { useState, FC, ChangeEvent } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Dialog, Transition } from "@headlessui/react";

import EditorRender from "./components/editor/EditorRender";
import SnippetContainer from "./components/snippets/SnippetContainer";
import ExplorerContainer from "./components/explorer/ExplorerContainer";
import Modal from "./components/misc/modal/Modal";
import CmdPalette from "./components/misc/command-palette/CmdPalette";

function App() {
  return (
    <>
      <div className="flex flex-row h-full dark:bg-[#2e313b] divide-x divide-slate-700">
        <ExplorerContainer />
        <SnippetContainer />
        <EditorRender />
      </div>
      <CmdPalette />
    </>
  );
}

export default App;
