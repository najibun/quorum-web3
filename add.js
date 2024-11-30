const contractAddress = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34"; // Ganti dengan alamat kontrak Anda
const contractABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "_nim", "type": "uint256" },
            { "name": "_name", "type": "string" },
            { "name": "_gender", "type": "string" },
            { "name": "_birthDate", "type": "string" },
            { "name": "_city", "type": "string" },
            { "name": "_yearOfEntry", "type": "uint256" },
            { "name": "_program", "type": "string" },
            { "name": "_gpa", "type": "uint256" }
        ],
        "name": "addStudent",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let web3, contract;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Menginisialisasi Web3 langsung ke node Quorum
        web3 = new Web3("http://10.17.5.103:22000"); // Ganti dengan RPC URL Quorum Anda

        // Menginisialisasi kontrak
        contract = new web3.eth.Contract(contractABI, contractAddress);

        document.getElementById("studentForm").addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const nim = parseInt(formData.get("nim"));
            const name = formData.get("name");
            const gender = formData.get("gender");
            const birthDate = formData.get("birthDate");
            const city = formData.get("city");
            const yearOfEntry = parseInt(formData.get("yearOfEntry"));
            const program = formData.get("program");
            const gpa = parseFloat(formData.get("gpa"));

            try {
                const accounts = await web3.eth.getAccounts(); // Mendapatkan akun default
                await contract.methods
                    .addStudent(nim, name, gender, birthDate, city, yearOfEntry, program, gpa)
                    .send({ from: accounts[0] });

                document.getElementById("status").innerHTML = `
                    <div class="alert alert-success">Student added successfully!</div>`;
            } catch (error) {
                console.error("Error while adding student:", error);
                document.getElementById("status").innerHTML = `
                    <div class="alert alert-danger">Error: ${error.message}</div>`;
            }
        });
    } catch (error) {
        console.error("Error connecting to Quorum blockchain:", error);
        document.getElementById("status").innerHTML = `
            <div class="alert alert-danger">Failed to connect to Quorum blockchain</div>`;
    }
});

