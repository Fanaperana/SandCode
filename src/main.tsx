import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";

import { unregister, register } from "@tauri-apps/plugin-global-shortcut";
import { BaseDirectory, mkdir } from "@tauri-apps/plugin-fs";
import { store } from "./store";
import { Provider } from "react-redux";

// Unregister the conflicting shortcut before registering a new one
// await globalShortcut.unregister("Ctrl+G");

// await globalShortcut.register("Ctrl+G", (shortcut) => {
//   console.log(`Shortcut ${shortcut} triggered`);
// });
// Unregister the conflicting shortcut before registering a new one
const init = async () => {
  try {
    await unregister("Ctrl+G");
  } catch (e) {
    // Shortcut may not be registered yet, ignore
  }
  try {
    await unregister("Ctrl+T");
  } catch (e) {
    // Shortcut may not be registered yet, ignore
  }

  await register("Ctrl+G", (shortcut) => {
    console.log(`Shortcut ${shortcut} triggered`);
  });

  await register("Ctrl+T", async (shortcut) => {
    console.log(BaseDirectory.App);
    const d = await mkdir("user", {
      baseDir: BaseDirectory.AppData,
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
