#[tauri::command]
pub(crate) fn check_app_installation_command() -> Vec<String> {
    return crate::utils::check_app_installation::check_reg_install_key();
}

#[tauri::command]
pub(crate) fn open_exe_command(name: String) -> Result<(), String> {
    return crate::utils::check_app_installation::launch_exe(name.as_str());
}
