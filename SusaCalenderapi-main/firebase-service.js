const admin = require('firebase-admin')

var serviceAccount = require("./susaetask-firebase-adminsdk-3gw7z-1f43605fc1.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
