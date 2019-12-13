import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-grafica-e82b8.firebaseio.com"
});


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.json({
     message: "¡Hola mundo desde Funciones de Firebase!"
 });
});
