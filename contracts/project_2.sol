// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Scholarship {

    address public admin;

    constructor(address _admin) {
        admin = _admin;   // Admin passed during deployment
    }

    enum Status { Pending, Approved, Rejected }

    struct Application {
        uint id;
        address student;
        string name;
        string regNo;
        string cgpa;
        string documentHash;
        uint timestamp;
        Status status;
    }

    uint public applicationCount;

    mapping(uint => Application) public applications;
    mapping(address => bool) public hasApplied;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    function submitApplication(
        address _student,
        string memory _name,
        string memory _regNo,
        string memory _cgpa,
        string memory _docHash
    ) public {

        require(msg.sender == _student, "Use your own wallet");
        require(!hasApplied[_student], "Already applied");

        applicationCount++;

        applications[applicationCount] = Application({
            id: applicationCount,
            student: _student,
            name: _name,
            regNo: _regNo,
            cgpa: _cgpa,
            documentHash: _docHash,
            timestamp: block.timestamp,
            status: Status.Pending
        });

        hasApplied[_student] = true;
    }

    function updateApplicationStatus(uint _id, Status _status)
        public
        onlyAdmin
    {
        require(_id > 0 && _id <= applicationCount, "Invalid ID");
        require(applications[_id].status == Status.Pending, "Already finalized");

        applications[_id].status = _status;
    }

    function getApplication(uint _id)
        public
        view
        returns (Application memory)
    {
        require(_id > 0 && _id <= applicationCount, "Invalid ID");
        return applications[_id];
    }
}
