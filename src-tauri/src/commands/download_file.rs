use std::env;
use std::path::{Path, PathBuf};
use url::Url;

#[tauri::command]
pub(crate) async fn download_file_command(url: String, _name: String) -> Result<(), String> {
    let current_dir = env::current_dir().unwrap().join("apps");

    println!("current_dir: {:?}", current_dir);
    crate::utils::download::download_file(&url, &current_dir)
        .await
        .map_err(|e| format!("Failed to download file: {}", e))?;

    let url = Url::parse(&url).map_err(|e| format!("Invalid URL: {}", e))?;
    println!("url: {}", url);

    let path = url.path();
    println!("path: {}", path);

    let filename = PathBuf::from(
        Path::new(path)
            .file_name()
            .ok_or_else(|| format!("Invalid path: {}", path))?,
    );
    println!("file_name: {:?}", filename);

    Ok(())
}
