// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TOD: REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "aSyButbfbrQsdfSeORnMv_cw8JK",
    authDomain: "idri-4f62.firebaseapp.com",
    projectId: "idri-4f92",
    storageBucket: "idri-4f62.appspot.com",
    messagingSenderId: "958935148356",
    appId: "2:348935148356:web:gb2fa97250919e1ed411",
    measurementId: "K-ZBaEG"
  };

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const addDocument = async (collectionName, data) => {
	let { id } = await addDoc(collection(db, collectionName), data);
	return id;
};
