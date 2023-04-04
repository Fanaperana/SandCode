import {
  FC,
  useContext,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";
import { GoPlus, GoX, GoSync } from "react-icons/go";
import { FolderItem } from "./FolderItem";
import { Modal } from "../../misc/";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import { ExplorerType } from "../types/Active";
import { useAppSelector, useAppDispatch } from "../../../hook";
import { explorerIndex } from "../../../slice";

interface Folder {
  id: number;
  name: string;
}

export const FolderContainer: FC = () => {
  const [folders, setFolders] = useState([{ id: 0, name: "Empty" } as Folder]);
  const [refreshList, setRefreshList] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const index = useAppSelector((state) => state.explorer.explorerIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    listen("Toast", (event) => {
      console.log(event.payload);
    });

    invoke("plugin:folders|fetch_all")
      .then((res) => {
        const foldersList = res as Folder[];
        if (foldersList.length) {
          setFolders(foldersList);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setFolderName("");
        setShowModal(false);
      });
  }, [refreshList]);

  const handleActive = (id: number | undefined) => {
    if (id) {
      dispatch(explorerIndex({ index: id, type: ExplorerType.FOLDER }));
    }
  };

  const handleCreateFolder = () => {
    if (folderName) {
      invoke("plugin:folders|add_folder", {
        folder: { name: folderName },
      })
        .then(() => {
          setRefreshList((oldVal) => (oldVal = !refreshList));
        })
        .catch((e) => console.error(e))
        .finally(() => {
          setFolderName("");
          setShowModal(false);
        });
    }
  };

  return (
    <details
      className="open:grow ease-in-out transition-all duration-200 open:mb-6"
      open
    >
      <summary className="cursor-pointer text-xs px-1 flex justify-between items-center hover:border-l-2 hover:border-orange-600/75 bg-[#313842] select-none">
        <div>Folders</div>
        <div className="flex gap-2 p-1 justify-center items-center">
          <button
            className="hover:text-slate-400 text-slate-500"
            onClick={() => setRefreshList((e) => (e = !refreshList))}
          >
            <GoSync
              className=" rounded-full border border-slate-500 hover:border-slate-400"
              size="15"
            />
          </button>
          <button
            className="hover:text-slate-400 text-slate-500"
            onClick={() => setShowModal(true)}
          >
            <GoPlus
              className=" rounded-full border border-slate-500 hover:border-slate-400"
              size="15"
            />
          </button>

          <Modal
            title="Add Folder"
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            btnFn={handleCreateFolder}
          >
            <h5 className="w-full mb-2 ">Folder name</h5>
            <div className="relative flex items-center">
              <input
                type="text"
                className="form-input py-1 px-3 m-0 w-50 text-sm text-slate-200 bg-[#283131] border border-slate-700 rounded-sm inline-block focus:border-slate-700 focus:ring focus:ring-slate-800/60"
                value={folderName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFolderName(e.target.value)
                }
              />
              <button
                type="button"
                className="absolute right-1 opacity-0 hover:opacity-100 transition-all p-[2px] border rounded-full border-slate-500 focus:bg-slate-700"
                onClick={() => setFolderName("")}
              >
                <GoX />
              </button>
            </div>
          </Modal>
        </div>
      </summary>
      <div className="h-full overflow-y-auto min-h-20">
        <ul className="list-none text-slate-300 text-sm h-5 max-h-full">
          {folders.map((f) => (
            <li key={f.id} onClick={() => handleActive(f.id)}>
              <FolderItem
                name={f.name}
                index={f.id}
                classStyle={`${
                  index.index === f.id && index.type === "folder"
                    ? "active"
                    : ""
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
};
