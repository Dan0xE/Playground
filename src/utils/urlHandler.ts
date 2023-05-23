import { open } from "@tauri-apps/api/shell";

function urlHandler(url: string) {
  open(url).catch((e) => console.log(e));
}

export default urlHandler;
