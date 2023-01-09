import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDWtG05IUvsLuhu1_xD-wgAf8SCyx5gWtU",
  authDomain: "ecommerce-61efd.firebaseapp.com",
  projectId: "ecommerce-61efd",
  storageBucket: "ecommerce-61efd.appspot.com",
  messagingSenderId: "428991720876",
  appId: "1:428991720876:web:40f1c756fa9f7bb5055e09",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
