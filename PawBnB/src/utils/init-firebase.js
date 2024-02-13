// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChbcGXTLzSP0Et8BQBOLuh8BhBknO_xrY",
    authDomain: "pawbnb-app.firebaseapp.com",
    projectId: "pawbnb-app",
    storageBucket: "pawbnb-app.appspot.com",
    messagingSenderId: "711929885597",
    appId: "1:711929885597:web:54e5b8d360def02cd57574",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

