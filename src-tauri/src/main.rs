#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

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
        .menu(utils::menu_all())
        .on_menu_event(utils::menu_event)
        .plugin(cmds::init())
        .plugin(migrations::init())
        .plugin(models::code::init())
        .plugin(models::folder::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
