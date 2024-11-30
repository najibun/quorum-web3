const contractAddress = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34"; // Replace with your contract address
const contractABI = [{"anonymous":false,"name":"StudentAddedOrUpdated","inputs":[{"indexed":false,"name":"nim","type":"uint256","internalType":"uint256"},{"indexed":false,"name":"name","type":"string","internalType":"string"}],"type":"event","payable":false},{"constant":false,"name":"addStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"},{"name":"_name","type":"string","internalType":"string"},{"name":"_gender","type":"string","internalType":"string"},{"name":"_birthDate","type":"string","internalType":"string"},{"name":"_city","type":"string","internalType":"string"},{"name":"_yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"_program","type":"string","internalType":"string"},{"name":"_gpa","type":"uint256","internalType":"uint256"}],"outputs":[],"type":"function","payable":false,"stateMutability":"nonpayable"},{"constant":false,"name":"getStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"studentCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"students","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"name","type":"string","internalType":"string"},{"name":"nim","type":"uint256","internalType":"uint256"},{"name":"gender","type":"string","internalType":"string"},{"name":"birthDate","type":"string","internalType":"string"},{"name":"city","type":"string","internalType":"string"},{"name":"yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"program","type":"string","internalType":"string"},{"name":"gpa","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"}];

let web3 = new Web3("http://10.17.5.103:22000"); // RPC URL of your Quorum node
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getStudent() {
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
}

// Handle student data update
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
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addStudent(
      nim, name, gender, birthDate, city, yearOfEntry, studyProgram, gpa
    ).send({ from: accounts[0] });

    alert("Student updated successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to update student");
  }
});

