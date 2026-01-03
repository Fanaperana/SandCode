#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod api;
mod cmds;
mod migrations;
mod models;
mod utils;

fn main() {
    match migrations::connect() {
        Ok(_) => println!("Database created."),
        Err(error) => panic!("Connection is not set: {:?}", error),
    };
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .setup(|app| {
            utils::setup_menu(app)?;
            api::menutray::setup_tray(app)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            cmds::greet,
            migrations::create_tables_command,
            models::code::fetch_codes,
            models::code::fetch_all_codes,
            models::code::add_code,
            models::code::delete_code_by_id,
            models::folder::fetch_all_folders,
            models::folder::fetch_folder,
            models::folder::add_folder,
            models::snippet::fetch_all_snippets,
            models::snippet::fetch_snippet,
            models::snippet::fetch_snippet_by_folder,
            models::snippet::fetch_snippet_by_tag,
            models::snippet::add_snippet,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
