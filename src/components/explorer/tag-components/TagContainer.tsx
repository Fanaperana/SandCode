import {
  FC,
  useContext,
  useState,
  useEffect,
  ChangeEvent,
  BaseSyntheticEvent,
} from "react";
import { GoPlus, GoX, GoTag } from "react-icons/go";
import { ActiveContext } from "../contexts/ActiveContext";
import { invoke } from "@tauri-apps/api/tauri";
import { TagItem } from "./";
import { Modal } from "../../misc/";
import { ExplorerType } from "../types";

export const TagContainer: FC = () => {
  const tags = [
    {
      id: 1,
      name: "MySQL",
      color: "#913131",
    },
    {
      id: 2,
      name: "Cpp",
      color: "#3b9131",
    },
    {
      id: 3,
      name: "Python",
      color: "#317691",
    },
  ];

  const [hexIsValid, setHexIsValid] = useState(true);
  const [tagColor, setTagColor] = useState("#ffffff");
  const [tagName, setTagName] = useState("");
  const [refreshList, setRefreshList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const activeContext = useContext(ActiveContext);

  const handleActive = (id: number) => {
    activeContext?.setActive({ index: id, type: ExplorerType.TAG });
  };

  const handleCreateTag = () => {
    if (tagName) {
      invoke("plugin:folders|add_tag", {
        tag: { name: tagName },
      })
        .then(() => {
          setRefreshList((oldVal) => (oldVal = !refreshList));
        })
        .catch((e) => console.error(e))
        .finally(() => {
          setTagName("");
          setTagColor("#ffffff");
          setShowModal(false);
        });
    }
  };

  const handleInputColorHex = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.validity.patternMismatch);
    if (e.target.validity.patternMismatch) {
      setHexIsValid(false);
    } else {
      setHexIsValid(true);
    }
    setTagColor(e.target.value);
  };

  return (
    <details
      className="open:grow ease-in-out transition-all duration-200 open:mb-6"
      open
    >
      <summary className="cursor-pointer text-xs px-1 flex justify-between items-center hover:border-l-2 hover:border-orange-600/75 bg-[#313842] select-none">
        <div>Tags</div>
        <div className="flex gap-2 p-1 justify-center items-center">
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
            title="Add Tag"
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            btnFn={handleCreateTag}
          >
            <div className="mb-3">
              <h5 className="w-full mb-2 ">Tag name</h5>
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="form-input py-1 px-3 m-0 w-50 text-sm text-slate-200 bg-[#283131] border border-slate-700 rounded-sm inline-block focus:border-slate-700 focus:ring focus:ring-slate-800/60"
                  value={tagName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTagName(e.target.value)
                  }
                />
                <button
                  type="button"
                  className="absolute right-1 opacity-0 hover:opacity-100 transition-all p-[2px] border rounded-full border-slate-500 focus:bg-slate-700"
                  onClick={() => setTagName("")}
                >
                  <GoX />
                </button>
              </div>
            </div>
            <div>
              <h5 className="w-full mb-2">Pick color</h5>
              <div className="flex flex-row gap-2 relative">
                <GoTag
                  color={tagColor}
                  size="20"
                  className="absolute left-1 top-1"
                  // style={{
                  //     transform: "scale(-1, 1)",
                  // }}
                />
                <input
                  type="text"
                  value={tagColor}
                  pattern="^#([0-9a-f]{6})$"
                  className={`form-input py-0 pr-2 pl-7 m-0 text-sm bg-[#283131] border ${
                    hexIsValid
                      ? "border-slate-700 focus:border-green-700"
                      : "border-red-700 focus:border-red-700"
                  } rounded-sm focus:border-slate-700 focus:ring focus:ring-slate-800/60 w-full`}
                  placeholder="#rrggbb"
                  onChange={handleInputColorHex}
                />
                <input
                  type="color"
                  value={tagColor}
                  className="bg-slate-800/50 rounded p-[2px] w-[5rem] border border-slate-700 invalid:border-red-600"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setTagColor(e.target.value);
                    setHexIsValid(true);
                    // console.log(e.target.value);
                  }}
                />
              </div>
            </div>
          </Modal>
        </div>
      </summary>
      <div className="h-full overflow-y-auto min-h-20">
        <ul className="list-none text-slate-300 text-sm h-5 max-h-full">
          {tags.map((f) => (
            <li key={f.id} onClick={() => handleActive(f.id)}>
              <TagItem
                name={f.name}
                color={f.color}
                classStyle={`${
                  activeContext?.active.index === f.id &&
                  activeContext?.active.type === "tag"
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
