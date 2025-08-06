const admin = require('firebase-admin');
const path = require('path');
// import admin from 'firebase-admin';
// import path from 'path';


// Use your service account key file
const serviceAccount = require(path.resolve(__dirname, './serviceAccountKey.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
