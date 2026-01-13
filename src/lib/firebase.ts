
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCR1Mkg_2s6-Pg4OdnhqRjLgoEMjM40PQQ",
    authDomain: "theion-fd3e5.firebaseapp.com",
    projectId: "theion-fd3e5",
    storageBucket: "theion-fd3e5.firebasestorage.app",
    messagingSenderId: "200325602910",
    appId: "1:200325602910:web:f1dec3fb83af18a44fdecf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
