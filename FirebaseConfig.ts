import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
// @ts-ignore
import {getReactNativePersistence, initializeAuth} from "firebase/auth"; // Correctly importing getReactNativePersistence
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Initialize Firebase Auth with React Native persistence
export const firebase_auth = initializeAuth(firebase_app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const firebase_db = getFirestore(firebase_app);
