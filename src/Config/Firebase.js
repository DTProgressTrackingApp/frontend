// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZvwtvapGBEs3J5Wsqzb4DZGzFEHpvdZ8",
  authDomain: "trackingapp-15a96.firebaseapp.com",
  projectId: "trackingapp-15a96",
  storageBucket: "trackingapp-15a96.appspot.com",
  messagingSenderId: "267662678401",
  appId: "1:267662678401:web:6bd3f3a5440576df3bf080",
  measurementId: "G-X0BJ3KYGXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
