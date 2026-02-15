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

async function loadApplications() {

    const count = await contract.applicationCount();
    const table = document.getElementById("applicationsTable");
    table.innerHTML = "";

    for (let i = 1; i <= count; i++) {

        const app = await contract.getApplication(i);
        let statusText = ["Pending", "Approved", "Rejected"][app.status];

        table.innerHTML += `
            <tr>
                <td>${app.id}</td>
                <td>${app.student}</td>
                <td>${app.name}</td>
                <td>${app.cgpa}</td>
                <td>${statusText}</td>
                <td>
                    <button onclick="updateStatus(${app.id},1)">Approve</button>
                    <button onclick="updateStatus(${app.id},2)">Reject</button>
                </td>
            </tr>
        `;
    }
}

async function updateStatus(id, status) {

    try {
        const tx = await contract.updateApplicationStatus(id, status);
        await tx.wait();
        alert("Status Updated!");
        loadApplications();
    } catch (err) {
        alert(err.reason || err.message);
    }
}
