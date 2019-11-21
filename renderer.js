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
function showSaveDialog(link, pages, source) {
  let directoryPath;
  dialog.showOpenDialog({
    title: 'Selecciona la carpeta destino',
    defaultPath: '/home/angel/Desktop/random',
    buttonLabel: 'Seleccionar carpeta',
    properties: ['openDirectory'],
  }).then(res => {
    if (res.canceled || res.filePaths[0] === undefined) {
      return;
    }
    console.log(res.filePaths[0]);
    // TODO: Implementar funcion saveImages que descarga las imagenes
    // y las guarda en el directorio especificado.
    //saveImages(res.filePaths[0], link, source);
    saveImages(res.filePaths[0], link, pages, source);
    document.getElementById('link').value = '';
    document.getElementById('pages').value = '';
  });
}

function saveImages(directory, link, pages, source) {
  switch (source) {
    case 'mangadex':
      downloadMangadexImages(link, pages, directory + '/');
      break;
  }
}

//Devuelve un array con links de las imagenes
async function downloadMangadexImages(mainLink, pages, filePath) {
  
  const slashIndex = mainLink.lastIndexOf('/');

  let counter = mainLink[slashIndex + 2];

  const frontLink = mainLink.slice(0, slashIndex + 2);
  const endLink = mainLink.slice(slashIndex + 3);

  let link;

  //Descarga secuencialmente los links
  for(let i = counter; i <= pages; i++) {
      link = frontLink + i + endLink;
      await downloadImage(link, filePath + i);
      console.log(i);
  }

}

//Descarga la imagen a partir del link y o ubica en el directorio especificado
async function downloadImage(link, filePath) {
  try {
    const response = await fetch(link);

    if (response.ok) {
      const myImg = await response.blob();
      console.log(myImg.type);
      const imgBuffer = Buffer.from(await myImg.arrayBuffer());
  
      const extension = myImg.type.slice(myImg.type.indexOf('/') + 1);
      
      fs.writeFile(filePath + '.' + extension, imgBuffer, (err) => {
        if (err) {
          throw err;
        }
        console.log("The image has been saved sucesfully");
      })
    } else {
      return;
    }
  } catch(e) {
    console.log('Hubo un error: ' + e);
  }

}
//downloadMangadexImages(testLink, 12, './images/');

function handleDownload() {
  let link = document.getElementById('link').value;
  let pages = document.getElementById('pages').value;
  let source = document.getElementById('fuente').value;

  showSaveDialog(link, pages, source);
}

//Add Save function to the button
btn.onclick = handleDownload;
//btn.onclick = showSaveDialog();