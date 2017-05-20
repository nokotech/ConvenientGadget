'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
var setting = {
  width: 800,
  height: 600,
  /*transparent: true,*/
  frame: false
}

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit();
});

// ブラウザ(Chromium)の起動, 初期画面のロード
app.on('ready', () => {
  mainWindow = new BrowserWindow(setting);
  mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.webContents.openDevTools();
  mainWindow.setAlwaysOnTop(true);
});
