import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ-WV3CzQ-kZBqAf3gsc1a5-PWIuZ1LjY",
  authDomain: "thechatbot-561d9.firebaseapp.com",
  projectId: "news-app-78490",
  // storageBucket: "thechatbot-561d9.appspot.com",
  // messagingSenderId: "153057764850",
  // appId: "1:153057764850:web:2d657c2a324664cf9c376b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
export { auth, db };
