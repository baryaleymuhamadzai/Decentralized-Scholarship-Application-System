# Decentralized-Scholarship-Application-System
A very simple, Decentralized Scholarship Application system built on top of solidity.


---

## ⚙️ Smart Contract Functions

### submitApplication(name, regNo, cgpa, documentHash)

- Called by student
- Stores application on blockchain
- Default status = Pending
- Records submission timestamp
- Emits ApplicationSubmitted event

---

### updateApplicationStatus(applicationId, status)

- Only callable by admin
- Status can be:
  - 1 → Approved
  - 2 → Rejected
- Cannot update if already finalized
- Emits StatusUpdated event

---

### getApplication(applicationId)

Returns full application details.

---

### getMyApplication()

Returns application of the connected wallet.

---

## 🛠 Requirements

Install:

- Node.js
- MetaMask Browser Extension
- Ganache Desktop
- Remix IDE (browser-based)

---

## 🧪 How To Run The Project

---

### ✅ Step 1 — Start Ganache

1. Open Ganache
2. Start a new workspace
3. Copy RPC URL (usually: `http://127.0.0.1:7545`)
4. Note the Chain ID (usually 1337)

---

### ✅ Step 2 — Connect MetaMask to Ganache

1. Open MetaMask
2. Add new network:
   - RPC URL → `http://127.0.0.1:7545`
   - Chain ID → `1337`
3. Import one Ganache account using its private key

---

### ✅ Step 3 — Deploy Smart Contract

1. Open Remix IDE
2. Paste Scholarship.sol
3. Compile (Solidity ^0.8.20)
4. Go to Deploy & Run
5. Select "Injected Provider - MetaMask"
6. Deploy contract
7. Copy:
   - Contract Address
   - ABI

---

### ✅ Step 4 — Configure Frontend

Open `abi.js` and paste:

```js
const contractAddress = "PASTE_DEPLOYED_CONTRACT_ADDRESS";

const contractABI = [
  // Paste ABI from Remix here
];
