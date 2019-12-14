import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-grafica-e82b8.firebaseio.com"
});

// Referencia a la base de datos
const db = admin.firestore();


// Express
const app = express();
app.use(cors({origin: true}));

app.get('/goty', async (req, res) => {

    // Referencia a la colección (Documento de juegos)
    const gotyRef = db.collection('goty');
    // ¡Obtención de la información en el momento y preciso instante!
    const documentSnap = await gotyRef.get();    
    // Documentos procesados 
    const juegos = documentSnap.docs.map(doc => doc.data());
    res.json(juegos);
});


app.post('/goty/:id', async (req, res) => {
  
  //id
  const id = req.params.id;
  // Referencia a la colección (Documento de juego por id) 
  const gameRef = db.collection('goty').doc(id);

  const gameSnap = await gameRef.get();    
 
  if(!gameSnap.exists){
     res.status(404). json({
      ok: false,
      message: 'No existe un juego ese ID: ' + id
    });
  } else {

    const gameAntesVotacion = gameSnap.data() || {votos: 0};
 
    await gameRef.update({
      votos: gameAntesVotacion.votos + 1
    })

    res.status(200). json({
      ok: true,
      message: `¡Gracias por tu voto a ${gameAntesVotacion.name}!`
    });
  }
});


export const api = functions.https.onRequest(app);
