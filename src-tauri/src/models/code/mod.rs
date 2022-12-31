// Create codes table
// conn.execute(
//     "CREATE TABLE IF NOT EXISTS codes (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT DEFAULT 'new_file' NOT NULL,
//         content TEXT,
//         snippet_id INTEGER NOT NULL,
//         FOREIGN KEY (snippet_id) REFERENCES snippets(id)
//     );
//     ",
//     (),
// )?;
use tauri::{
    plugin::{Builder, TauriPlugin},
    Runtime,
};

use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize)]
pub struct Code {
    id: Option<u64>,
    name: String,
    content: Option<String>,
    snippet_id: u64,
}

#[derive(Serialize, Deserialize)]
pub struct CodeResponse {
    code: Vec<Code>,
}

#[tauri::command]
pub fn fetch_codes(snipt_id: u64) -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();
    let mut stmt = conn
        .prepare("SELECT * FROM codes WHERE snippet_id = ?1")
        .unwrap();
    let code_iter = stmt
        .query_map(rusqlite::params![snipt_id], |row| {
            Ok(Code {
                id: row.get(0)?,
                name: row.get(1)?,
                content: row.get(2)?,
                snippet_id: row.get(3)?,
            })
        })
        .unwrap();

    let mut codes = Vec::new();

    for snippet in code_iter {
        codes.push(snippet.unwrap());
    }

    let all = serde_json::to_string(&codes).unwrap();

    Ok(all.into())
}

#[tauri::command]
pub fn fetch_all() -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();
    let mut stmt = conn.prepare("SELECT * FROM codes").unwrap();

    let code_iter = stmt
        .query_map(rusqlite::params![], |row| {
            Ok(Code {
                id: row.get(0)?,
                name: row.get(1)?,
                content: row.get(2)?,
                snippet_id: row.get(3)?,
            })
        })
        .unwrap();

    let mut codes = Vec::new();

    for snippet in code_iter {
        codes.push(snippet.unwrap());
    }

    let all = serde_json::to_string(&codes).unwrap();

    Ok(all.into())
}

#[tauri::command]
pub fn add_code(code: Code) -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();

    let name = if code.name.is_empty() {
        "new_file"
    } else {
        &code.name
    };

    conn.execute(
        "INSERT INTO codes (name, content, snippet_id) VALUES (?1, ?2, ?3)",
        (name, &code.content, &code.snippet_id),
    )
    .unwrap();

    Ok(serde_json::to_string(&code).unwrap().into())
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("codes")
        .invoke_handler(tauri::generate_handler![fetch_codes, fetch_all, add_code])
        .build()
}
