const admin = require('firebase-admin')

// Initialize firebase admin SDK


var serviceAccount = require("./susaetask-firebase-adminsdk-3gw7z-1f43605fc1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://susaetask.appspot.com'
})

// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}