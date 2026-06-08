import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// הדבק כאן את firebaseConfig שלך מ-Firebase
const firebaseConfig = {

  apiKey: "AIzaSyDbcbj-ctvoWX1rNHSY7q325kKGtYkal9M",

  authDomain: "bridge-9df1d.firebaseapp.com",

  projectId: "bridge-9df1d",

  storageBucket: "bridge-9df1d.firebasestorage.app",

  messagingSenderId: "189361266838",

  appId: "1:189361266838:web:980d9e7fbd6e7971b322b7",

  measurementId: "G-BC6J6YN0Y0"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




const db = getFirestore(app);

async function showUsers() {

  const usersBox = document.querySelector("#friends");

  usersBox.innerHTML = "<h3>חברי הקהילה:</h3>";

  const querySnapshot = await getDocs(collection(db, "users"));

  document.querySelector("#communityCount").innerHTML =

    "👥 " + querySnapshot.size + " חברים בקהילה";

  querySnapshot.forEach((doc) => {

    const user = doc.data();

    usersBox.innerHTML += `

      <p>👤 ${user.name} - גיל ${user.age} - ${user.city} - ${user.interest || user.hobby}<br>

      ${user.bio || ""}</p>

    `;

  });

}

document.querySelector("#addBtn").onclick = async function () {

  const name = document.querySelector("#nameInput").value;

  const age = document.querySelector("#ageInput").value;

  const city = document.querySelector("#cityInput").value;

  const interest = document.querySelector("#interestInput").value;

  const bio = document.querySelector("#bioInput").value;

  if (name === "") {

    alert("נא להזין שם");

    return;

  }

  if (city === "") {

    alert("נא להזין אזור מגורים");

    return;

  }

  await addDoc(collection(db, "users"), {

    name: name,

    age: Number(age),

    city: city,

    interest: interest,

    bio: bio

  });

  alert("🎉 ברוך הבא לקהילת Bridge");

  showUsers();

};

showUsers();
