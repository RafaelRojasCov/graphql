import admin from "firebase-admin";

const {
  firebase_project_id,
  firebase_private_key_id,
  firebase_private_key,
  firebase_client_email,
  firebase_client_id,
  firebase_client_x509_cert_url
} = process.env;

const execFirebase = () => {
  const credentials = {
    type: "service_account",
    project_id: firebase_project_id,
    private_key_id: firebase_private_key_id,
    private_key: firebase_private_key,
    client_email: firebase_client_email,
    client_id: firebase_client_id,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: firebase_client_x509_cert_url
  };

  admin.initializeApp({
    credential: admin.credential.cert(credentials)
  });

  let db = admin.firestore();

  let docRef = db.collection("categories").doc();
  let docSubRef = docRef.collection("tasks").doc();

  let setDoc = docRef.set({
    name: "My first Collection"
  });

  let setSubDoc = docSubRef.set({
    description: "My first task description",
    isDone: false
  });

  db.collection("categories")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, " => ", doc);
      });
    })
    .catch(error => {
      console.log;
    });
};

export default execFirebase;
