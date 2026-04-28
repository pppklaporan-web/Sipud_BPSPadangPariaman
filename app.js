import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


/* ======================
   1. CONFIG FIREBASE
====================== */

const firebaseConfig = {
  apiKey: "AIzaSyC3KLUcPszMKpEbxNNSiwIhH4lRjj_102Q",
  authDomain: "sipud1306-af588.firebaseapp.com",
  projectId: "sipud1306-af588",
  appId: "1:520121031436:web:0a21b887ab426f54160729"
};


/* ======================
   2. HUBUNGKAN FIREBASE
====================== */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


/* ======================
   3. LOGIN GOOGLE
====================== */

window.loginGoogle = function () {
    alert("Tombol login berfungsi");
}

  signInWithPopup(auth, provider)
    .then((result) => {

      const user = result.user;

      alert("Selamat datang " + user.displayName);

      window.location.href = "index.html";

    })
    .catch((error) => {

      alert("Login gagal!");

      console.log(error);

    });
};


/* ======================
   4. CEK STATUS LOGIN
====================== */

onAuthStateChanged(auth, (user) => {

  if (user) {

    console.log("Login aktif:", user.email);

  } else {

    console.log("Belum login");

  }

});


/* ======================
   5. LOGOUT
====================== */

window.logoutUser = function () {

  signOut(auth)
    .then(() => {

      alert("Logout berhasil");

      window.location.href = "login.html";

    });

};