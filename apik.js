// Ganti endpoint sesuai dengan alamat backend
const backendURL = "http://139.180.134.97/express";

async function getStudent() {
  const nim = document.getElementById("nim").value;

  if (!nim) {
    alert("Please enter NIM.");
    return;
  }

  try {
    const response = await fetch(`${backendURL}/getStudent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 'nim': nim }),
    });

	console.log(response);

    if (!response.ok) {
      alert("Data tidak ditemukan");
      hideDetail();
      disableEdit();
      return;
    }

    const data = await response.json();
	console.log(data);
    // Show student details
    showDetail();
    studentData = data;

    document.getElementById("studentDetails").innerHTML = `
      Name: ${data.name}<br>
      Gender: ${data.gender}<br>
      Birth Date: ${data.birthDate}<br>
      City: ${data.city}<br>
      Year of Entry: ${data.yearOfEntry}<br>
      Program: ${data.studyProgram}<br>
      GPA: ${data.gpa}
    `;

    // Show edit button
    document.getElementById("editButton").style.display = "block";
    disableEdit();
  } catch (error) {
    console.error(error);
    alert("Failed to get student info.");
  }
}

document.getElementById("updateForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nim = document.getElementById("nim").value;
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const birthDate = document.getElementById("birthDate").value;
  const city = document.getElementById("city").value;
  const yearOfEntry = document.getElementById("yearOfEntry").value;
  const studyProgram = document.getElementById("studyProgram").value;
  const gpa = document.getElementById("gpa").value;

  try {
    const response = await fetch(`${backendURL}/updateStudent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nim,
        name,
        gender,
        birthDate,
        city,
        yearOfEntry,
        studyProgram,
        gpa,
      }),
    });

    const result = await response.json();
    alert(result.message);
    hideDetail();
    disableEdit();
  } catch (error) {
    console.error(error);
    alert("Failed to update student.");
  }
});

