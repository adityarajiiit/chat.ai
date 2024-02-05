
import { initializeApp  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signOut, GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmDQO5i940Lnh0KtRbjkuoRj1GFAZ80oI",
    authDomain: "chat-c17d6.firebaseapp.com",
    projectId: "chat-c17d6",
    storageBucket: "chat-c17d6.appspot.com",
    messagingSenderId: "590425564864",
    appId: "1:590425564864:web:ca2104b170fa49a4c7af25",
    measurementId: "G-T5KGJ89DJY"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const profilepicture = document.getElementById("photo");

// Initialize Firebase

const analytics = getAnalytics(app);
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;


document.getElementById("goo").addEventListener("click",function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
window.open("/chhat");
window.close("/");
window.close();

            // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });});

document.getElementById("goo").addEventListener("touchstart",function() {
        signInWithPopup(auth, provider)
            .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    console.log(user);
                    window.open("/chhat");
                    window.close("/");
                    window.close();

                    // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
        });});

