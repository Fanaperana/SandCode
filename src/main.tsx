import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";

import { globalShortcut } from "@tauri-apps/api";
import { unregister, register } from "@tauri-apps/api/globalShortcut";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { store } from "./store";
import { Provider } from "react-redux";

// Unregister the conflicting shortcut before registering a new one
// await globalShortcut.unregister("Ctrl+G");

// await globalShortcut.register("Ctrl+G", (shortcut) => {
//   console.log(`Shortcut ${shortcut} triggered`);
// });
// Unregister the conflicting shortcut before registering a new one
const init = async () => {
  await unregister("Ctrl+G");
  await unregister("Ctrl+T");

  await register("Ctrl+G", (shortcut) => {
    console.log(`Shortcut ${shortcut} triggered`);
  });

  await register("Ctrl+T", async (shortcut) => {
    console.log(BaseDirectory.App);
    const d = await createDir("user", {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
    console.log(d);
  });
};

init();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
