import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxrqfQ6LOYDq0AxD8iYG9sKxDGL5FI9o4",
  authDomain: "my-react-app-ca92e.firebaseapp.com",
  projectId: "my-react-app-ca92e",
  storageBucket: "my-react-app-ca92e.appspot.com",
  messagingSenderId: "258235587630",
  appId: "1:258235587630:web:2c39eb43e0fde5fd6513bf",
  databaseURL: "https://my-react-app-ca92e-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
