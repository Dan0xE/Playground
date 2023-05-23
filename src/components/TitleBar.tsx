import { appWindow } from "@tauri-apps/api/window";
import {
  VscChromeMinimize as MinimizeIcon,
  VscChromeMaximize as MaximizeIcon,
  VscChromeClose as CloseIcon,
} from "react-icons/vsc";
import { useEffect, useState } from "react";
import isTauriWindow from "../utils/isTauriWindow";

function TitleBar() {
  const [tauriWindow, setTauriWindow] = useState<boolean>(false);
  isTauriWindow().then((res) => setTauriWindow(res));
  useEffect((): (() => void) => {
    const minimizeBtn: HTMLElement =
      document.getElementById("titlebar-minimize")!;
    const maximizeBtn: HTMLElement =
      document.getElementById("titlebar-maximize")!;
    const closeBtn: HTMLElement = document.getElementById("titlebar-close")!;

    minimizeBtn?.addEventListener(
      "click",
      (): Promise<void> => appWindow.minimize()
    );
    maximizeBtn?.addEventListener(
      "click",
      (): Promise<void> => appWindow.toggleMaximize()
    );
    closeBtn?.addEventListener("click", (): Promise<void> => appWindow.close());

    return (): void => {
      minimizeBtn?.removeEventListener(
        "click",
        (): Promise<void> => appWindow.minimize()
      );
      maximizeBtn?.removeEventListener(
        "click",
        (): Promise<void> => appWindow.toggleMaximize()
      );
      closeBtn?.removeEventListener(
        "click",
        (): Promise<void> => appWindow.close()
      );
    };
  });
  return (
    <div className="flex flex-row w-screen">
      {tauriWindow && (
        <div data-tauri-drag-region className=" titlebar">
          <div className="mt-1 text-md titlebar-title text-teespring-100">
            Playground
          </div>
          <div className="titlebar-buttons">
            <div className="titlebar-button" id="titlebar-minimize">
              <MinimizeIcon />
            </div>
            <div className="titlebar-button" id="titlebar-maximize">
              <MaximizeIcon />
            </div>
            <div className="titlebar-button" id="titlebar-close">
              <CloseIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TitleBar;
