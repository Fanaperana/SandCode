use tauri::{CustomMenuItem, Menu, Submenu, WindowMenuEvent};

pub fn menu_all() -> Menu {
    let file_submenu = file_submenu();
    let help_submenu = help_submenu();

    let menu = Menu::new()
        .add_submenu(file_submenu)
        .add_submenu(help_submenu);
    // .add_native_item(MenuItem::Copy)
    // .add_item(CustomMenuItem::new("hide", "Hide"));
    return menu;
}

pub fn menu_event(event: WindowMenuEvent) {
    match event.menu_item_id() {
        "quit" => {
            std::process::exit(0);
        }
        "close" => {
            event.window().close().unwrap();
        }
        _ => {
            println!("{}", event.menu_item_id());
        }
    }
}

pub(crate) fn file_submenu() -> Submenu {
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");

    Submenu::new("File", Menu::new().add_item(quit).add_item(close))
}

pub(crate) fn help_submenu() -> Submenu {
    let keybr = CustomMenuItem::new("keybr".to_string(), "Keyboard Shortcuts References");
    let about = CustomMenuItem::new("about".to_string(), "About");

    Submenu::new("Help", Menu::new().add_item(keybr).add_item(about))
}
