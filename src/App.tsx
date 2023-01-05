import { useState, FC, ChangeEvent } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Interface } from "readline";
import EditorRender from "./components/editor/EditorRender";
import SnippetContainer from "./components/snippets/SnippetContainer";
import ExplorerContainer from "./components/explorer/ExplorerContainer";
import Modal from "./components/misc/modal/Modal";

function App() {

  return (
    <>
      <div className="flex flex-row h-full dark:bg-[#2e313b] divide-x divide-slate-700">
        <ExplorerContainer />
        <SnippetContainer />
        <EditorRender />
      </div>
    </>
  );
}

export default App;
