const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");

let configWindow;
let framesWindows = [];

const getConfig = (autoRun = false) => {
  try {
    if (configWindow) configWindow.close();
  } catch (err) {}
  configWindow = new BrowserWindow({
    skipTaskbar: true,
    width: 800,
    height: 600,
    title: "Configuration",
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  configWindow.loadFile("config.html", {
    search: autoRun ? "?run=1" : "",
  });
};

const openFrame = (config = {}) => {
  const frame = new BrowserWindow({
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    skipTaskbar: true,
    kiosk: true,
    hasShadow: false,
    titleBarStyle: "hidden",
    roundedCorners: false,
    ...config,
  });
  if (config.url) frame.loadURL(config.url);
  framesWindows.push(frame);
};

app
  .whenReady()
  .then(() => {
    //Register a command to open configurator
    globalShortcut.register("CommandOrControl+I", () => {
      getConfig();
      for (const frame of framesWindows) {
        frame.destroy();
      }
      framesWindows = [];
    });
  })
  .then(() => {
    //First open configurator
    getConfig(true);

    ipcMain.handle("run-frames", async (event, ...args) => {
      //Open frames defined in the configuration
      const configuration = args[0];
      if (configuration && configuration.length) {
        try {
          if (configWindow) configWindow.close();
        } catch (err) {}
        framesWindows = [];
        configuration.forEach((opt) => {
          openFrame(opt);
        });
      }
    });
  });

//When no windows is open, quit the app
app.on("window-all-closed", () => {
  app.quit();
});
