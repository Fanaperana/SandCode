import { title } from 'process';
import {FC} from 'react';

interface ModalProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    children?: JSX.Element[] | JSX.Element;
}

const Modal: FC<ModalProps> = ({title, isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <button
          className="absolute top-0 right-0 p-1 m-2 rounded-full bg-slate-300 hover:bg-slate-400"
          onClick={onClose}
        >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div>
            <h2 className="text-2xl font-bold mb-4">{title ? title : "Modal Title"}</h2>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
