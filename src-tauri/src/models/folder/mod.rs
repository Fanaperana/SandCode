// Create folders table
// conn.execute(
//     "CREATE TABLE IF NOT EXISTS folders (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL
//     );
//     ",
//     (),
// )?;

use rusqlite::{params, Connection, Result};

use serde::{Deserialize, Serialize};
// use tauri::api::{Command, Context, Value};

// #[derive(Serialize, Deserialize)]
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
