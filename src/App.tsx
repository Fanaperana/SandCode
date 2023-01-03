import { useState, FC, ChangeEvent } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Interface } from "readline";
import EditorRender from "./components/editor/EditorRender";
import SnippetItems from "./components/snippets/SnippetItems";
import ExplorerContainer from "./components/explorer/ExplorerContainer";
import Modal from "./components/misc/modal/Modal";

function App() {

  return (
    <>
      <div className="flex flex-row h-full dark:bg-[#2e313b]">
        <ExplorerContainer />
        <SnippetItems />
      </div>
    </>
  );
}

export default App;
