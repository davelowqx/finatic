import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig.json";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
console.log("firebase initialised");

export default firebase.firestore();
