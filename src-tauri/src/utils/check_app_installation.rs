use std::process::Command;

use winreg::enums::*;
use winreg::RegKey;

pub fn check_reg_install_key() -> Vec<String> {
    let hklm = RegKey::predef(HKEY_CURRENT_USER);
    let key_path = r"Software\dan0xe";
    let key = hklm.open_subkey_with_flags(key_path, KEY_READ).unwrap();

    // Get the subkey names
    let subkey_names = key.enum_keys();

    // Convert the subkey names to a vector
    let subkeys: Vec<String> = subkey_names.map(|result| result.unwrap()).collect();

    subkeys
}

pub fn launch_exe(name: &str) -> Result<(), String> {
    let hklm = RegKey::predef(HKEY_CURRENT_USER);
    let key_path = r"Software\dan0xe";
    let key = hklm
        .open_subkey_with_flags(key_path, KEY_READ)
        .map_err(|e| e.to_string())?;

    let subkey = key
        .open_subkey_with_flags(name, KEY_READ)
        .map_err(|e| e.to_string())?;

    let install_dir: String = subkey.get_value("installDir").map_err(|e| e.to_string())?;

    let exe_path = format!("{}\\{}.exe", install_dir, name);
    println!("{}", exe_path);

    Command::new(exe_path).spawn().map_err(|e| e.to_string())?;

    Ok(())
}
