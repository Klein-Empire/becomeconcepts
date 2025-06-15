
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdWNgH4uN_7ObDLEr4liB3wpA43NZiBRA",
  authDomain: "becomeconcepts-c9b91.firebaseapp.com",
  projectId: "becomeconcepts-c9b91",
  storageBucket: "becomeconcepts-c9b91.appspot.com",
  messagingSenderId: "1062361004464",
  appId: "1:1062361004464:web:78bf524728030c0453fe75",
  measurementId: "G-1QHX4XTESL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, storage, auth, app, analytics };
