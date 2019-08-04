var electron = require('electron'),
    request = require("request"),
    app = electron.app;

var win, conf;

function createWindow(conf) {
    win = new electron.BrowserWindow(conf);
    win.loadURL(conf.url);
}

if (app) {
    app.on('ready', function() {
        request({
            url: process.env.APP_URL,
            headers: {
                Accept: "application/vnd.pgrst.object+json"
            }
        }, function(error, response, body) {
            conf = JSON.parse(body);
            console.log(conf);
            createWindow(conf);
        });
    });

    app.on('window-all-closed', function() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    app.on('activate', function() {
        // doesn't work
        if (win === null) {
            createWindow(conf);
        }
    });
}
