import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
};

// console.log(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage };
