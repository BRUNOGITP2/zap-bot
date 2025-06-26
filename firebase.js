const admin = require('firebase-admin');

// ⚠️ Nome do arquivo JSON exato que você baixou
const serviceAccount = require('./zapfunilia-firebase-adminsdk-fbsvc-c9868ac590.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
