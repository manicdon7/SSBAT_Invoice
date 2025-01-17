// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfQY-9Ncg94x2-QkcVv8ngojQk5JMRdh4",
  authDomain: "startuphub-ad1de.firebaseapp.com",
  projectId: "startuphub-ad1de",
  storageBucket: "startuphub-ad1de.appspot.com",
  messagingSenderId: "543920148336",
  appId: "1:543920148336:web:619cbe46783c99ffb949b5",
  measurementId: "G-70G3T60NME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}