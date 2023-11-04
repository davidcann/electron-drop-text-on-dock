const { app, BrowserWindow } = require("electron");
const dropText = require("electron-drop-text-on-dock");

function createWindow() {
	const mainWindow = new BrowserWindow({
		height: 500,
		width: 600,
		backgroundColor: "#00000000",
		show: true,
		webPreferences: {
			preload: __dirname + "/preload.js",
		},
	});

	dropText.onDropText((text) => {
		mainWindow.webContents.send("fromMain", { command: "dropText", text });
	});

	mainWindow.webContents.loadFile("index.html");
}

app.whenReady().then(() => createWindow());
app.on("window-all-closed", () => app.quit());
