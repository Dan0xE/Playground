use reqwest::blocking::get;
use std::{
    fs::{self, File},
    io::Write,
    path::PathBuf,
    time::Duration,
};

use reqwest::Error;
use tokio::io::{self, AsyncWriteExt};
use zip::read::ZipArchive;

pub async fn download_file(url: &str, path: &PathBuf) -> Result<(), Box<dyn std::error::Error>> {
    println!("About to download from: {}", url);

    let mut response = reqwest::Client::new()
        .get(url)
        .header(reqwest::header::USER_AGENT, "playground/1.0")
        .send()
        .await?;

    println!("Downloaded from: {}", url);

    // Create parent directories if they don't exist
    if let Some(parent_dir) = path.parent() {
        println!("idk what is happening");
        if !parent_dir.exists() {
            println!("Creating directory: {:?}", parent_dir);
            match tokio::fs::create_dir_all(parent_dir).await {
                Ok(_) => println!("Directory created: {:?}", parent_dir),
                Err(e) => println!("Failed to create directory: {:?}", e),
            }
        }
    }

    let mut file = match tokio::fs::File::create(path.join(path)).await {
        Ok(file) => file,
        Err(e) => {
            println!("Failed to create file: {:?}", e);
            return Err(e.into()); // convert the error to a Box<dyn Error> and return early
        }
    };
    println!("Created file at: {:?}", path);

    while let Some(chunk) = response.chunk().await? {
        file.write_all(&chunk).await?;
    }
    println!("Download completed.");

    Ok(())
}
// pub struct Download {}

// pub trait DownloadTrait {
//     fn download_file(url: &str, path: &PathBuf) -> Result<(), String>;
//     fn unzip_file(file_path: &PathBuf, dest_path: &PathBuf) -> Result<(), String>;
// }

// impl DownloadTrait for Download {
//     fn download_file(url: &str, path: &PathBuf) -> Result<(), String> {
//         let mut response = reqwest::blocking::get(url).map_err(|err| err.to_string())?;

//         // Create parent directories if they don't exist
//         if let Some(parent_dir) = path.parent() {
//             fs::create_dir_all(parent_dir).map_err(|err| err.to_string())?;
//         }

//         let mut file = File::create(path).map_err(|err| err.to_string())?;
//         copy(&mut response, &mut file).map_err(|err| err.to_string())?;

//         Ok(())
//     }

//     fn unzip_file(file_path: &PathBuf, dest_path: &PathBuf) -> Result<(), String> {
//         let file = File::open(file_path).map_err(|err| err.to_string())?;
//         let mut archive = ZipArchive::new(file).map_err(|err| err.to_string())?;

//         for i in 0..archive.len() {
//             let mut file = archive.by_index(i).map_err(|err| err.to_string())?;
//             let outpath = dest_path.join(file.name());

//             if file.is_dir() {
//                 fs::create_dir_all(&outpath).map_err(|err| err.to_string())?;
//             } else {
//                 if let Some(parent) = outpath.parent() {
//                     if !parent.exists() {
//                         fs::create_dir_all(parent).map_err(|err| err.to_string())?;
//                     }
//                 }

//                 let outfile = File::create(&outpath).map_err(|err| err.to_string())?;
//                 let mut writer = BufWriter::new(outfile);

//                 io::copy(&mut file, &mut writer).map_err(|err| err.to_string())?;
//             }
//         }

//         Ok(())
//     }
// }
