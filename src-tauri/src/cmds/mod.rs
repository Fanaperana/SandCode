use tauri::{
    plugin::{Builder, TauriPlugin},
    Runtime,
};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("cmds")
        .invoke_handler(tauri::generate_handler![greet])
        .build()
}
