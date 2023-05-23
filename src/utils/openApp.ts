import { invoke } from "@tauri-apps/api";

function openApp(name: string) {
  console.log(name);
  invoke("open_exe_command", {
    name: name.toLowerCase(),
  }).then((res) => console.log(res));
}

export default openApp;
