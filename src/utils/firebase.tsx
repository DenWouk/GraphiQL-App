import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC0lC1vC7uErYC_qJVclsZmfokHq99U2rU',
  authDomain: 'graphql-c3578.firebaseapp.com',
  projectId: 'graphql-c3578',
  storageBucket: 'graphql-c3578.appspot.com',
  messagingSenderId: '1083087608350',
  appId: '1:1083087608350:web:c23e36bd861bf23a9d6c0f',
  measurementId: 'G-MVRHL497P0',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
