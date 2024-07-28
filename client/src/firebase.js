import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-cbc9a.firebaseapp.com",
  projectId: "mern-blog-cbc9a",
  storageBucket: "mern-blog-cbc9a.appspot.com",
  messagingSenderId: "201153701560",
  appId: "1:201153701560:web:34656e29b8722eb288b64d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
