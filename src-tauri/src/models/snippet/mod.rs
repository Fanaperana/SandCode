// Create snippets table
// conn.execute(
//     "CREATE TABLE IF NOT EXISTS snippets (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         folder_id INTEGER NOT NULL,
//         name TEXT NOT NULL,
//         timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (folder_id) REFERENCES folders(id)
//     );
//     ",
//     (),
// )?;
#[allow(unused)]
use tauri::{
    plugin::{Builder, TauriPlugin},
    AppHandle, Runtime, Window,
};

use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Serialize, Deserialize)]
pub struct Snippet {
    id: Option<u64>,
    folder_id: u64,
    name: String,
    timestamp: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct SnippetTag {
    id: Option<u64>,
    folder_id: u64,
    name: String,
    timestamp: Option<String>,
    snippet_id: Option<u64>,
    tag_id: Option<u64>,
}

#[derive(Serialize, Deserialize)]
pub struct Payload {
    msg_type: String,
    message: String,
}

#[tauri::command]
pub fn fetch_all_snippets() -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();
    let mut stmt = conn.prepare("SELECT * FROM snippets").unwrap();

    let snippet_iter = stmt
        .query_map([], |row| {
            Ok(Snippet {
                id: row.get(0)?,
                folder_id: row.get(1)?,
                name: row.get(2)?,
                timestamp: row.get(3)?,
            })
        })
        .unwrap();

    // Create a vertor variable
    let mut snippets = Vec::new();

    for snippet_item in snippet_iter {
        snippets.push(snippet_item.unwrap());
    }

    if snippets.len() == 0 {
        return Ok(json!([Snippet {
            id: Some(0),
            folder_id: 0,
            name: "Empty".to_string(),
            timestamp: None
        }]));
    }

    let json_value = json!(snippets);

    Ok(json_value)
}

#[tauri::command]
pub fn fetch_snippet_by_folder(folder_id: u64) -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();
    let mut stmt = conn
        .prepare("SELECT * FROM snippets WHERE folder_id = ?1")
        .unwrap();

    let snippet_iter = stmt
        .query_map([folder_id], |row| {
            Ok(Snippet {
                id: row.get(0)?,
                folder_id: row.get(1)?,
                name: row.get(2)?,
                timestamp: row.get(3)?,
            })
        })
        .unwrap();

    let mut snippets_in_folder = Vec::new();

    for item in snippet_iter {
        snippets_in_folder.push(item.unwrap());
    }

    if snippets_in_folder.len() == 0 {
        return Ok(json!([Snippet {
            id: Some(0),
            folder_id: 0,
            name: "Empty".to_string(),
            timestamp: None
        }]));
    }

    let json_value = json!(snippets_in_folder);

    Ok(json_value)
}

#[tauri::command]
pub fn fetch_snippet_by_tag(tag_id: u64) -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();
    let mut stmt = conn
        .prepare("SELECT s.id, s.folder_id, s.name, s.timestamp, st.snippet_id, st.tag_id FROM snippets s INNER JOIN snippets_have_tags st ON s.id = st.snippet_id WHERE st.tag_id = ?1")
        .unwrap();

    let snippet_iter = stmt
        .query_map([tag_id], |row| {
            Ok(SnippetTag {
                id: row.get(0)?,
                folder_id: row.get(1)?,
                name: row.get(2)?,
                timestamp: row.get(3)?,
                snippet_id: row.get(4)?,
                tag_id: row.get(5)?,
            })
        })
        .unwrap();

    let mut snippets_have_tags = Vec::new();

    for item in snippet_iter {
        snippets_have_tags.push(item.unwrap());
    }

    if snippets_have_tags.len() == 0 {
        return Ok(json!([SnippetTag {
            id: Some(0),
            folder_id: 0,
            name: "Empty".to_string(),
            timestamp: None,
            snippet_id: None,
            tag_id: None
        }]));
    }

    let json_value = json!(snippets_have_tags);

    Ok(json_value)
}

#[tauri::command]
pub fn fetch_snippet(snippet_id: u64) -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();
    let mut stmt = conn
        .prepare("SELECT * FROM snippets WHERE id = ?1")
        .unwrap();

    let snippet_iter = stmt
        .query_map([snippet_id], |row| {
            Ok(Snippet {
                id: row.get(0)?,
                folder_id: row.get(1)?,
                name: row.get(2)?,
                timestamp: row.get(3)?,
            })
        })
        .unwrap();

    let mut _one = Vec::new();

    for item in snippet_iter {
        _one.push(item.unwrap());
    }

    let one = _one.into_iter().nth(0);

    Ok(json!(one))
}

#[tauri::command]
pub fn add_snippet<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    snippet: Snippet,
) -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();

    let name = if snippet.name.is_empty() {
        "New Snippet"
    } else {
        &snippet.name
    };

    let res = conn.execute(
        "INSERT INTO snippets (name, folder_id) VALUES (?1, ?2)",
        (name, snippet.folder_id),
    );

    match res {
        Ok(_) => Ok(json!(snippet)),
        Err(error) => Err(json!(Payload {
            msg_type: "error".to_string(),
            message: error.to_string(),
        })),
    }
}

// Plugin init function - no longer used, commands are registered in main.rs
// pub fn init<R: Runtime>() -> TauriPlugin<R> {
//     Builder::new("snippets")
//         .invoke_handler(tauri::generate_handler![
//             fetch_all_snippets,
//             fetch_snippet,
//             fetch_snippet_by_folder,
//             fetch_snippet_by_tag,
//             add_snippet
//         ])
//         .build()
// }

// struct Person {
//     id: i32,
//     name: String,
//     age: i32,
// }

// #[derive(Serialize, Deserialize)]
// struct PeopleResponse {
//     people: Vec<Person>,
// }

// #[tauri::command]
// fn fetch_people(context: Context) -> Result<Value, Value> {
//     let conn = rusqlite::Connection::open("mydatabase.db")?;
//     let mut stmt = conn.prepare("SELECT * FROM people")?;
//     let people_iter = stmt.query_map(rusqlite::params![], |row| {
//         Ok(Person {
//             id: row.get(0)?,
//             name: row.get(1)?,
//             age: row.get(2)?,
//         })
//     })?;
//     let mut people = Vec::new();
//     for person in people_iter {
//         people.push(person?);
//     }
//     Ok(PeopleResponse { people }.into())
// }

// #[tauri::command]
// fn create_person(context: Context, person: Person) -> Result<Value, Value> {
//     let conn = rusqlite::Connection::open("mydatabase.db")?;
//     conn.execute(
//         "INSERT INTO people (name, age) VALUES (?1, ?2)",
//         rusqlite::params![person.name, person.age],
//     )?;
//     Ok(Value::null())
// }

// #[tauri::command]
// fn read_person(context: Context, id: i32) -> Result<Value, Value> {
//     let conn = rusqlite::Connection::open("mydatabase.db")?;
//     let mut stmt = conn.prepare("SELECT * FROM people WHERE id = ?1")?;
//     let person = stmt.query_row(rusqlite::params![id], |row| {
//         Ok(Person {
//             id: row.get(0)?,
//             name: row.get(1)?,
//             age: row.get(2)?,
//         })
//     })?;
//     Ok(person.into())
// }
