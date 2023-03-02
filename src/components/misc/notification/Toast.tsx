import { FC, useState, useEffect, useContext } from "react";
import {
  GoIssueOpened,
  GoX,
  GoCheck,
  GoStop,
  GoInfo,
  GoLightBulb,
} from "react-icons/go";
import { ToastContext } from "./ToastContainer";
import { Transition } from "@headlessui/react";
import { MsgType } from "./ToastMain";

interface ToastProps {
  message?: string;
  msg_type?: MsgType | MsgType.NORMAL | string;
  duration?: number;
  onDelete: () => void;
}

export const Toast: FC<ToastProps> = ({
  message,
  msg_type,
  duration = 5000,
  onDelete,
}) => {
  const [show, setShow] = useState(true);
  const toastContext = useContext(ToastContext);
  const [progressBar, setProgressBar] = useState(100);

  const handleShow = () => {
    setShow(false);
  };

  const initProgressBar = () => {
    setProgressBar(0);
  };

  useEffect(() => {
    const initInterval = setTimeout(onDelete, duration);
    const initTimeout = setTimeout(initProgressBar, 100);

    setTimeout(handleShow, duration);

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(initInterval);
    };
  }, [duration, onDelete, toastContext, show]);

  return (
    <>
      <Transition
        show={show}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          id="pg-bar"
          className={`${
            msg_type === MsgType.ERROR
              ? "bg-red-700"
              : msg_type === MsgType.SUCCESS
              ? "bg-green-800"
              : msg_type === MsgType.INFO
              ? "bg-cyan-700"
              : msg_type === MsgType.NORMAL
              ? "bg-slate-700"
              : "bg-slate-700"
          } p-2 px-3 text-xs rounded-sm flex gap-3 max-w-[300px] min-w-[300px] h-10 items-center relative overflow-hidden`}
        >
          <div>
            {msg_type === MsgType.ERROR ? (
              <GoStop size="22" />
            ) : msg_type === MsgType.SUCCESS ? (
              <GoCheck size="22" />
            ) : msg_type === MsgType.INFO ? (
              <GoInfo size="22" />
            ) : msg_type === MsgType.NORMAL ? (
              <GoLightBulb size="22" fill="#f4df57" />
            ) : (
              <GoIssueOpened size="22" />
            )}
          </div>
          <div className="grow">{message}</div>
          <button
            className="p-1 border border-transparent hover:border-slate-300 rounded-full"
            onClick={onDelete}
          >
            <GoX size="15" />
          </button>

          <div
            className="absolute content-[' '] border-b bottom-0 left-0 h-full w-[100%]"
            style={{
              transition: `width ${duration - 250}ms linear`,
              width: `${progressBar}`,
            }}
          ></div>
        </div>
      </Transition>
    </>
  );
};
