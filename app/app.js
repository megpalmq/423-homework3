/**
 * The JavaScript code defines functions to handle student registration form submission, storing
 * student data in local storage, and displaying registered students with their information and photo
 * if available.
 * @returns The code provided is a JavaScript program that handles student registration and display. It
 * includes functions to add a student to local storage, display all registered students, and
 * initialize event listeners for form submission. The main functionality involves capturing student
 * information from a form, processing it, and displaying the registered students with their details
 * and photo (if provided).
 */
function initListeners() {
  $("#studentForm").on("submit", function (e) {
    e.preventDefault();

    let name = $("#name").val().trim();
    let age = $("#age").val().trim();
    let phone = $("#phone").val().trim();
    let email = $("#email").val().trim();
    let classes = $("#classes").val().trim();
    let file = $("#photo")[0]?.files[0];

    if (!name || !age || !phone || !email || !classes) {
      alert("hey fill out everything or else >:(");
      return;
    }

    let newArrClasses = classes.split(",").map((item) => item.trim());

    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        let studentObj = {
          name,
          age,
          phone,
          email,
          classes: newArrClasses,
          photo: event.target.result,
        };
        addStudent(studentObj);
        displayStudents();
      };
      reader.readAsDataURL(file);
    } else {
      let studentObj = {
        name,
        age,
        phone,
        email,
        classes: newArrClasses,
        photo: "",
      };
      addStudent(studentObj);
      displayStudents();
    }

    this.reset();
  });
}

function addStudent(student) {
  let allStudents = JSON.parse(localStorage.getItem("students")) || [];
  allStudents.push(student);
  localStorage.setItem("students", JSON.stringify(allStudents));
}

function displayStudents() {
  $("#studentList").empty();

  let allStudents = JSON.parse(localStorage.getItem("students")) || [];

  if (allStudents.length === 0) {
    $("#studentList").html("<p>No students registered yet.</p>");
    return;
  }

  $.each(allStudents, (index, student) => {
    $("#studentList").append(`
      <div class="student-card">
        <div class="student-photo">
          ${
            student.photo
              ? `<img src="${student.photo}" alt="ID Photo" />`
              : `<div class="placeholder">No Photo</div>`
          }
        </div>
        <div class="student-info">
          <h3>${student.name} <span class="age">(Age: ${
      student.age
    })</span></h3>
          <p><strong>Phone:</strong> ${student.phone}</p>
          <p><strong>Email:</strong> ${student.email}</p>
          <p><strong>Classes:</strong> <span class="classes">${student.classes.join(
            ", "
          )}</span></p>
        </div>
      </div>
    `);
  });
}

$(document).ready(function () {
  initListeners();
  displayStudents();
});
