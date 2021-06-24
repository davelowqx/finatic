import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig.json";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
console.log("firebase initialised");

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
