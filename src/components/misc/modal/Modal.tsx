import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: JSX.Element[] | JSX.Element;
}

const Modal: FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={onClose}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[1000] backdrop-blur-sm"
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
            className="bg-[#191919] shadow-xl border border-slate-500 text-slate-400 text-xs"
          >
            <button
              className="absolute top-0 right-0 p-1 m-2 rounded-full border text-slate-800 border-slate-500 bg-[#ffffff] hover:bg-[#c7c7c7]"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                fill="white"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="w-[15rem] h-[10rem] flex flex-col">
              <Dialog.Title
                as="div"
                className="bg-[#283131] text-sm font-bold p-1 px-2 w-full border-b border-slate-700"
              >
                {title ? title : "Modal Title"}
              </Dialog.Title>
              <div className="p-2 grow">
                <div>
                  <span>Body in here</span>
                  {children}
                </div>
              </div>
              <div className="p-2 border-t border-slate-800 flex justify-end gap-2">
                <button
                  className="bg-[#242526] text-white border px-2 py-1 rounded-sm border-slate-700 hover:bg-[#0f1010]"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button className="bg-[#387d3d] text-white border px-2 py-1 rounded-sm border-slate-700 hover:bg-[#2b602e]">
                  Create
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
