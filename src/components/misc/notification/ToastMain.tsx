import { Dispatch, SetStateAction } from "react";
import { emit } from "@tauri-apps/api/event";

export enum MsgType {
  INFO = "info",
  ERROR = "error",
  NORMAL = "normal",
  SUCCESS = "success",
}

export interface ToastType {
  message?: string;
  msg_type?: MsgType | MsgType.NORMAL;
}

export interface ToastContextType {
  stackMessages: ToastType[];
  setStackMessages: Dispatch<SetStateAction<ToastType[]>>;
}

export const Notify = async (msg_type: MsgType, message: string) => {
  const payload: ToastType = {
    msg_type: msg_type,
    message: message,
  };

  await emit("notify", payload);
};
