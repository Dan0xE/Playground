import { invoke } from "@tauri-apps/api";

function handleInstall(url: string) {
  invoke("download_file_command", {
    url: url,
    name: name,
  }).then((res) => console.log(res));
}

export default handleInstall;
