let provider;
let signer;
let contract;

async function connect() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
}

connect();

async function submitApplication() {

    const studentAddress = document.getElementById("studentAddress").value;
    const name = document.getElementById("name").value;
    const regNo = document.getElementById("regNo").value;
    const cgpa = document.getElementById("cgpa").value;
    const docHash = document.getElementById("docHash").value;

    try {
        const tx = await contract.submitApplication(
            studentAddress,
            name,
            regNo,
            cgpa,
            docHash
        );

        await tx.wait();
        alert("Application Submitted!");

    } catch (err) {
        alert(err.reason || err.message);
    }
}

async function checkStatus() {

    const id = document.getElementById("appId").value;
    const app = await contract.getApplication(id);

    let statusText = ["Pending", "Approved", "Rejected"][app.status];

    document.getElementById("result").innerText =
        "Student: " + app.name +
        "\nWallet: " + app.student +
        "\nStatus: " + statusText;
}
