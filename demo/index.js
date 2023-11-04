window.electronAPI.receive("fromMain", (data) => {
	if (data.command === "dropText") {
		document.getElementById("text").innerText = data.text;
	}
});
