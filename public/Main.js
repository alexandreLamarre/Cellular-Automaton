const {app, BrowserWindow} = require('electron')
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1400, height: 800})

  win.loadURL('http://localhost:3000');
}
app.on('ready', createWindow)
