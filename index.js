
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import { getRedirectResult } from "firebase/auth";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const provider = new GoogleAuthProvider();

import { initializeApp } from 'firebase/app';


import {resolveInclude} from "ejs";
import firebaseConfig from "./public/firebase.js";

const app = initializeApp(firebaseConfig);



const auth = getAuth();







var google =true;
var signin =true;
var create =true;
const ap =express();
const port =3000;


ap.use(bodyParser.urlencoded({ extended: true }));
ap.use(express.static("public"));
ap.get("/",(req,res)=> {
    res.render("index.ejs");

});
ap.post("/submit",(req,res)=> {

    const email = req.body.email;
    const password = req.body.password;
    const state=req.body.risha;



console.log(req.body);

    if(state==="create") {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log(user);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });}
    else if(state==="sign") {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;

            res.render("chat.ejs");

            // ...
        } else {
            // User is signed out
            // ...
        }
    });

});
ap.get("/chhat",(req,res)=>{
   res.render("chat.ejs");
});
// ap.get("/submit",(req,res)=> {
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             console.log("logged in")
//             res.render("chat.ejs");
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/auth.user
//             const uid = user.uid;
//             // ...
//         } else {
//             // User is signed out
//             console.log("logout")
//             // ...
//         }
//     });
// })

//






ap.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});