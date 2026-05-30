import { initializeApp } from "firebase/app";

import { getDatabase }
from "firebase/database";

import { getAuth }
from "firebase/auth";

const firebaseConfig = {
  apiKey:
    "AIzaSyDXOznfs0gkzvvfBIx6SMU8hpmVCJAToLk",

  authDomain:
    "loocals-788bd.firebaseapp.com",

  databaseURL:
    "https://loocals-788bd-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId:
    "loocals-788bd",

  storageBucket:
    "loocals-788bd.firebasestorage.app",

  messagingSenderId:
    "926951487177",

  appId:
    "1:926951487177:web:a830b30851fdd91b13f18",
};

// INITIALIZE
const app =
  initializeApp(
    firebaseConfig
  );

// DATABASE
export const db =
  getDatabase(app);

// AUTH
export const auth =
  getAuth(app);

export default app;