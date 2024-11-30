const contractAddress = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34"; // Replace with your contract address
const contractABI = [{"anonymous":false,"name":"StudentAddedOrUpdated","inputs":[{"indexed":false,"name":"nim","type":"uint256","internalType":"uint256"},{"indexed":false,"name":"name","type":"string","internalType":"string"}],"type":"event","payable":false},{"constant":false,"name":"addStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"},{"name":"_name","type":"string","internalType":"string"},{"name":"_gender","type":"string","internalType":"string"},{"name":"_birthDate","type":"string","internalType":"string"},{"name":"_city","type":"string","internalType":"string"},{"name":"_yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"_program","type":"string","internalType":"string"},{"name":"_gpa","type":"uint256","internalType":"uint256"}],"outputs":[],"type":"function","payable":false,"stateMutability":"nonpayable"},{"constant":false,"name":"getStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"studentCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"students","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"name","type":"string","internalType":"string"},{"name":"nim","type":"uint256","internalType":"uint256"},{"name":"gender","type":"string","internalType":"string"},{"name":"birthDate","type":"string","internalType":"string"},{"name":"city","type":"string","internalType":"string"},{"name":"yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"program","type":"string","internalType":"string"},{"name":"gpa","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"}];

let web3 = new Web3("http://10.17.5.103:22000"); // RPC URL of your Quorum node

let web3;
let contract;

document.addEventListener("DOMContentLoaded", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Metamask not found");
    return;
  }

  // Form submission to add/update student
  document.getElementById("studentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nim = document.getElementById("nim").value;
    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const birthDate = document.getElementById("birthDate").value;
    const city = document.getElementById("city").value;
    const yearOfEntry = document.getElementById("yearOfEntry").value;
    const program = document.getElementById("program").value;
    const gpa = document.getElementById("gpa").value;

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .addStudent(nim, name, gender, birthDate, city, yearOfEntry, program, gpa)
        .send({ from: accounts[0] });

      alert("Student data added/updated successfully");
      displayStudentData(nim);
    } catch (error) {
      console.error(error);
      alert("Failed to add/update student");
    }
  });
});

// Function to display student data
async function displayStudentData(nim) {
  try {
    const student = await contract.methods.getStudent(nim).call();
    const studentDetailsDiv = document.getElementById("studentDetails");
    studentDetailsDiv.innerHTML = `
      <p><strong>Name:</strong> ${student[0]}</p>
      <p><strong>NIM:</strong> ${student[1]}</p>
      <p><strong>Gender:</strong> ${student[2]}</p>
      <p><strong>Birth Date:</strong> ${student[3]}</p>
      <p><strong>City:</strong> ${student[4]}</p>
      <p><strong>Year of Entry:</strong> ${student[5]}</p>
      <p><strong>Program:</strong> ${student[6]}</p>
      <p><strong>GPA:</strong> ${student[7]}</p>
    `;
  } catch (error) {
    console.error(error);
    alert("Failed to retrieve student data");
  }
}

