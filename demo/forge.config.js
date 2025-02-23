const fs = require("fs-extra");
const path = require("path");

module.exports = {
	packagerConfig: {
		extendInfo: {
			NSServices: [
				{
					NSSendTypes: ["NSStringPboardType"],
					NSMessage: "handleTextDropOnDock",
					NSMenuItem: {
						default: "Open in Drop Text Demo",
					},
				},
			],
		},
		prune: true,
	},
	hooks: {
		packageAfterCopy: async (config, buildPath, electronVersion, platform, arch) => {
			// This is a hack to prevent recursive copying of the demo folder
			try {
				const sourcePath = path.resolve(__dirname, "..");
				const destinationPath = path.join(buildPath, "node_modules", "electron-drop-text-on-dock");
				await fs.copy(sourcePath, destinationPath, {
					filter: (src) => {
						const shouldCopy = !src.includes(path.join(sourcePath, "demo"));
						if (!shouldCopy) {
							console.log(`Excluding ${src}`);
						}
						return shouldCopy;
					},
				});
				console.log("Files copied successfully.");
			} catch (error) {
				throw new Error("Error during packageAfterCopy hook:", error);
			}
		},
	},
	makers: [
		{
			name: "@electron-forge/maker-zip",
			config: {
				overwrite: true,
			},
		},
	],
};
