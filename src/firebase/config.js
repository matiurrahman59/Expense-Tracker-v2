import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = async () =>
  signInWithPopup(auth, provider);

/////////////////////////////////////////////////
// Initialize Firestore
export const db = getFirestore();

/////////////////////////////////////////////////
// Add product collection to db
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title);
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

//////////////////////////////////////////////////
// Get product collection from db
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title] = items;
    return acc;
  }, {});

  return categoryMap;
};

//////////////////////////////////////////////////
// Add user collection to db
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

/////////////////////////////////////////////////
// Create user with email and pasword
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

/////////////////////////////////////////////////
// Signin with email and pasword
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

/////////////////////////////////////////////////
// Sign out
export const signOutUser = async () => await signOut(auth);

/////////////////////////////////////////////////
// user authentication check automatically
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
