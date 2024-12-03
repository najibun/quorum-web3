const contractAddress = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34"; // Replace with your contract address
const contractABI = [{"anonymous":false,"name":"StudentAddedOrUpdated","inputs":[{"indexed":false,"name":"nim","type":"uint256","internalType":"uint256"},{"indexed":false,"name":"name","type":"string","internalType":"string"}],"type":"event","payable":false},{"constant":false,"name":"addStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"},{"name":"_name","type":"string","internalType":"string"},{"name":"_gender","type":"string","internalType":"string"},{"name":"_birthDate","type":"string","internalType":"string"},{"name":"_city","type":"string","internalType":"string"},{"name":"_yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"_program","type":"string","internalType":"string"},{"name":"_gpa","type":"uint256","internalType":"uint256"}],"outputs":[],"type":"function","payable":false,"stateMutability":"nonpayable"},{"constant":false,"name":"getStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"studentCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"students","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"name","type":"string","internalType":"string"},{"name":"nim","type":"uint256","internalType":"uint256"},{"name":"gender","type":"string","internalType":"string"},{"name":"birthDate","type":"string","internalType":"string"},{"name":"city","type":"string","internalType":"string"},{"name":"yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"program","type":"string","internalType":"string"},{"name":"gpa","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"}];

//let web3 = new Web3("http://139.180.134.97/node1/"); // RPC URL of your Quorum 7 nodes
 let web3 = new Web3("http://139.180.134.97/node2/"); // RPC URL of your Quorum 4 nodes
const contract = new web3.eth.Contract(contractABI, contractAddress);

/*async function getStudent() {
  const nim = document.getElementById("nim").value;
  
  try {
    const student = await contract.methods.getStudent(nim).call();
    
    const studentDetails = `
      <strong>Name:</strong> ${student[0]}<br>
      <strong>NIM:</strong> ${student[1]}<br>
      <strong>Gender:</strong> ${student[2]}<br>
      <strong>Birth Date:</strong> ${student[3]}<br>
      <strong>City:</strong> ${student[4]}<br>
      <strong>Year of Entry:</strong> ${student[5]}<br>
      <strong>Program:</strong> ${student[6]}<br>
      <strong>GPA:</strong> ${student[7]}
    `;
    
    document.getElementById("studentDetails").innerHTML = studentDetails;

    // Display edit form and populate with student data
    document.getElementById("editForm").style.display = 'block';
    document.getElementById("name").value = student[0];
    document.getElementById("gender").value = student[2];
    document.getElementById("birthDate").value = student[3];
    document.getElementById("city").value = student[4];
    document.getElementById("yearOfEntry").value = student[5];
    document.getElementById("studyProgram").value = student[6];
    document.getElementById("gpa").value = student[7];
  } catch (error) {
    console.error("Error retrieving student:", error);
    document.getElementById("studentDetails").innerHTML = "Error retrieving student data";
  }
};*/

// Handle student data update
document.getElementById("updateForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nim = document.getElementById("nim").value;
  document.getElementById("yearOfEntry").disabled = false;
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const birthDate = document.getElementById("birthDate").value;
  const city = document.getElementById("city").value;
  const yearOfEntry = document.getElementById("yearOfEntry").value;
  const studyProgram = document.getElementById("studyProgram").value;
  const gpa = document.getElementById("gpa").value;

  try {
    const accounts = await web3.eth.getAccounts();
 console.log(accounts); 
// Loop for 100 block
// for(let i=0; i<200; i++){
 await contract.methods.addStudent(
      nim, name, gender, birthDate, city, yearOfEntry, studyProgram, gpa
    ).send({ from: accounts[0], gas: '1000000', gasPrice:0 });
// }
// End Loop
   hideDetail();
   disableEdit();
   alert("Student updated successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to update student");
  }
});

let studentData = {};

function getStudent() {
  const nim = document.getElementById("nim").value;
  
  if (nim) {
    // Assume web3 and contract initialization is done
    contract.methods.getStudent(nim).call()
      .then(data => {
	if (data[1]==0){
	alert("Data tidak ditemukan");
	hideDetail();
	disableEdit();
	}else{
	// Show student Detail
	showDetail();
        studentData = {
          nim: data[1],
          name: data[0],
          gender: data[2],
          birthDate: data[3],
          city: data[4],
          yearOfEntry: data[5],
          program: data[6],
          gpa: data[7]
        };
        
        document.getElementById("studentDetails").innerHTML = `
          Name: ${data[0]}<br>
          Gender: ${data[2]}<br>
          Birth Date: ${data[3]}<br>
          City: ${data[4]}<br>
          Year of Entry: ${data[5]}<br>
          Program: ${data[6]}<br>
          GPA: ${data[7]}
        `;

	// Hide Form Edit
	disableEdit(); 
       
        // Show the edit button
        document.getElementById("editButton").style.display = "block";
	}
      })
      .catch(error => {
        console.error(error);
        alert("Failed to get student info.");
      });
  } else {
    alert("Please enter NIM.");
  }
}

function enableEdit() {
  // Fill the form with the fetched data
  document.getElementById("name").value = studentData.name;
  document.getElementById("gender").value = studentData.gender;
  document.getElementById("birthDate").value = studentData.birthDate;
  document.getElementById("city").value = studentData.city;
  document.getElementById("yearOfEntry").value = studentData.yearOfEntry;
  document.getElementById("studyProgram").value = studentData.program;
  document.getElementById("gpa").value = studentData.gpa;

  // Show the form and enable inputs
  document.getElementById("editForm").style.display = "block";
  document.getElementById("name").disabled = false;
  document.getElementById("gender").disabled = false;
  document.getElementById("birthDate").disabled = false;
  document.getElementById("city").disabled = false;
  document.getElementById("yearOfEntry").disabled = false;
  document.getElementById("studyProgram").disabled = false;
  document.getElementById("gpa").disabled = false;
  document.querySelector("button[type='submit']").disabled = false;
}
function disableEdit() {
  // Hide the form and enable inputs
  document.getElementById("editForm").style.display = "none";
}
function showDetail() {
  // Show the form and enable inputs
  document.getElementById("studentInfo").style.display = "block";
}
function hideDetail() {
  // Hide the form and enable inputs
  document.getElementById("studentInfo").style.display = "none";
}
/*document.getElementById("updateForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const updatedData = {
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    birthDate: document.getElementById("birthDate").value,
    city: document.getElementById("city").value,
    yearOfEntry: document.getElementById("yearOfEntry").value,
    program: document.getElementById("studyProgram").value,
    gpa: document.getElementById("gpa").value
  };

  // Call the smart contract to update the student data
  contract.methods.addStudent(
    studentData.nim, 
    updatedData.name, 
    updatedData.gender, 
    updatedData.birthDate, 
    updatedData.city, 
    updatedData.yearOfEntry, 
    updatedData.program, 
    updatedData.gpa
  ).send({ from: web3.eth.accounts[1] })
    .then(() => {
      alert("Student info updated successfully.");
      document.getElementById("editForm").style.display = "none";
    })
    .catch(error => {
      console.error(error);
      alert("Failed to update student info.");
    });
});*/

