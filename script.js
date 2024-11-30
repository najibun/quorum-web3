const contractAddress = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34"; // Alamat kontrak
const contractABI = [{"anonymous":false,"name":"StudentAddedOrUpdated","inputs":[{"indexed":false,"name":"nim","type":"uint256","internalType":"uint256"},{"indexed":false,"name":"name","type":"string","internalType":"string"}],"type":"event","payable":false},{"constant":false,"name":"addStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"},{"name":"_name","type":"string","internalType":"string"},{"name":"_gender","type":"string","internalType":"string"},{"name":"_birthDate","type":"string","internalType":"string"},{"name":"_city","type":"string","internalType":"string"},{"name":"_yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"_program","type":"string","internalType":"string"},{"name":"_gpa","type":"uint256","internalType":"uint256"}],"outputs":[],"type":"function","payable":false,"stateMutability":"nonpayable"},{"constant":false,"name":"getStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"studentCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"students","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"name","type":"string","internalType":"string"},{"name":"nim","type":"uint256","internalType":"uint256"},{"name":"gender","type":"string","internalType":"string"},{"name":"birthDate","type":"string","internalType":"string"},{"name":"city","type":"string","internalType":"string"},{"name":"yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"program","type":"string","internalType":"string"},{"name":"gpa","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"}]; // ABI kontrak

let web3, contract;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Menginisialisasi Web3 langsung ke node Quorum
    web3 = new Web3("http://10.17.5.103/:22000"); // Ganti dengan RPC URL Quorum Anda
    
    // Menginisialisasi kontrak
    contract = new web3.eth.Contract(contractABI, contractAddress);
    
document.getElementById("studentForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const nim = parseInt(formData.get("nim[]"));
  const name = formData.get("name[]");
  const gender = formData.get("gender[]");
  const birthDate = formData.get("birthDate[]");
  const city = formData.get("city[]");
  const yearOfEntry = parseInt(formData.get("yearOfEntry[]"));
  const studyProgram = formData.get("studyProgram[]");
  const gpa = parseFloat(formData.get("gpa[]"));

  try {
    const accounts = await web3.eth.getAccounts(); // Mendapatkan akun default
    await contract.methods
      .addStudent(nim, name, gender, birthDate, city, yearOfEntry, studyProgram, gpa)
      .send({ from: accounts[0] });

    alert("Student added successfully");
  } catch (error) {
    console.error("Error while adding student:", error);
    alert("An error occurred while adding student: " + error.message);
  }
});
