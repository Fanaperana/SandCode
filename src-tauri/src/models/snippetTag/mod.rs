// Create snippets have tags table
// conn.execute(
//     "CREATE TABLE IF NOT EXIST snippets_have_tags (
//         tag_id INTEGER NOT NULL,
//         snippet_id INTEGER NOT NULL,
//         FOREIGN KEY (tag_id) REFERENCES tags(id) 
//         FOREIGN KEY (snippet_id) REFERENCES snippets(id) 
//     );
//     ",
//     (),
// )?;

