// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use commands::check_app_installation_command::{
    __cmd__check_app_installation_command, __cmd__open_exe_command, check_app_installation_command,
    open_exe_command,
};
use commands::download_file::{__cmd__download_file_command, download_file_command};
use utils::check_app_installation::check_reg_install_key;

mod commands;
mod utils;

fn main() {
    let keys = check_reg_install_key();
    for subkey in keys {
        println!("Subkey: {}", subkey)
    }
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            check_app_installation_command,
            open_exe_command,
            download_file_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
