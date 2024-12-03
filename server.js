const express = require("express");
const bodyParser = require("body-parser");
const Web3 = require("web3");

const app = express();
const PORT = 4000;

// Konfigurasi Web3 untuk Quorum Node
// const web3 = new Web3("http://139.180.134.97/node1/"); // 7 nodes
const web3 = new Web3("http://139.180.134.97/node2/"); // 4 nodes

const contractAddress = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34";
const contractABI = [
  // Salin ABI Anda di sini
[{"anonymous":false,"name":"StudentAddedOrUpdated","inputs":[{"indexed":false,"name":"nim","type":"uint256","internalType":"uint256"},{"indexed":false,"name":"name","type":"string","internalType":"string"}],"type":"event","payable":false},{"constant":false,"name":"addStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"},{"name":"_name","type":"string","internalType":"string"},{"name":"_gender","type":"string","internalType":"string"},{"name":"_birthDate","type":"string","internalType":"string"},{"name":"_city","type":"string","internalType":"string"},{"name":"_yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"_program","type":"string","internalType":"string"},{"name":"_gpa","type":"uint256","internalType":"uint256"}],"outputs":[],"type":"function","payable":false,"stateMutability":"nonpayable"},{"constant":false,"name":"getStudent","inputs":[{"name":"_nim","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"studentCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"students","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"name","type":"string","internalType":"string"},{"name":"nim","type":"uint256","internalType":"uint256"},{"name":"gender","type":"string","internalType":"string"},{"name":"birthDate","type":"string","internalType":"string"},{"name":"city","type":"string","internalType":"string"},{"name":"yearOfEntry","type":"uint256","internalType":"uint256"},{"name":"program","type":"string","internalType":"string"},{"name":"gpa","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"}]
];
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Middleware
app.use(bodyParser.json());

// API untuk mendapatkan data mahasiswa
app.post("/getStudent", async (req, res) => {
  const { nim } = req.body;

  try {

    const data = await contract.methods.getStudent(parseInt(nim)).call();

    //if (data[1] === "0") {
      //return res.status(404).json({ message: "Data tidak ditemukan" });
   // }

    const student = {
     // name: data[0],
      nim: nim,// data[1],
      //gender: data[2],
      //birthDate: data[3],
      //city: data[4],
      //yearOfEntry: data[5],
      //studyProgram: data[6],
      //gpa: data[7],
    };

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch student data" });
  }
});

// API untuk memperbarui data mahasiswa
app.post("/updateStudent", async (req, res) => {
  const { nim, name, gender, birthDate, city, yearOfEntry, studyProgram, gpa } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();

    await contract.methods
      .addStudent(nim, name, gender, birthDate, city, yearOfEntry, studyProgram, gpa)
      .send({ from: accounts[0], gas: "1000000", gasPrice: 0 });

    res.json({ message: "Student updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update student data" });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

