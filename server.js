const express = require("express");
const Web3 = require("web3");

const app = express();
app.use(express.json());

// Konfigurasi Web3
const web3 = new Web3("http://localhost:22000"); // Ganti dengan RPC URL Quorum Anda
const contractAddress = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34";
const contractABI = [ /* ABI kontrak Anda */ ];
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Endpoint untuk menambahkan data mahasiswa
app.post("/add-students", async (req, res) => {
  const { nims, names, genders, birthDates, cities, yearsOfEntry, studyPrograms, gpas } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .addStudentsBatch(nims, names, genders, birthDates, cities, yearsOfEntry, studyPrograms, gpas)
      .send({ from: accounts[0] });

    res.status(200).send({ message: "Students added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to add students" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

