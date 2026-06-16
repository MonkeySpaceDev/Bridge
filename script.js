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

async function showQuestions() {

  const questionsList = document.querySelector("#questionsList");

  if (!questionsList) return;

  questionsList.innerHTML = "<h3>שאלות בקהילה</h3>";

  const querySnapshot = await getDocs(collection(db, "question"));

  querySnapshot.forEach((docSnap) => {

    const question = docSnap.data();

    questionsList.innerHTML += `

      <div class="questionCard">

        <h3>${question.title}</h3>

        <p><b>קטגוריה:</b> ${question.category}</p>

        <p>${question.content}</p>

        <button onclick="fillQuestionId('${docSnap.id}')">להגיב לשאלה</button>

        <div id="answers-${docSnap.id}"></div>

        <hr>

      </div>

    `;

  });

}

  





document.querySelector("#questionBtn").onclick = async function () {

  const title = document.querySelector("#questionTitle").value;

  const category = document.querySelector("#questionCategory").value;

  const content = document.querySelector("#questionContent").value;

  if (title === "" || content === "") {

    alert("נא למלא כותרת ותוכן");

    return;

  }

  await addDoc(collection(db, "question"), {

    title: title,

    category: category,

    content: content,

    createdAt: Date.now()

  });

  alert("השאלה פורסמה בהצלחה");

  document.querySelector("#questionTitle").value = "";

  document.querySelector("#questionContent").value = "";

  showQuestions();

};

window.fillQuestionId = function(id) {

  document.querySelector("#answerQuestionId").value = id;

};

async function loadAnswers(questionId) {

  const querySnapshot = await getDocs(collection(db, "answers"));

  let html = "";

  querySnapshot.forEach((doc) => {

    const answer = doc.data();

    if (answer.questionId === questionId) {

      html += `<p>💬 ${answer.content}</p>`;

    }

  });

  const container = document.querySelector(`#answers-${questionId}`);

  if (container) {

    container.innerHTML = html;

  }

}

document.querySelector("#answerBtn").onclick = async function () {

  const questionId = document.querySelector("#answerQuestionId").value;

  const content = document.querySelector("#answerContent").value;

  if (questionId === "" || content === "") {

    alert("מלא מזהה שאלה ותוכן תגובה");

    return;

  }

  await addDoc(collection(db, "answers"), {

    questionId: questionId,

    content: content,

    createdAt: Date.now()

  });

  alert("תגובה נשלחה");

  document.querySelector("#answerQuestionId").value = "";

  document.querySelector("#answerContent").value = "";

  showQuestions();

};

showUsers();

showQuestions();



window.showSection = function(sectionId) {

  const sections = ["connectSection", "questionSection", "storiesSection"];

  sections.forEach(function(id) {

    const section = document.querySelector("#" + id);

    if (section) {

      section.style.display = "none";

    }

  });

  const selectedSection = document.querySelector("#" + sectionId);

  if (selectedSection) {

  
selectedSection.classList.add("open");

selectedSection.style.display = "block";
    

  }

};
window.showSection = function(sectionId) {

  const sections = ["connectSection", "questionSection", "storiesSection"];

  sections.forEach(function(id) {

    const section = document.querySelector("#" + id);

    if (section) {

      section.style.display = "none";

    }

  });

  const selectedSection = document.querySelector("#" + sectionId);

  if (selectedSection) {

    selectedSection.style.display = "block";

  }

};
const enterBtn = document.querySelector("#enterBtn");

if (enterBtn) {

  enterBtn.addEventListener("click", function () {

    document.querySelector("#landingPage").style.display = "none";

    document.querySelector("#homePage").style.display = "block";

  });

}
const storyBtn = document.querySelector("#storyBtn");

if (storyBtn) {

  storyBtn.addEventListener("click", async function () {

    const content = document.querySelector("#storyContent").value.trim();

    if (content === "") {

      alert("כתוב סיפור לפני הפרסום");

      return;

    }

    await addDoc(collection(db, "stories"), {

      content: content,

      createdAt: Date.now()

    });

    alert("הסיפור פורסם בהצלחה");

    document.querySelector("#storyContent").value = "";

  });

}
