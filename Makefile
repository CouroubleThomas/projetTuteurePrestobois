all: pluginPrestobois.xpi

pluginPrestobois.xpi: manifest.json functionPlugin.js menu.html style.css functionMenu.js
	7z a pluginPrestobois.xpi manifest.json functionPlugin.js menu.html style.css functionMenu.js