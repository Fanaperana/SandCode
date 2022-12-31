#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod cmds;
mod migrations;
mod models;

fn main() {
    match migrations::connect() {
        Ok(_) => println!("Database created."),
        Err(error) => panic!("Connection is not set: {:?}", error),
    };
    
    tauri::Builder::default()
        .plugin(cmds::init())
        .plugin(migrations::init())
        .plugin(models::code::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
