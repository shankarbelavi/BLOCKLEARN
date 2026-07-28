// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SkillSwapContract
 * @dev Smart contract for managing skill certifications and token rewards in the BlockLearn platform
 */
contract SkillSwapContract is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _certificateIds;

    // Skill certificate structure
    struct SkillCertificate {
        uint256 id;
        address student;
        string skillName;
        string issuerName;
        uint256 issuedAt;
        string metadata;
        bool isValid;
        address issuedBy;
    }

    // Token award record
    struct TokenAward {
        address recipient;
        uint256 amount;
        string reason;
        uint256 awardedAt;
        address awardedBy;
    }

    // Mappings
    mapping(address => SkillCertificate[]) public userCertificates;
    mapping(address => TokenAward[]) public userTokenAwards;
    mapping(address => mapping(string => bool)) public certificateExists;
    mapping(address => uint256) public userReputation;

    // Events
    event SkillCertificateIssued(
        address indexed student,
        string skillName,
        string issuerName,
        uint256 certificateId
    );

    event TokensAwarded(
        address indexed recipient,
        uint256 amount,
        string reason,
        address awardedBy
    );

    event ReputationUpdated(
        address indexed user,
        uint256 newReputation
    );

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Issue a skill certificate to a student
     * @param student Address of the student receiving the certificate
     * @param skillName Name of the skill being certified
     * @param issuerName Name of the person/institution issuing the certificate
     * @param metadata Additional metadata about the certification
     */
    function issueCertificate(
        address student,
        string memory skillName,
        string memory issuerName,
        string memory metadata
    ) external returns (uint256) {
        require(student != address(0), "Invalid student address");
        require(bytes(skillName).length > 0, "Skill name cannot be empty");
        require(bytes(issuerName).length > 0, "Issuer name cannot be empty");

        // Check if certificate already exists
        require(!certificateExists[student][skillName], "Certificate already exists for this skill");

        _certificateIds.increment();
        uint256 certificateId = _certificateIds.current();

        SkillCertificate memory newCertificate = SkillCertificate({
            id: certificateId,
            student: student,
            skillName: skillName,
            issuerName: issuerName,
            issuedAt: block.timestamp,
            metadata: metadata,
            isValid: true,
            issuedBy: msg.sender
        });

        userCertificates[student].push(newCertificate);
        certificateExists[student][skillName] = true;

        // Update user reputation
        userReputation[student] += 10;

        emit SkillCertificateIssued(student, skillName, issuerName, certificateId);
        emit ReputationUpdated(student, userReputation[student]);

        return certificateId;
    }

    /**
     * @dev Verify if a student has a valid certificate for a specific skill
     * @param student Address of the student
     * @param skillName Name of the skill to verify
     * @return bool indicating if the certificate is valid
     */
    function verifyCertificate(address student, string memory skillName)
        external
        view
        returns (bool)
    {
        return certificateExists[student][skillName];
    }

    /**
     * @dev Get all certificates for a specific user
     * @param user Address of the user
     * @return Array of skill certificates
     */
    function getUserCertificates(address user)
        external
        view
        returns (SkillCertificate[] memory)
    {
        return userCertificates[user];
    }

    /**
     * @dev Record a token award for a user
     * @param recipient Address of the token recipient
     * @param amount Amount of tokens awarded
     * @param reason Reason for the token award
     */
    function recordTokenAward(
        address recipient,
        uint256 amount,
        string memory reason
    ) external {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than 0");
        require(bytes(reason).length > 0, "Reason cannot be empty");

        TokenAward memory award = TokenAward({
            recipient: recipient,
            amount: amount,
            reason: reason,
            awardedAt: block.timestamp,
            awardedBy: msg.sender
        });

        userTokenAwards[recipient].push(award);
        userReputation[recipient] += 5;

        emit TokensAwarded(recipient, amount, reason, msg.sender);
        emit ReputationUpdated(recipient, userReputation[recipient]);
    }

    /**
     * @dev Get token awards for a specific user
     * @param user Address of the user
     * @return Array of token awards
     */
    function getUserTokenAwards(address user)
        external
        view
        returns (TokenAward[] memory)
    {
        return userTokenAwards[user];
    }

    /**
     * @dev Get user's reputation score
     * @param user Address of the user
     * @return Current reputation score
     */
    function getUserReputation(address user) external view returns (uint256) {
        return userReputation[user];
    }

    /**
     * @dev Update user reputation (admin function)
     * @param user Address of the user
     * @param newReputation New reputation score
     */
    function updateReputation(address user, uint256 newReputation)
        external
        onlyOwner
    {
        userReputation[user] = newReputation;
        emit ReputationUpdated(user, newReputation);
    }

    /**
     * @dev Revoke a skill certificate
     * @param student Address of the student
     * @param skillName Name of the skill certificate to revoke
     */
    function revokeCertificate(address student, string memory skillName)
        external
        onlyOwner
    {
        require(certificateExists[student][skillName], "Certificate does not exist");

        certificateExists[student][skillName] = false;
        userReputation[student] = userReputation[student] > 5 ? userReputation[student] - 5 : 0;

        emit ReputationUpdated(student, userReputation[student]);
    }
}
