const contractAddress = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34"; // Replace with your contract address
const contractABI = [{"anonymous":false,"name":"StudentAddedOrUpdated","inputs":[{"indexed":false,"name":"nim","type":"uint256","internalType":"uint256"},{"indexed":false,"name":"name","type":"string","internalType":"string"}],"type":"event","payable":false},{"constant":false,"name":"addStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"},{"name":"_name","type":"string","internalType":"string"},{"name":"_gender","type":"string","internalType":"string"},{"name":"_birthDate","type":"string","internalType":"string"},{"name":"_city","type":"string","internalType":"string"},{"name":"_yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"_program","type":"string","internalType":"string"},{"name":"_gpa","type":"uint256","internalType":"uint256"}],"outputs":[],"type":"function","payable":false,"stateMutability":"nonpayable"},{"constant":false,"name":"getStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"studentCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"students","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"name","type":"string","internalType":"string"},{"name":"nim","type":"uint256","internalType":"uint256"},{"name":"gender","type":"string","internalType":"string"},{"name":"birthDate","type":"string","internalType":"string"},{"name":"city","type":"string","internalType":"string"},{"name":"yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"program","type":"string","internalType":"string"},{"name":"gpa","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"}];

let web3 = new Web3("http://10.17.5.103:22000"); // RPC URL of your Quorum node
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getStudent() {
  const nim = document.getElementById("nim").value;
  
  try {
    const student = await contract.methods.getStudent(nim).call();
    
    const studentDetails = `
      Name: ${student[0]}<br>
      NIM: ${student[1]}<br>
      Gender: ${student[2]}<br>
      Birth Date: ${student[3]}<br>
      City: ${student[4]}<br>
      Year of Entry: ${student[5]}<br>
      Program: ${student[6]}<br>
      GPA: ${student[7]}
    `;
    
    document.getElementById("studentDetails").innerHTML = studentDetails;
  } catch (error) {
    console.error("Error retrieving student:", error);
    document.getElementById("studentDetails").innerHTML = "Error retrieving student data";
  }
}

