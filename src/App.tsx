import { useState, FC, ChangeEvent } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Interface } from "readline";
import EditorRender from "./components/editor/EditorRender";
import SnippetItems from "./components/snippets/SnippetItems";
import ExplorerContainer from "./components/explorer/ExplorerContainer";
import Modal from "./components/misc/modal/Modal";



function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div className="flex flex-row h-full dark:bg-[#2e313b]">
      <button onClick={() => setIsModalOpen(true)}>Open modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
          <h2 className="text-2xl font-bold mb-4">Modal title</h2>
          <p className="text-gray-700 mb-4">Modal content goes here</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
    </>
  );
}

export default App;
