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
use serde_json::{json, Value};

#[derive(Serialize, Deserialize)]
pub struct Code {
    id: Option<u64>,
    name: String,
    content: Option<String>,
    lang_type: Option<String>,
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
                lang_type: row.get(3)?,
                snippet_id: row.get(4)?,
            })
        })
        .unwrap();

    let mut codes = Vec::new();

    for snippet in code_iter {
        codes.push(snippet.unwrap());
    }

    let all = json!(codes);

    Ok(all.into())
}

#[tauri::command]
pub fn fetch_all() -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();
    let mut stmt = conn
        .prepare("SELECT id, name, content, lang_type, snippet_id FROM codes")
        .unwrap();

    let code_iter = stmt
        .query_map(rusqlite::params![], |row| {
            Ok(Code {
                id: row.get(0)?,
                name: row.get(1)?,
                content: row.get(2)?,
                lang_type: row.get(3)?,
                snippet_id: row.get(4)?,
            })
        })
        .unwrap();

    let mut codes = Vec::new();

    for snippet in code_iter {
        codes.push(snippet.unwrap());
    }

    let all = json!(codes);

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
        "INSERT INTO codes (name, content, lang_type, snippet_id) VALUES (?1, ?2, ?3, ?4)",
        (name, &code.content, &code.lang_type, &code.snippet_id),
    )
    .unwrap();

    Ok(serde_json::to_string(&code).unwrap().into())
}

#[tauri::command]
pub fn delete_code_by_id(code_id: u64) -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();

    match conn.execute("DELETE FROM codes WHERE id = ?1", (code_id,)) {
        Ok(num_deleted) => {
            if num_deleted == 0 {
                return Err(json!("No code with that ID found"));
            } else {
                return Ok(json!(format!("Deleted code with ID {}", code_id)));
            }
        },
        Err(e) => {
            return Err(json!(format!("Failed to delete code with ID {}: {:?}", code_id, e)));
        }
    }
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("codes")
        .invoke_handler(tauri::generate_handler![
            fetch_codes,
            fetch_all,
            add_code,
            delete_code_by_id
        ])
        .build()
}
