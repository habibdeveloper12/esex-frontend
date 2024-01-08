// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHwVRqGMtaaLkOj7vgmx7EBD5KS1tLWo8",

  authDomain: "easyex-7283f.firebaseapp.com",

  projectId: "easyex-7283f",

  storageBucket: "easyex-7283f.appspot.com",

  messagingSenderId: "245935123073",

  appId: "1:245935123073:web:ea442ae16d49484cddfb80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
