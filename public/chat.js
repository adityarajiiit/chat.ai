import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {GoogleGenerativeAI} from "https://esm.run/@google/generative-ai";
import API_KEY from "./apikey.js";
import firebaseConfig from "./firebase.js";

const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const app = initializeApp(firebaseConfig);
const auth = getAuth();const user = auth.currentUser;
const provider = new GoogleAuthProvider();
const profilepicture = document.getElementById("photo");



function showProfilePicture(imgElement, user) {

    const photoURL = user.photoURL
    console.log(photoURL);
    if (photoURL) {
        imgElement.src = photoURL
    } else {
        imgElement.src = "illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    }
}
document.getElementById("svg").addEventListener("click",function () {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.open("/");
        window.close("/submit");
    }).catch((error) => {
        // An error happened.
    });

});
onAuthStateChanged(auth, (user) => {
    if (user) {
        if(user.displayName!==null) {
        showProfilePicture(profilepicture,user);
        const displayName = user.displayName;
        document.getElementById("afc").innerHTML=displayName;}

    } else {

    }
});

//
// document.getElementById("ppp").addEventListener("click",async function () {
//     var inp = document.getElementById("text").value;
//     const chat = model.startChat({
//         history: [
//
//         ],
//         generationConfig: {
//             maxOutputTokens: 100,
//         },
//     });
//
//     const msg = inp;
//
//     const result = await chat.sendMessage(msg);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//     const newDiv = document.createElement("li");
//
//     newDiv.innerHTML = inp;
//     newDiv.classList.add("cdf");
//     document.getElementById("mes").appendChild(newDiv);
//     inp.value = "";
//     const bot=document.createElement("li");
//     bot.innerHTML=text;
//     bot.classList.add("cdi");
//     document.getElementById("mes").appendChild(bot);
//
// });
document.getElementById("ppp").addEventListener("click", async function () {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        document.getElementById("message").style.display="block";
        const inp = document.getElementById("text").value;
        const prompt = inp;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);

console.log(text);

        const newDiv = document.createElement("li");
        newDiv.classList.add("cdf");
        newDiv.textContent = inp;
        document.getElementById("mes").appendChild(newDiv);

        const bot = document.createElement("li");
        bot.classList.add("cdi");
        bot.textContent = text;
        document.getElementById("mes").appendChild(bot);
        document.getElementById("message").classList.add("toy");
        inp.value = "";
    } catch (error) {
        console.error("Error:", error);
    }
});
// let count=0;
// document.getElementById("h").addEventListener("click", function () {
//     count++;
//     console.log("hi")
//     document.getElementById("vv").style.display="block";
//     if(count>1) {
//     const container = document.getElementById("vv-container");
//
//     const newDiv = document.createElement("div");
//     newDiv.classList.add("vv");
//
//     container.appendChild(newDiv);}
// });
document.getElementById("h").addEventListener("click", function () {
    try {
        const inp = document.getElementById("text").value;
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        async function fileToGenerativePart(file) {
            try {
                const base64EncodedDataPromise = new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result.split(',')[1]);
                    reader.readAsDataURL(file);
                });
                return {
                    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
                };
            } catch (error) {
                console.error("Error converting file to part:", error);
                throw error;
            }
        }

        async function run() {
            try {

                const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
                const prompt = inp;
                document.getElementById("message").style.display = "block";

                const fileInputEl = document.getElementById("gemi");
                const imageParts = await Promise.all(
                    [...fileInputEl.files].map(fileToGenerativePart)
                );

                const result = await model.generateContent([prompt, ...imageParts]);
                const response = await result.response;
                const text = await response.text();

                console.log(text);

        const newDiv = document.createElement("li");
        newDiv.classList.add("cdf");
        newDiv.textContent = inp;
        document.getElementById("mes").appendChild(newDiv);

        const bot = document.createElement("li");
        bot.classList.add("cdi");
        bot.textContent = text;
        document.getElementById("mes").appendChild(bot);
        document.getElementById("message").classList.add("toy");
        inp.value = "";


            } catch (error) {
                console.error("Error generating content:", error);

            }
        }

        run();
    } catch (error) {
        console.error("General error:", error);

    }
});