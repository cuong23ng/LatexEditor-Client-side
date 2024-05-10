// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCS19_HF8K1PSVotGPnto-N9P98y2hoNY",
  authDomain: "hustex-a81dd.firebaseapp.com",
  projectId: "hustex-a81dd",
  storageBucket: "hustex-a81dd.appspot.com",
  messagingSenderId: "778743152888",
  appId: "1:778743152888:web:000af61132ba6a3b89bb0d",
  measurementId: "G-4RMSC575M4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const colRef = collection(db, 'users');

const auth = getAuth();

export { auth, colRef };
