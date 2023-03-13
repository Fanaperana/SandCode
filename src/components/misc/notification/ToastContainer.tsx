import { FC, useState, useEffect, createContext } from "react";
import { listen } from "@tauri-apps/api/event";
import { ToastType, ToastContextType } from "./ToastMain";
import { Toast } from "./Toast";

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastContainer: FC = ({}) => {
  const [stackMessages, setStackMessages] = useState<ToastType[]>([]);

  const unlisten = async () => {
    // Add async keyword
    await listen("notify", (e) => {
      // Await for the listen function to complete
      const data = e.payload;
      console.log(data);
      setStackMessages((old) => [...old, data] as ToastType[]);
    });
  };

  const handleStackMessages = (index: number) => {
    setStackMessages(stackMessages.filter((_, i) => i != index));
  };

  useEffect(() => {
    return () => {
      unlisten(); // Call the function here
    };
  }, []);

  return (
    <>
      <ToastContext.Provider
        value={{
          stackMessages,
          setStackMessages,
        }}
      >
        <div className="fixed bottom-0 right-0 p-4 text-slate-300">
          <div className="flex flex-col gap-4">
            {stackMessages.map((el, index) => (
              <Toast
                key={index}
                // index={index}
                message={el.message}
                msg_type={el.msg_type}
                onDelete={() => handleStackMessages(index)}
              />
            ))}
          </div>
        </div>
      </ToastContext.Provider>
    </>
  );
};
