const { ipcMain, app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createWindow();

  try {
    chat();
  } catch (err) {
    console.error(err);
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

async function chat() {
  const node = await IPFS.create();
  const id = await node.id();
  const room = new Room(node, 'uw');
  console.log(id);

  room.on('peer joined', (peer) => {
    console.log('peer ' + peer + ' joined');
    
  });
  room.on('peer left', (peer) => console.log('peer ' + peer + ' left'));

  room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer + '!'));

  room.on('message', (message) => {
    console.log('message from ' + message.from + ': ' + message.data.toString());

  });

  ipcMain.on('message', (event, arg) => {
    room.broadcast(arg.toString());
  })
  //setInterval(() => room.broadcast('hey everyone!'), 2000);
}