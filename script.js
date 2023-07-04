// Validation
function validation() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const rollno = document.getElementById("rollno").value;

  if (name == "") {
    alert("Please enter name, field cannot be empty");
    return false;
  }

  if (email == "") {
    alert("Please enter you email id");
  } else if (!email.includes("@")) {
    alert("Please enter valid email id");
    return false;
  }

  if (rollno == "") {
    alert("Please enter Roll no.");
    return false;
  }

  return true;
}

// Setting data from form to local storage
function onSubmit() {
  if (validation() == true) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rollno = document.getElementById("rollno").value;

    let studentData = [];
    if (localStorage.getItem("studentData") == null) {
      studentData = [];
    } else {
      studentData = JSON.parse(localStorage.getItem("studentData"));
    }

    studentData.push({
      name: name,
      email: email,
      rollno: rollno,
    });
    localStorage.setItem("studentData", JSON.stringify(studentData));
    show();
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("rollno").value = "";
  }
}

// Display data from local storage
const show = () => {
  let studentData = [];
  if (localStorage.getItem("studentData") == null) {
    studentData = [];
  } else {
    studentData = JSON.parse(localStorage.getItem("studentData"));
  }

  let html = "";
  studentData.forEach((item, index) => {
    html += `
            <tr>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.rollno}</td>
                <td>
                    <button class="btn btn-warning" onclick="(updateData('${index}'))">Edit</button>
                    <button class="btn btn-danger" onclick="(deleteData('${index}'))">Delete</button>
                </td>
            </tr>
        `;
  });
  document.querySelector("tbody").innerHTML = html;
};

// Delete data from table and local storage
const deleteData = (index) => {
  let studentData = [];
  if (localStorage.getItem("studentData") == null) {
    studentData = [];
  } else {
    studentData = JSON.parse(localStorage.getItem("studentData"));
  }

  studentData.splice(index, 1);
  localStorage.setItem("studentData", JSON.stringify(studentData));
  show();
};

// Edit data from table and local storage
const updateData = (TableIndex) => {
  document.getElementById("update").style.display = "block";
  document.getElementById("submit").style.display = "none";

  let studentData = [];
  if (localStorage.getItem("studentData") == null) {
    studentData = [];
  } else {
    studentData = JSON.parse(localStorage.getItem("studentData"));
  }

  document.getElementById("name").value = studentData[TableIndex]?.name;
  document.getElementById("email").value = studentData[TableIndex]?.email;
  document.getElementById("rollno").value = studentData[TableIndex]?.rollno;

  document.querySelector("#update").onclick = function () {
    if (validation() == true) {
      console.log("You have clicked update button");
      studentData[TableIndex].name = document.getElementById("name").value;
      studentData[TableIndex].email = document.getElementById("email").value;
      studentData[TableIndex].rollno = document.getElementById("rollno").value;

      localStorage.setItem("studentData", JSON.stringify(studentData));
      show();

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("rollno").value = "";

      document.getElementById("update").style.display = "none";
      document.getElementById("submit").style.display = "block";
    }
  };
};

document.onload = show();
