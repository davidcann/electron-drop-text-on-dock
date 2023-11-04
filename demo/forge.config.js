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
