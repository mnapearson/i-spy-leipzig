import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
var configOptions = {
  apiKey: "AIzaSyCIODgULKOSJiUDQ-VryqAW2UMMF1qBH94",
  authDomain: "fir-auth-e18f6.firebaseapp.com",
  projectId: "fir-auth-e18f6",
  storageBucket: "fir-auth-e18f6.appspot.com",
  messagingSenderId: "194089822349",
  appId: "1:194089822349:web:43c273b46b7207d9721ac4",
};
// Initialize Firebase
firebase.initializeApp(configOptions);

export const db = firebase.firestore();
export const auth = firebase.auth();
