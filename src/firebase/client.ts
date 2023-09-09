import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCXP9eQbl0ZBYrn1OYrflKGIQ8Y88xVpik",
  authDomain: "noodle-central.firebaseapp.com",
  projectId: "noodle-central",
  storageBucket: "noodle-central.appspot.com",
  messagingSenderId: "417239441582",
  appId: "1:417239441582:web:183f328afab5726505cd3f",
  measurementId: "G-DEV0S1E9Z2",
};

export const app = initializeApp(firebaseConfig);
