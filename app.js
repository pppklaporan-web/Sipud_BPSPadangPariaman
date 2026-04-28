import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyC3KLUcPszMKpEbxNNSiwIhH4lRjj_102Q",
  authDomain: "sipud1306-af588.firebaseapp.com",
  projectId: "sipud1306-af588",
  appId: "1:520121031436:web:0a21b887ab426f54160729"
};


// INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// LOGIN GOOGLE
window.loginGoogle = function () {

  signInWithPopup(auth, provider)
    .then(() => {

      window.location.href = "sipud.html";

    })
    .catch((error) => {

      alert("Login gagal");
      console.log(error);

    });

};


// AUTO REDIRECT JIKA SUDAH LOGIN
onAuthStateChanged(auth, (user) => {

  if (user && location.pathname.includes("index")) {
    window.location.href = "sipud.html";
  }

});


// LOGOUT
window.logoutUser = function () {

  signOut(auth).then(() => {
    window.location.href = "index.html";
  });

};
