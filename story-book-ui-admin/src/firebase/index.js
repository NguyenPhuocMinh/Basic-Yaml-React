import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
const REACT_APP_AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const REACT_APP_PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const REACT_APP_STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET;
const REACT_APP_MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID;
const REACT_APP_FIREBASE_ID = process.env.REACT_APP_FIREBASE_ID;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_ID
};
// firebase app
const firebaseApp = initializeApp(firebaseConfig);
// firebase auth
const firebaseAuth = getAuth(firebaseApp);
// providers
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export {
  firebaseApp,
  firebaseAuth,
  googleProvider,
  GoogleAuthProvider,
  signInWithPopup
};
