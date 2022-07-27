import { initializeApp } from 'firebase/app';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBUglhyGhXUxQwEhgg6ydX_FaXpgg2bpZI',
  authDomain: 'mymoney-3a618.firebaseapp.com',
  projectId: 'mymoney-3a618',
  storageBucket: 'mymoney-3a618.appspot.com',
  messagingSenderId: '597463083852',
  appId: '1:597463083852:web:2a007de2d4bdd10c377de9',
};

/////////////////////////////////////////////////
// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();

/////////////////////////////////////////////////
// Initialize Firestore
export const db = getFirestore();

////////////////////////////////////////////////
// Timestamp
export const createdAt = serverTimestamp();

/////////////////////////////////////////////////
// user authentication check automatically
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
