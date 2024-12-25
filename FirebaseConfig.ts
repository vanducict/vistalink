// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsqfaZhxi7TkCCGVNk5kmP5nqyb0UOXgw",
    authDomain: "vistalink-app.firebaseapp.com",
    projectId: "vistalink-app",
    storageBucket: "vistalink-app.firebasestorage.app",
    messagingSenderId: "98021792974",
    appId: "1:98021792974:web:5abd5800ae68da212c049f",
    measurementId: "G-WBD8LGTRRL"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
export const firebase_db = getFirestore(firebase_app);
const analytics = getAnalytics(firebase_app);
