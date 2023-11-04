# electron-drop-text-on-dock

> Detect dropped text on the app's dock icon in [Electron](https://electronjs.org/) on macOS

[See demo code](demo)

## Installing

    npm install electron-drop-text-on-dock

## info.plist Requirement

You must include the `NSServices` entry in your app's info.plist.

If you're using [Electron Forge](https://github.com/electron/forge), you can set this in your `forge.config.js` file:

    module.exports = {
        packagerConfig: {
            extendInfo: {
                NSServices: [
                    {
                        NSSendTypes: ["NSStringPboardType"],
                        NSMessage: "handleTextDropOnDock", // this value must be exact
                        NSMenuItem: {
                            default: "Open in Drop Text Demo", // edit this for your app
                        },
                    },
                ],
            },
        },
        ...
    };

## API

**onDropText(callback)** (macOS only)

- `callback` Function
  - `text` String - The dropped text.

## Usage

In main process:

    const { BrowserWindow } = require("electron");
    const dropText = require("electron-drop-text-on-dock");

    dropText.onDropText((text) => {
        console.log("text dropped:", text);
    });

    function createWindow() {
        const mainWindow = new BrowserWindow({
            height: 500,
            width: 800,
        });
        mainWindow.webContents.loadFile("index.html");
    }

    app.whenReady().then(() => createWindow());

## How to Run Demo

After cloning this repository, run:

    npm install
    cd demo
    npm install
    npm run make

## License

MIT License
