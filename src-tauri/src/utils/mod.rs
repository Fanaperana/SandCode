use tauri::{
    menu::{Menu, MenuItem, Submenu},
    App, Manager,
};

pub fn setup_menu(app: &App) -> Result<(), Box<dyn std::error::Error>> {
    let file_submenu = file_submenu(app)?;
    let help_submenu = help_submenu(app)?;

    let menu = Menu::with_items(app, &[&file_submenu, &help_submenu])?;

    if let Some(window) = app.get_webview_window("main") {
        window.set_menu(menu)?;
        window.on_menu_event(move |window, event| {
            match event.id.as_ref() {
                "quit" => {
                    std::process::exit(0);
                }
                "close" => {
                    let _ = window.close();
                }
                _ => {
                    println!("{}", event.id.as_ref());
                }
            }
        });
    }

    Ok(())
}

fn file_submenu(app: &App) -> Result<Submenu<tauri::Wry>, Box<dyn std::error::Error>> {
    let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
    let close = MenuItem::with_id(app, "close", "Close", true, None::<&str>)?;

    Ok(Submenu::with_items(app, "File", true, &[&quit, &close])?)
}

fn help_submenu(app: &App) -> Result<Submenu<tauri::Wry>, Box<dyn std::error::Error>> {
    let keybr = MenuItem::with_id(app, "keybr", "Keyboard Shortcuts References", true, None::<&str>)?;
    let about = MenuItem::with_id(app, "about", "About", true, None::<&str>)?;

    Ok(Submenu::with_items(app, "Help", true, &[&keybr, &about])?)
}
