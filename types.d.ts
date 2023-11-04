import type { Buffer } from "electron";

declare module "electron-drop-text-on-dock" {
	export function onDropText(callback: (text: string) => void): void;
}
