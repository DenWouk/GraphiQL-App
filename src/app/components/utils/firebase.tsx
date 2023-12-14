import 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC0lC1vC7uErYC_qJVclsZmfokHq99U2rU',
  authDomain: 'graphql-c3578.firebaseapp.com',
  projectId: 'graphql-c3578',
  storageBucket: 'graphql-c3578.appspot.com',
  messagingSenderId: '1083087608350',
  appId: '1:1083087608350:web:c23e36bd861bf23a9d6c0f',
  measurementId: 'G-MVRHL497P0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
