let users = JSON.parse(localStorage.getItem("users")) || [];

document.querySelector("#addBtn").onclick = function() {

  let name = document.querySelector("#nameInput").value;

  let age = document.querySelector("#ageInput").value;

  let city = document.querySelector("#cityInput").value;

  let interest = document.querySelector("#interestInput").value;

  let bio = document.querySelector("#bioInput").value;

  if (name === "") {

    alert("נא להזין שם");

    return;

  }

  if (city === "") {

    alert("נא להזין אזור מגורים");

    return;

  }for (let i = 0; i < users.length; i++) {

  if (users[i].name === name && users[i].city === city) {

    alert("המשתמש הזה כבר קיים בקהילה");

    return;

  }

}

  users.push({

    name: name,

    age: age,

    city: city,

    interest: interest,

    bio: bio

  });

  localStorage.setItem("users", JSON.stringify(users));

  showUsers();

  alert("ברוך הבא לקהילת Bridge 🎉");

};

function showUsers() {

  let html = "<h3>חברי הקהילה:</h3>";

  for (let i = 0; i < users.length; i++) {

    html += "<p>👤 " +

      users[i].name +

      " - גיל " +

      users[i].age +

      " - " +

      users[i].city +

      " - " +

      users[i].interest +

      "<br>" +

      users[i].bio +

      "</p>";

  }

 document.querySelector("#communityCount").innerHTML =

"👥 חברים בקהילה: " + users.length; document.querySelector("#friends").innerHTML = html;

}

document.querySelector("#matchBtn").onclick = function() {

  let city = document.querySelector("#cityInput").value;

  let interest = document.querySelector("#interestInput").value;

  let html = "<h3>אנשים שמתאימים לך:</h3>";

  for (let i = 0; i < users.length; i++) {

    if (users[i].city === city && users[i].interest === interest) {

      html += "<p>🤝 " +

        users[i].name +

        " - גיל " +

        users[i].age +

        " - " +

        users[i].city +

        " - " +

        users[i].interest +

        "<br>" +

        users[i].bio +

        "</p>";

    }

  }

  document.querySelector("#matches").innerHTML = html;

};

showUsers();
