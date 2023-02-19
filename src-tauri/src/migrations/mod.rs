use tauri::{
    plugin::{Builder, TauriPlugin},
    Runtime,
};

use rusqlite::{Connection, Result};
use serde_json::Value;

pub fn connect() -> Result<Connection> {
    let conn = Connection::open("data.db")?;
    create_tables(&conn)?;
    Ok(conn)
}

fn create_tables(conn: &Connection) -> rusqlite::Result<()> {
    // Create folders table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS folders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            UNIQUE(name)
        );
        ",
        (),
    )?;

    // Create snippets table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS snippets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            folder_id INTEGER NOT NULL,
            name TEXT NOT NULL, 
            timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (folder_id) REFERENCES folders(id)
        );
        ",
        (),
    )?;

    // Create tags table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            hexcolor TEXT NOT NULL
        );
        ",
        (),
    )?;

    // Create snippets have tags table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS snippets_have_tags (
            tag_id INTEGER NOT NULL,
            snippet_id INTEGER NOT NULL,
            FOREIGN KEY (tag_id) REFERENCES tags(id) 
            FOREIGN KEY (snippet_id) REFERENCES snippets(id) 
        );
        ",
        (),
    )?;

    // Create codes table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT DEFAULT 'new_file' NOT NULL,
            content TEXT DEFAULT '',
            lang_type TEXT DEFAULT 'plain/text' NOT NULL,
            snippet_id INTEGER NOT NULL,
            FOREIGN KEY (snippet_id) REFERENCES snippets(id)
        );
        ",
        (),
    )?;

    Ok(())
}

#[tauri::command]
fn create_tables_command() -> Result<Value, Value> {
    let conn = rusqlite::Connection::open("data.db").unwrap();
    create_tables(&conn).unwrap();
    Ok(Value::Null)
    // format!("Tables are created successfully")
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("migrations")
        .invoke_handler(tauri::generate_handler![create_tables_command])
        .build()
}
