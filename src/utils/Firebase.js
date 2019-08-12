import firebase from "firebase";

class Firebase {
  constructor(id = "", app = firebase, cached = false) {
    if (Firebase.instances.has(id)) {
      const instance = Firebase.instances.get(id);

      instance.cached = true;
      Firebase.instances.set(id, instance);

      return instance;
    }

    this.id = id;
    this.app = app;
    this.cached = cached;

    Firebase.instances.set(id, this);
  }

  initialize(config, id) {
    return Promise.resolve(this.app.initializeApp(config, id));
  }

  authenticate(token) {
    return this.app.auth().signInWithCustomToken(token);
  }

  get db() {
    return this.app.firestore();
  }
}

Firebase.instances = new Map();

export default Firebase;
