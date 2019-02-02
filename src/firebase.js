import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBbILHVxVIcPg_B3pA-dLxo9GFVN2catj8',
  authDomain: 'example-everything.firebaseapp.com',
  databaseURL: 'https://example-everything.firebaseio.com',
  projectId: 'example-everything',
  storageBucket: 'example-everything.appspot.com',
  messagingSenderId: '793947592819'
};

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();

export { database, auth, provider };
