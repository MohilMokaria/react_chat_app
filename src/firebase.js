import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBsp7_1nMf9jP5hNO7uu6t7K0UH1JOmug",
  authDomain: "message-4c0ce.firebaseapp.com",
  projectId: "message-4c0ce",
  storageBucket: "message-4c0ce.appspot.com",
  messagingSenderId: "274809898249",
  appId: "1:274809898249:web:70b082934530744bf57fd8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
