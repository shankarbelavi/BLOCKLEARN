// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BlockLearnToken
 * @dev ERC20 token for the BlockLearn skill-swapping platform
 */
contract BlockLearnToken is ERC20, Ownable {
    // Token economics
    uint256 public constant MAX_SUPPLY = 100000000 * 10**18; // 100 million tokens
    uint256 public constant SKILL_COMPLETION_REWARD = 10 * 10**18; // 10 tokens per skill completion
    uint256 public constant TEACHING_REWARD = 5 * 10**18; // 5 tokens for teaching a skill
    uint256 public constant MILESTONE_BONUS = 50 * 10**18; // 50 tokens for milestones

    // Mapping to track token purposes
    mapping(address => uint256) public skillCompletions;
    mapping(address => uint256) public teachingSessions;
    mapping(address => uint256) public totalEarned;

    // Events
    event TokensAwarded(address indexed recipient, uint256 amount, string reason);
    event SkillCompleted(address indexed user, string skillName);
    event TeachingSessionCompleted(address indexed teacher, string skillName);

    constructor() ERC20("BlockLearn Token", "BLT") Ownable(msg.sender) {
        // Mint initial supply to owner for distribution
        _mint(msg.sender, MAX_SUPPLY / 10); // 10% for initial distribution
    }

    /**
     * @dev Award tokens for completing a skill
     * @param recipient Address of the token recipient
     * @param skillName Name of the completed skill
     */
    function awardSkillCompletion(address recipient, string memory skillName)
        external
        onlyOwner
    {
        require(recipient != address(0), "Invalid recipient address");
        require(balanceOf(owner()) >= SKILL_COMPLETION_REWARD, "Insufficient contract balance");

        _transfer(owner(), recipient, SKILL_COMPLETION_REWARD);
        skillCompletions[recipient]++;
        totalEarned[recipient] += SKILL_COMPLETION_REWARD;

        emit TokensAwarded(recipient, SKILL_COMPLETION_REWARD, string(abi.encodePacked("Skill completion: ", skillName)));
        emit SkillCompleted(recipient, skillName);
    }

    /**
     * @dev Award tokens for teaching a skill
     * @param teacher Address of the teacher
     * @param skillName Name of the taught skill
     */
    function awardTeaching(address teacher, string memory skillName)
        external
        onlyOwner
    {
        require(teacher != address(0), "Invalid teacher address");
        require(balanceOf(owner()) >= TEACHING_REWARD, "Insufficient contract balance");

        _transfer(owner(), teacher, TEACHING_REWARD);
        teachingSessions[teacher]++;
        totalEarned[teacher] += TEACHING_REWARD;

        emit TokensAwarded(teacher, TEACHING_REWARD, string(abi.encodePacked("Teaching: ", skillName)));
        emit TeachingSessionCompleted(teacher, skillName);
    }

    /**
     * @dev Award milestone bonus tokens
     * @param recipient Address of the token recipient
     * @param milestone Description of the milestone achieved
     */
    function awardMilestone(address recipient, string memory milestone)
        external
        onlyOwner
    {
        require(recipient != address(0), "Invalid recipient address");
        require(balanceOf(owner()) >= MILESTONE_BONUS, "Insufficient contract balance");

        _transfer(owner(), recipient, MILESTONE_BONUS);
        totalEarned[recipient] += MILESTONE_BONUS;

        emit TokensAwarded(recipient, MILESTONE_BONUS, string(abi.encodePacked("Milestone: ", milestone)));
    }

    /**
     * @dev Get user's statistics
     * @param user Address of the user
     * @return skillCompletionsCount Number of skills completed
     * @return teachingSessionsCount Number of teaching sessions
     * @return totalTokensEarned Total tokens earned by user
     */
    function getUserStats(address user)
        external
        view
        returns (uint256 skillCompletionsCount, uint256 teachingSessionsCount, uint256 totalTokensEarned)
    {
        return (skillCompletions[user], teachingSessions[user], totalEarned[user]);
    }

    /**
     * @dev Mint additional tokens (owner only)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed maximum supply");
        _mint(to, amount);
    }

    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
