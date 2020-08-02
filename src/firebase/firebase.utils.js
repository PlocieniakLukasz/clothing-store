import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA588Tzs2MeLhBSflaYsn6T1SJWu_8ks64",
  authDomain: "clothing-db-71c9d.firebaseapp.com",
  databaseURL: "https://clothing-db-71c9d.firebaseio.com",
  projectId: "clothing-db-71c9d",
  storageBucket: "clothing-db-71c9d.appspot.com",
  messagingSenderId: "535984475991",
  appId: "1:535984475991:web:39e41070a162ad6058b812",
  measurementId: "G-ZE2SQ6LDJS",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  // the code below creates a snapshot

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
}; //async

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
