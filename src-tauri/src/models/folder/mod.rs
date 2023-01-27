// Create folders table
// conn.execute(
//     "CREATE TABLE IF NOT EXISTS folders (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL
//     );
//     ",
//     (),
// )?;

use tauri::{
    plugin::{Builder, TauriPlugin},
    Runtime,
};

use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize)]
pub struct Folder {
    id: Option<u64>,
    name: String,
}

#[derive(Serialize, Deserialize)]
pub struct FolderResponse {
    folder: Vec<Folder>,
}

#[tauri::command]
fn fetch_all() -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();
    let mut stmt = conn.prepare("SELECT * FROM folders").unwrap();

    let folder_iter = stmt
        .query_map([], |row| {
            Ok(Folder {
                id: row.get(0)?,
                name: row.get(1)?,
            })
        })
        .unwrap();

    // Create a vertor variable
    let mut folders = Vec::new();

    for folder_item in folder_iter {
        folders.push(folder_item.unwrap());
    }

    // let all = serde_json::to_string(&folders).unwrap();
    // let all_json = serde_json::from_str(&all).unwrap();
    let json_value = serde_json::json!(folders);

    Ok(json_value)
}

#[tauri::command]
pub fn fetch_folder(folder_id: u64) -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();
    let mut stmt = conn.prepare("SELECT * FROM folders WHERE id = ?1").unwrap();

    let folder_iter = stmt
        .query_map([folder_id], |row| {
            Ok(Folder {
                id: row.get(0)?,
                name: row.get(1)?,
            })
        })
        .unwrap();

    let mut _one = Vec::new();

    for item in folder_iter {
        _one.push(item.unwrap());
    }

    let one = serde_json::to_string(&_one.into_iter().nth(0)).unwrap();

    Ok(one.into())
}

#[tauri::command]
pub fn add_folder(folder: Folder) -> Result<Value, Value> {
    let conn = Connection::open("data.db").unwrap();

    let name = if folder.name.is_empty() {
        "new_folder"
    } else {
        &folder.name
    };
    conn.execute("INSERT INTO folders (name) VALUES (?1)", params![name])
        .unwrap();

    Ok(serde_json::json!(folder))
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("folders")
        .invoke_handler(tauri::generate_handler![
            fetch_all,
            fetch_folder,
            add_folder
        ])
        .build()
}

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
