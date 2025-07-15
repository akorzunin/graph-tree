#[derive(serde::Serialize, serde::Deserialize)]
pub struct FileNode {
    name: String,
    is_dir: bool,
    children: Vec<FileNode>,
}
