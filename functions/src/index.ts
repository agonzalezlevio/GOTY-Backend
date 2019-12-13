import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-grafica-e82b8.firebaseio.com"
});

// Referencia a la base de datos
const db = admin.firestore();



// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.json({
     message: "¡Hola mundo desde Funciones de Firebase!"
 });
});


export const getGOTY = functions.https.onRequest( async (request, response) => {

    // Referencia a la colección
    const gotyRef = db.collection('goty');
    // ¡Obtención de la información en el momento y preciso instante!
    const documentSnap = await gotyRef.get();    
    // Documentos procesados 
    const juegos = documentSnap.docs.map(doc => doc.data());
    response.json(juegos);

   });
