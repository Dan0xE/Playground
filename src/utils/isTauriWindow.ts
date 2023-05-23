import { invoke } from "@tauri-apps/api";

//!Temp workarround since other methods did NOT work
export default async function isTauriWindow(): Promise<boolean> {
  // let result: boolean = true;
  try {
    await invoke("is_tauri");
  } catch (error) {
    // result = false;
  }
  return true;
}
