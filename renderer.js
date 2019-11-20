// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const {dialog} = require('electron').remote;
const fs = require('fs');

const btn = document.getElementById('button');

//Muestra el dialogo para seleccionar la carpeta de guardado de las imagenes.
function showSaveDialog() {
  let directoryPath;
  dialog.showOpenDialog({
    title: 'seleccionar carpeta',
    defaultPath: '/home/angel/Desktop/random',
    buttonLabel: 'Seleccionar carpeta',
    properties: ['openDirectory'],
  }).then(res => {
    if (res.canceled || res.filePaths[0] === undefined) {
      return;
    }
    // TODO: Implementar funcion saveImages que descarga las imagenes
    // y las guarda en el directorio especificado.
    //saveImages(res.filePaths[0], link, source);
  });
}

//Devuelve un array con links de las imagenes
function getMangadexImages(mainLink) {
}

const testLink = 'https://s4.mangadex.org/data/5af57d4ce151796a79d6cc5b65cae56d/C1.png';
console.log(getMangadexImages(testLink));

//Add Save function to the button
btn.onclick = showSaveDialog;