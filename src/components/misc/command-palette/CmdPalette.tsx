import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// interface CmdPaletteProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

interface Command {
  name: string;
  description: string;
  action: () => void;
}

const CmdPalette: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [commands, setCommands] = useState<Command[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      //   event.preventDefault();

      //   console.log(event.code);
      if (event.ctrlKey && event.code === "KeyK") {
        event.preventDefault();
        setIsOpen(!isOpen);
      } else if (event.ctrlKey && event.code === "KeyP") {
        event.preventDefault();
        console.log("SHOULD PRINT");
      } else if (event.code === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={handleClose}
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-sm"
        style={{ zIndex: 1000 }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel
            as="div"
            className="w-[15rem] h-[10rem] bg-[#232526] border border-slate-700/50 rounded p-1 text-white text-sm"
          >
            <div className="flex p-0">
              <input
                type="text"
                className="form-input text-sm text-slate-400 bg-[#19191a] border border-slate-700/50 block w-full py-1 px-2 focus:ring-0 focus:border-slate-600 placeholder:text-slate-500/50 rounded"
                placeholder="Search command ..."
              />
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default CmdPalette;
