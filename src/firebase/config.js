import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB24hGGcLA-Jkm6sjN1QEnPUmFSBEaTQfI",
    authDomain: "chat-app-8df00.firebaseapp.com",
    projectId: "chat-app-8df00",
    storageBucket: "chat-app-8df00.appspot.com",
    messagingSenderId: "1055406881729",
    appId: "1:1055406881729:web:d57d36567e55e31456cd40"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');

if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', 8080);
}

export { auth, db };

export default firebase;
